import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { UserInterface } from '../user/interface/user.interface';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { PayloadInterface } from './interface/payload.interface';
import { User } from '../user/schema/user.schema';

@Injectable()
export class AuthService {
  constructor(private userService: UserService, private jwtService: JwtService) {}

  async validateUser(email: string, password: string): Promise<Omit<User, 'password'> | undefined> {
    const user = await this.userService.findOne(email);

    if (user) {
      const isMatch = await bcrypt.compare(password, user.password);
      if (isMatch) {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { password, ...rest } = user;
        console.log(rest);
        return rest;
      }
    }
  }

  async login(user: User) {
    return {
      accessToken: this.jwtService.sign(user),
    };
  }
}
