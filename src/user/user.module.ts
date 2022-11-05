import { Module } from "@nestjs/common";
import { UserController } from "./user.controller";
import { UserService } from "./user.service";
import { MongooseModule } from "@nestjs/mongoose";
import { UserSchema } from "./user.schema";

@Module({
  providers: [UserService],
  controllers: [UserController],
  imports: [MongooseModule.forFeature([{ name: "User", schema: UserSchema }])],
})
export class UserModule {}
