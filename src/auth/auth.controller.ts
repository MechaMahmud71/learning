import { Body, Controller, Post } from "@nestjs/common";
import { UserInterface } from "./Interfaces/user.interface";
import { ApiTags } from "@nestjs/swagger";
import { AuthService } from "./auth.service";
import { LoginDto } from "./dtos/login.dto";
import { UserSignupDto } from "./dtos/userSignup.dto";

@ApiTags("Auth Api Routes")
@Controller("auth")
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post("/login")
  async userLogin(@Body() body: LoginDto) {
    return await this.authService.userLogin(body);
  }

  @Post("/signup")
  async userSignup(
    @Body() body: UserSignupDto
  ): Promise<{ token: string; data: UserInterface }> {
    return await this.authService.userSignUp(body);
  }
}
