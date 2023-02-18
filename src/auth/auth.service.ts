import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { User, UserDocument } from '../user/schema/user.schema';
import { PasswordsDto } from './dto/changePassword.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    @InjectModel(User.name) private userModel: Model<UserDocument>,
  ) {}

  async validateUser(email: string, password: string): Promise<Omit<User, 'password'> | undefined> {
    const user = await this.userService.findOne(email);

    if (user) {
      const isMatch = await bcrypt.compare(password, user.password);
      if (isMatch) {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { password, ...rest } = user;
        return rest;
      }
    }
  }

  async login(user: User) {
    return {
      accessToken: this.jwtService.sign(user),
    };
  }

  async changePassword(user: User, { password, password_confirmation: passwordConfirmation }: PasswordsDto) {
    if (password !== passwordConfirmation) {
      throw new HttpException('The provided passwords do not match', HttpStatus.BAD_REQUEST);
    }

    // retrieve user from db
    const userDocument = await this.userModel.findOne({ email: user.email });

    if (!userDocument) {
      throw new HttpException('A user associated with the provided token could not be found', HttpStatus.NOT_FOUND);
    }

    // replace the password on the user object with the new hashed password
    userDocument.password = await bcrypt.hash(password, 10);

    // save the updated user document back to the database
    await userDocument.save();

    return { success: true, message: 'Password changed successfully' };
  }
}
