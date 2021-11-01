# 导出CSV文件

## 概述

### 优点

* 支持流式写入，内存占用低，速度快。

### 缺点

* 不能像`Excel`那样分`Sheet`
* `WPS`在大约超过**100万条**的时候就打不开了
* **特殊字符**需要单独处理

### 最佳实践

* 大量数据采用流式导出，少量数据没有必要采用流式导出的也没有必要上`csv`，采用导出`Excel`就行。
* 每个`csv`文件的数据量不要超过**50万条**，如果一次导出的数据量过大，那么可以考虑导出多个`csv`文件，之后打一个**压缩包**给用户下载。

## 普通List方式导出

## PostgreSQL stream导出

首先使用 `pg` 和 `pg-query-stream` 包进行流式查询，得到数据库**可读流**，为 `ReadStream` 类型，示例：

```ts {1}
import { ReadStream } from 'typeorm/platform/PlatformTools'; 

@Injectable()
export class CardService {
  constructor(@InjectRepository(CardEntity) private readonly cardRepository: Repository<CardEntity>) {}

  /**
   * 获取卡片列表流
   * @param sortType 正序or倒序
   * @param orderBy 排序依据
   * @param sn 卡片sn码（支持模糊搜索）
   */
  async findForExport(orderBy: string, sortType: SortType, sn?: string): Promise<ReadStream> {

    const queryConditionList = ['cards.deleted = false'];
    if (sn) queryConditionList.push('cards.sn LIKE :sn');

    switch (orderBy) {
      case 'sn':
        var order = 'sn';
        break;
      case 'productionDate':
        var order = 'production_date';
        break;
      default:
        var order = 'created_at';
    }

    return this.cardRepository
      .createQueryBuilder('cards')
      .where(queryConditionList.join(' AND '), { sn: `%${sn}%` })
      .orderBy(order, sortType)
      .stream();

  }
}

```

接下来创建一个**文件写入流**，通过`fs.createWriteStream()`方法创建，之后就是两个流对接，数据库流的数据经过**转换**后写入文件流中，当完成后关闭文件写入了，即可。

示例如下：

```ts {13,25}
@Injectable()
export class XlsxUtil {
  /**
   * 流式导出
   * @param fileName csv文件名称
   * @param headers 表头列表
   * @param props 属性列表
   * @param data 数据流
   */
  exportCSV(fileName: string, headers: string[], props: string[], data: ReadStream): Promise<string> {
    return new Promise(async (resolve, reject) => {
      const filePath = join(__dirname, '../../../../public/temp/') + fileName;
      const writerStream = createWriteStream(filePath);
      writerStream.write('\uFEFF');
      writerStream.write(headers.join(','), 'UTF8');
      writerStream.write('\r\n', 'UTF8');
      data
        .on('data', data => {
          writerStream.write(
            props
              .map(prop => {
                if (data[prop] instanceof Date) return dayjs(data[prop]).format('YYYY-MM-DD HH:mm:ss');
                else if (prop.includes('_gender')) return data[prop] === Gender.Male ? '男' : '女';
                else if (prop === 'devices_active') return !datprop] || data[prop] === 'false' ? '未使用' : '使用中';
                return `"${data[prop].replaceAll('"','""')}"`;    // csv文件格式处理
              })
              .join(','),
            'UTF8'
          );
          writerStream.write('\r\n', 'UTF8');
        })
        .on('close', () => {
          writerStream.end();
        });

      writerStream.on('finish', function() {
        return resolve('/public/temp/' + fileName);
      });

      writerStream.on('error', function(err) {
        return reject(err.stack);
      });
    });
  }
}
```

::: warning 注意
这里需要注意 `csv` 文件的**数据格式**，请转至笔记[csv文件](../../../实践积累/csv文件/README.md)

上述高亮行中采用了 `String.prototype.replaceAll()` 方法，该方法是 `ES2021` 的语法，对于 `node` 来说，该方法从 `node 16 LTS` 开始支持，**请注意node版本**！
:::

### 导出代码解读

`headers` 是文件**表头**中的内容， `props` 是 `PostgreSQL` 数据库 `ReadStream` 中 `data` 事件的回调内容中的**字段列表**，如下所示：

```ts
export const headers = ['标签编号', '生产日期', '备注', '类型', '创建时间'];

export const props = ['cards_sn', 'cards_production_date', 'cards_remark', 'cards_type', 'cards_created_at'];
```

## MongoDB cursor导出
