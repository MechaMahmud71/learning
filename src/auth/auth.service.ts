import { Injectable, HttpException, HttpStatus } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { UserInterface } from "./Interfaces/user.interface";
import { UserDocument } from "./entities/user.schema";
import { LoginDto } from "./dtos/login.dto";
import { UserSignupDto } from "./dtos/userSignup.dto";
import * as bcrypt from "bcrypt";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AuthService {
  constructor(
    @InjectModel("User") private userModel: Model<UserDocument>,
    private jwtService: JwtService
  ) {}

  async userLogin(
    body: LoginDto
  ): Promise<{ token: string; data: UserInterface }> {
    const { email, password } = body;
    const user = await this.userModel.findOne({ email: email });
    if (!user) {
      throw new HttpException("User not found", HttpStatus.NOT_FOUND);
    }

    if (!(await this.matchPassword(password, user.password))) {
      throw new HttpException("Invalid Password", HttpStatus.BAD_REQUEST);
    }

    const token = this.getJwtToken(user);

    return {
      token: token,
      data: user,
    };
  }

  async userSignUp(
    body: UserSignupDto
  ): Promise<{ token: string; data: UserInterface }> {
    const { email } = body;
    let user = await this.userModel.findOne({ email: email });
    if (user) {
      throw new HttpException("User is Already there", HttpStatus.FOUND);
    }

    user = await this.userModel.create(body);

    const token = this.getJwtToken(user);

    return {
      token: token,
      data: user,
    };
  }

  private getJwtToken(user: { userName: string; _id: string }): string {
    return this.jwtService.sign({
      username: user.userName,
      sub: user._id,
    });
  }

  private async matchPassword(
    enteredPassword: string,
    password: string
  ): Promise<boolean> {
    return await bcrypt.compare(enteredPassword, password);
  }
}
