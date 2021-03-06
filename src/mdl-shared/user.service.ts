import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { LoginDTO, RegisterDTO } from '../mdl-auth/auth.dto';
import { User } from '../types/user';
import * as bcrypt from 'bcrypt';
import { Payload } from '../types/payload';
@Injectable()
export class UserService {
    constructor(@InjectModel('User') private userModele: Model<User>) { }

    sanitizeUser(user: User) {
        const sanitized = user.toObject();
        delete sanitized['password'];
        return sanitized;
    }

    async create(registerDTO: RegisterDTO) {
        const { username } = registerDTO;
        const user = await this.userModele.findOne({ username });
        if (user) { throw new HttpException('User already exists', HttpStatus.BAD_REQUEST); }
        const createdUser = new this.userModele(registerDTO);
        await createdUser.save();
        return this.sanitizeUser(createdUser);
    }

    async findByLogin(loginDTO: LoginDTO) {
        const { username, password } = loginDTO;
        const user = await this.userModele.findOne({ username });
        if (!user) {
            throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
        }
        if (await bcrypt.compare(password, user.password)) {
            return this.sanitizeUser(user);
        } else {
            throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
        }
    }

    async findByPayload(payload: Payload) {
        const { username } = payload;
        return await this.userModele.findOne({ username });
    }

    async findAll() {
        return await this.userModele.find();
    }
}
