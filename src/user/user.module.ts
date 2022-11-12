import { Module } from "@nestjs/common";
import { UserController } from "./user.controller";
import { UserService } from "./user.service";
import { MongooseModule } from "@nestjs/mongoose";
import { UserSchema } from "./user.schema";
import { EventEmitterModule } from "@nestjs/event-emitter";

@Module({
  providers: [UserService],
  controllers: [UserController],
  imports: [
    MongooseModule.forFeature([{ name: "User", schema: UserSchema }]),
    EventEmitterModule.forRoot(),
  ],
})
export class UserModule {}
