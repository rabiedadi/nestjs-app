import { Injectable } from '@nestjs/common';
import { sign } from 'jsonwebtoken';
import { UserService } from '../mdl-shared/user.service';
import { Payload } from 'src/types/payload';

@Injectable()
export class AuthService {
    constructor(private userService: UserService) { }

    async signPayload(payload: Payload) {
        return sign(payload, '94CE91B72E', { expiresIn: '12h' });
    }

    async validateUser(payload: Payload) {
        return await this.userService.findByPayload(payload);
    }
}
