import { HttpStatus, Injectable } from '@nestjs/common';
import { UserInterface } from './interface/user.interface';
import { Error } from '../util/error';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  private idCounter = 0;
  private readonly users: UserInterface[] = [];

  findOne(email: string): UserInterface | undefined {
    return this.users.find((user) => user.email === email);
  }

  async createOne(
    email: string,
    password: string,
    passwordConfirmation: string,
  ): Promise<Omit<UserInterface, 'password'> | Error | undefined> {
    // return error if email already exists
    const existingUser = this.findOne(email);
    if (existingUser) {
      return new Error(HttpStatus.BAD_REQUEST, 'The user already exists');
    }

    // check that passwords match
    if (password !== passwordConfirmation) {
      return new Error(HttpStatus.BAD_REQUEST, 'The passwords do not match');
    }

    // hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log({ hashedPassword });

    // create the user object
    const newUser = {
      _id: this.idCounter,
      email: email,
      password: hashedPassword,
    };

    // store user object with hashed password
    this.users.push(newUser);

    // increase idCounter
    this.idCounter += 1;

    // return user excluding password key
    const { password: hash, ...rest } = newUser;
    return rest;
  }
}
