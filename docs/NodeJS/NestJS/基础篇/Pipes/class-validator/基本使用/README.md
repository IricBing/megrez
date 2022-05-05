# 基本使用

参考 `class-validator` 的[GitHub README](https://github.com/typestack/class-validator#readme)。

对于普通的类型，使用起来很简单，在此不做赘述了。只记录几种复杂类型的使用。

## 嵌套类型

需要使用 `@ValidateNested()` 装饰器来实现，实现案例如下所示：

```ts
import { Type } from 'class-transformer';
import { IsNumber, IsString, ValidateNested } from 'class-validator';

class Address {
  @IsString()
  addressName: string;

  @IsNumber()
  addressCode: number;
}

class User {
  @IsString()
  userName: string;

  @ValidateNested()
  @Type(() => Address)
  address: Address;
}
```

## 数组对象

需要使用 `@ValidateNested({ each: true })` 装饰器来实现，实现案例如下：

```ts
import { IsNumber, IsString, IsOptional, IsNotEmpty, IsArray } from 'class-validator';

export class DataDto {
  @IsArray()
  @ArrayNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => UserDto)
  readonly list: UserDto[]
}

export class UserDto {
  @IsString()
  @IsNotEmpty()
  name: string

  @IsNumber()
  age?: number
}
```
