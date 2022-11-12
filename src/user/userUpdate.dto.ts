import { IsString } from "class-validator";

export class UserUpdateDTO {
  @IsString()
  userName: string;
}
