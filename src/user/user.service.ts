import { HttpStatus, Injectable } from '@nestjs/common';
import { CustomError } from '../util/customError';
import * as bcrypt from 'bcrypt';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './schema/user.schema';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/createUser.dto';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  /**
   * Retrieve and return an existing user by their email.
   * @param email
   */
  async findOne(email: string): Promise<User | null> {
    const user = await this.userModel.findOne({ email });
    return user ? user.toObject() : null;
  }

  /**
   * Create, store, and return a new user object.
   * @param email
   * @param password
   * @param passwordConfirmation
   */
  async createOne({
    email,
    password,
    password_confirmation: passwordConfirmation,
  }: CreateUserDto): Promise<Omit<User, 'password'> | CustomError | undefined> {
    // return error if email already exists
    const existingUser = await this.findOne(email);
    if (existingUser) {
      return new CustomError(HttpStatus.BAD_REQUEST, 'The user already exists');
    }

    // check that password and passwordConfirmation match
    if (password !== passwordConfirmation) {
      return new CustomError(HttpStatus.BAD_REQUEST, 'The passwords do not match');
    }

    // hash the provided password
    const hashedPassword = await bcrypt.hash(password, 10);

    // create the user object
    const newUser = {
      email: email,
      password: hashedPassword,
    };

    // store user object with hashed password
    const createdUser = new this.userModel(newUser);
    createdUser.save();

    // return user excluding password key
    // reassign password to hash because password is already a variable (see function parameters)
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    return createdUser.toObject({
      transform: (doc, ret) => {
        delete ret.password;
        return ret;
      },
    });
  }
}
