import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { MongooseModule } from "@nestjs/mongoose";
import { UserSchema } from "./entities/user.schema";
import { JwtModule } from "@nestjs/jwt";
import { jwtConstants } from "./auth.constants";
import { APP_INTERCEPTOR } from "@nestjs/core";
import { AuthInterceptor } from "./auth.interceptor";

@Module({
  providers: [
    AuthService,
    {
      provide: APP_INTERCEPTOR,
      useClass: AuthInterceptor,
    },
  ],
  controllers: [AuthController],

  imports: [
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: "60s" },
    }),
    MongooseModule.forFeature([{ name: "User", schema: UserSchema }]),
  ],
})
export class AuthModule {}
