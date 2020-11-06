import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Payload } from '../types/payload';
import { LoginDTO, RegisterDTO } from './auth.dto';
import { User } from '../utilities/user.decorator';
import { SellerGuard } from '../guards/seller.guard';
import { UserService } from '../mdl-shared/user.service';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(
    private userService: UserService,
    private authservice: AuthService,
  ) { }

  @Get()
  @UseGuards(AuthGuard('jwt'), SellerGuard)
  async findAll(@User() user: any) {
    console.log('User after decrator \n', user)
    return await this.userService.findAll();
  }

  @Post('login')
  async login(@Body() loginDTO: LoginDTO) {
    const user = await this.userService.findByLogin(loginDTO);
    const payload: Payload = {
      username: user.username,
      seller: user.seller,
    }
    const token = await this.authservice.signPayload(payload);
    return { user, token };
  }

  @Post('register')
  async register(@Body() registerDTO: RegisterDTO) {
    const user = await this.userService.create(registerDTO);
    const payload = {
      username: user.username,
      seller: user.seller,
    }
    const token = await this.authservice.signPayload(payload);
    return { user, token };
  }
}
