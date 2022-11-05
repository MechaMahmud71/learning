import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { UserDocument } from "./user.schema";
import { UserInterface } from "./Interfacec/user.interface";

@Injectable()
export class UserService {
  constructor(@InjectModel("User") private userModel: Model<UserDocument>) {}

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
    // console.log(id);
    const user = await this.userModel.findOne({ _id: id });
    user.userName = "TestTowhid";
    await user.save();
    // console.log(user);
    return user;
  }
}
