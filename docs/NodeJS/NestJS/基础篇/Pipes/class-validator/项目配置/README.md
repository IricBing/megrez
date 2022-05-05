# 项目配置

## validation.pipe.ts

新建 `validation.pipe.ts` 文件，写入如下内容：

```ts
import { PipeTransform, Injectable, ArgumentMetadata, BadRequestException } from '@nestjs/common';
import { validate } from 'class-validator';
import { plainToClass } from 'class-transformer';

@Injectable()
export class ValidationPipe implements PipeTransform<any> {
  async transform(value: any, { metatype }: ArgumentMetadata) {
    if (!metatype || !this.toValidate(metatype)) return value;

    const object = plainToClass(metatype, value);
    const errors = await validate(object);
    if (errors.length > 0) {
      let errMsg = 'Validation failed';
      const error = errors[0].constraints;
      for (const key in error) {
        if (error.hasOwnProperty(key) && error[key]) {
          errMsg = error[key];
          break;
        }
      }
      throw new BadRequestException(errMsg);
    }

    return object;
  }

  private toValidate(metatype: Function): boolean {
    const types: Function[] = [String, Boolean, Number, Array, Object];

    return !types.find(type => metatype === type);
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
