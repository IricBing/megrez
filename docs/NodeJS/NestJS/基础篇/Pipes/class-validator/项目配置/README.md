# 项目配置

## validation.pipe.ts

新建 `validation.pipe.ts` 文件，写入如下内容：

```ts
import { PipeTransform, Injectable, ArgumentMetadata, BadRequestException } from '@nestjs/common';
import { validate, ValidationError } from 'class-validator';
import { plainToClass } from 'class-transformer';

@Injectable()
export class ValidationPipe implements PipeTransform<any> {
  /**
   * 校验和转换实现，class-validator 和 class-transformer
   * @description 顺序为：先转换，后校验
   * @param value 原始值
   * @param param1 参数元数据
   * @returns 校验和转换后的类
   */
  async transform(value: any, { metatype }: ArgumentMetadata) {
    if (!metatype || !this.toValidate(metatype)) return value;

    const object = plainToClass(metatype, value);
    const errors = await validate(object);
    if (errors.length > 0) throw new BadRequestException(this.getError(errors[0]));

    return object;
  }

  /**
   * 判断DTO数据是否需要校验和转换
   * @param metatype 数据类型
   * @returns 是否验证和转换
   */
  private toValidate(metatype: Function): boolean {
    const types: Function[] = [String, Boolean, Number, Array, Object];

    return !types.find(type => metatype === type);
  }

  /**
   * 获取 class-validator 验证错误显示信息
   * @param error class-validator验证错误
   * @returns 错误信息
   */
  private getError(error: ValidationError): string {
    if (error.constraints) return this.getConstraintsErrorMessage(error.constraints);
    if (error.children?.length) return this.getError(error.children[0]);

    return 'Validation failed';
  }

  /**
   * 获取 class-validator 错误约束信息可显示内容
   * @param constraints class-validator 错误约束信息
   * @returns 错误约束信息可显示内容
   */
  private getConstraintsErrorMessage(constraints: ValidationError['constraints']): string {
    for (const key in constraints) {
      if (constraints.hasOwnProperty(key) && constraints[key]) {
        return constraints[key];
      }
    }
  }
}
```

## main.ts

在 `main.ts` 文件中配置全局管道。

```ts
app.useGlobalPipes(new ValidationPipe());
```

> [!tip|label: 小提示]
> 在 `@nestjs/common` 包中也有一个同名的 `ValidationPipe` 类暴露出来，我们要注意引入的时候别引用错了，要引用自己写的那个。

> [!warning|label: 注意]
> 在**混合应用**中 `useGlobalPipes()` 方法不会为**网关**和**微服务**设置管道, 对于标准(非混合)微服务应用使用 `useGlobalPipes()` 全局设置管道。
