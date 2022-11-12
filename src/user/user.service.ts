import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { UserDocument } from "./user.schema";
import { UserInterface } from "./Interfacec/user.interface";
import { EventEmitter2, OnEvent } from "@nestjs/event-emitter";

@Injectable()
export class UserService {
  constructor(
    @InjectModel("User") private userModel: Model<UserDocument>,
    private eventEmitter: EventEmitter2
  ) {}

  async getAllUsers(): Promise<UserInterface[]> {
    const users = await this.userModel.find({}, { password: 0 });
    return users;
  }

  async getUser(id: string): Promise<UserInterface> {
    console.log(id);
    const user = await this.userModel.findOne({ _id: id }, { password: 0 });
    return user;
  }

  async updateUser(id: string) {
    const user = await this.userModel.findOneAndUpdate(
      { _id: id },
      {
        $set: {
          userName: "new Name",
        },
      },
      { new: true }
    );
    if (!user) {
      return "no user found";
    }
    return user;
  }

  async fireEvent() {
    await this.eventEmitter.emit("msg.sent", "Hello World");
    return "hi";
  }

  @OnEvent("msg.sent", { async: true })
  async listentToEvent(msg: string) {
    let total = 0;
    for (let i = 0; i < 10000000000000; i++) {
      // console.log("hi" + i);
      total++;
    }

    console.log(total);

    await this.userModel.find({}, { password: 0 });
  }
}
