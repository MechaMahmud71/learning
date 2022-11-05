import { Injectable } from "@nestjs/common";

@Injectable()
export class AppService {
  getHello(): { success: boolean; message: string } {
    return {
      success: true,
      message: "Api is running succesfully",
    };
  }
}
