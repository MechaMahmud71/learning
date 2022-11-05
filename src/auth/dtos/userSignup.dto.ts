import { IsEmail, IsString, MinLength } from "class-validator";

export class UserSignupDto {
  @IsEmail()
  email: string;

  @IsString()
  userName: string;

  @IsString()
  password: string;

  @IsString()
  @MinLength(11, {
    message: "Phone no must be 11 characters",
  })
  phoneNo: string;
}
