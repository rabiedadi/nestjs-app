import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UserService } from 'src/shared/services/user.service';
import { LoginDTO, RegisterDTO } from './auth.dto';
import { AuthService } from './services/auth.service';

@Controller('auth')
export class AuthController {
  constructor(
      private userService: UserService,
      private authservice: AuthService,
    ) {}
  
  @Get()
  @UseGuards(AuthGuard('jwt'))
  tempAuth() {
    return { auth: 'works' }
  }

  @Post('login')
  async login(@Body() loginDTO: LoginDTO) {
    const user = await this.userService.findByLogin(loginDTO);
    const payload = {
      username : user.username,
      seller: user.seller,
    }
    const token = await this.authservice.signPayload(payload);
    return { user, token };
  }

  @Post('register')
  async register(@Body() registerDTO: RegisterDTO) {
    const user = await this.userService.create(registerDTO);
    const payload = {
      username : user.username,
      seller: user.seller,
    }
    const token = await this.authservice.signPayload(payload);
    return { user, token };
  }


}
