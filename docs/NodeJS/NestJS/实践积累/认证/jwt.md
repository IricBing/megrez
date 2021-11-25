# JWT认证
* [官方文档](https://docs.nestjs.com/security/authentication#jwt-functionality)

* [官方示例代码](https://github.com/nestjs/nest/tree/master/sample/19-auth-jwt)

## 安装必要依赖包

```shell
$ pnpm add @nestjs/jwt passport-jwt
$ pnpm add -D @types/passport-jwt
```

## 编写JWT实现策略

参考官方示例代码即可，此处是我的实现：

```typescript
import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { CommonConfigRegister } from '../../config/registers/common.register';
import { JwtExtraPayload } from '../interfaces/jwt-extra-payload.interface';
import { JwtPayload } from '../interfaces/jwt-payload.interface';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @Inject(CommonConfigRegister.KEY)
    private readonly commonConfig: ConfigType<typeof CommonConfigRegister>
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: commonConfig.jwtSecret
    });
  }

  /**
   * jwt 验证
   * @param payload jwt解析后的原始荷载
   * @returns 需要的用户信息
   */
  validate(payload: JwtPayload & JwtExtraPayload): JwtPayload {
    if (payload.exp * 1000 < Date.now()) throw new UnauthorizedException();

    return { uuid: payload.uuid, role: payload.role };
  }
}
```

## module文件中声明

在 `auth.module.ts` 文件中声明：

```typescript
import { Global, Module } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { CommonConfigRegister } from '../config/registers/common.register';
import { UserModule } from '../user/user.module';
import { JwtStrategy } from './strategies/jwt.strategy';

@Global()
@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      useFactory: (commonConfig: ConfigType<typeof CommonConfigRegister>) => ({
        secret: commonConfig.jwtSecret,
        signOptions: { expiresIn: commonConfig.jwtExpiresIn }
      }),
      inject: [CommonConfigRegister.KEY]
    })
  ],
  providers: [JwtStrategy],
  exports: [JwtStrategy, JwtModule, PassportModule.register({ defaultStrategy: 'jwt' })]
})
export class AuthModule {}
```

> [!tip|label:提示]
> 我这里将 `jwt` 设置成了**默认验证策略**，官方并没有这么干。

## 使用

```typescript
@UseGuards(AuthGuard())
@Controller('admin/devices')
export class DeviceAdminController {}
```

> [!tip|label:提示]
> 因为我们将 `jwt` 设置成了**默认策略**，所以不需要指定策略名称，如没有设置默认策略，则需要用如下写法：

```typescript
@UseGuards(AuthGuard('jwt'))
@Controller('admin/devices')
export class DeviceAdminController {}
```

或者是按照官方建议，封装 `JwtAuthGuard` ，如下所示：

```typescript
import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {}
```

然后这样使用：

```typescript
@UseGuards(JwtAuthGuard)
@Controller('admin/devices')
export class DeviceAdminController {}
```
