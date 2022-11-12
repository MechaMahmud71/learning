import { Controller, Get, Param, UseGuards, Put, Post } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { UserInterface } from "./Interfacec/user.interface";
import { UserService } from "./user.service";
import { Worker } from "worker_threads";
import axios from "axios";

@ApiTags("User Api Routes")
@Controller("users")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get("get-users")
  async getAllUsers(): Promise<{ success: boolean; data: UserInterface[] }> {
    const users = await this.userService.getAllUsers();
    return {
      success: true,
      data: users,
    };
  }

  @Get("get-single-user/:id")
  @UseGuards()
  async getUser(@Param("id") id: string): Promise<UserInterface> {
    return await this.userService.getUser(id);
  }

  @Put("/:id")
  async calculate(@Param("id") id: string) {
    const worker = new Worker("./src/user/worker.js", {
      workerData: {
        path: "./worker.ts",
        value: {
          android: [1, 2, 3, 4],
          ios: [5, 6, 7, 8],
        },
      },
    });
    worker.on("message", async (data) => {
      console.log(data);
      // await this.userService.getAllUsers();
    });
    return "User is updating";
  }

  @Post("test-event")
  async testEvent() {
    return await this.userService.fireEvent();
  }
}
