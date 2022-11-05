import { Controller, Get, Param, UseGuards, Put } from "@nestjs/common";
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
      },
    });
    worker.on("message", async (data) => {
      console.log(data, "hi");
      if (data) {
        const user = await this.userService.updateUser(id);
        console.log(user);
      }
      return data;
    });
    console.log("end");

    // await this.multi();
    // console.log(id);
    // return await this.userService.updateUser(id, 100);
  }

  // private async multi() {
  //   try {
  //     let total = 0;
  //     let i = 0;
  //     while (i !== 10) {
  //       const { data } = await axios.get(
  //         "https://jsonplaceholder.typicode.com/users"
  //       );
  //       if (data) {
  //         i++;
  //         console.log(i);
  //         total++;
  //       }
  //     }

  //     if (total === 10) {
  //       // const user = await this.userService.updateUser(total);
  //     }

  //     return total;

  //     // parentPort.postMessage(total);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }
}
