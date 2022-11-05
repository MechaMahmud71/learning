import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString } from "class-validator";

export class LoginDto {
  @ApiProperty({ required: true, example: "towhid139@gmail.com" })
  @IsEmail()
  email: string;

  @ApiProperty({ required: true, example: 123456 })
  @IsString()
  password: string;
}
