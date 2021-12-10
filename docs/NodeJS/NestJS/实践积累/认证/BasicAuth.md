# Basic Auth认证

> [!tip|label: 提示]
> 官方文档中并没有给出 `Basic Auth` 的实现方式，这是结合网上资料自己整理实现的。

## 安装必要依赖包

```bash
$ pnpm add @nestjs/passport passport-http
$ pnpm add -D @types/passport-http
```

## 编写Basic Auth实现策略

```ts
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { BasicStrategy } from 'passport-http';
import { UserService } from '../../user/services/user.service';
import { BasicAuthUser } from '../interfaces/basic-auth-user.interface';

@Injectable()
export class BasicAuthStrategy extends PassportStrategy(BasicStrategy) {
  constructor(private readonly userService: UserService) {
    super();
  }

  /**
   * Basic Auth验证
   * @param username 用户名
   * @param password 密码（MD5加密）
   * @returns 是否验证成功
   */
  async validate(username: string, password: string): Promise<BasicAuthUser> {
    const user = await this.userService.login(username, password);
    if (!user) throw new UnauthorizedException();

    return {
      uuid: user.uuid,
      username: user.username,
      mobile: user.mobile,
      email: user.email,
      role: user.role
    };
  }
}
```

## 编写Basic Auth Guard

```ts
import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class BasicAuthGuard extends AuthGuard('basic') {}
```

## module文件中声明

```ts
import { Global, Module } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { BasicAuthStrategy } from './strategies/basic-auth.strategy';

@Global()
@Module({
  providers: [BasicAuthStrategy],
  exports: [BasicAuthStrategy]
})
export class AuthModule {}
```

## 使用

在 `controller` **类**上或者 `controller` **类的方法**上加入 `@UseGuards(BasicAuthGuard)` 装饰器即可。

```ts
@UseGuards(BasicAuthGuard)
@Controller('vcom/devices')
export class DeviceVcomController {
  @ApiOperation({ summary: '获取所有工作在vcom模式下的设备列表' })
  @Get()
  async getAll(@VcomUser() user: BasicAuthUser): Promise<GetDeviceListVcomResDto[]> {}
}
```

> [!tip|label:提示]
> `VcomUser` 装饰器的实现如下：
>
> ```ts
> import { createParamDecorator, ExecutionContext } from '@nestjs/common';
>
> export const VcomUser = createParamDecorator((data: unknown, ctx: ExecutionContext) => {
>   const { user } = ctx.switchToHttp().getRequest<Request>() as any;
>   return user;
> });
> ```

