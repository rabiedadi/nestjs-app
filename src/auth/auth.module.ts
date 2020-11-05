import { Module } from '@nestjs/common';
import { SharedModule } from 'src/shared/shared.module';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './jwt.strategy';
import { AuthService } from './services/auth.service';

@Module({
  controllers: [AuthController],
  imports: [SharedModule],
  providers: [AuthService, JwtStrategy]
})
export class AuthModule { }
