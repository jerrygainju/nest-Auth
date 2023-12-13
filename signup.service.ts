import { Injectable } from '@nestjs/common';
import { SignupDocument, Signup } from './signup.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { SignupType } from './signup.dto';

@Injectable()
export class SignupService {
  constructor(
    @InjectModel(Signup.name) private signupModel: Model<SignupDocument>,
  ) {}

  async create(createSignupDto: SignupType): Promise<Signup> {
    const signUp = new this.signupModel(createSignupDto);
    return signUp.save();
  }

  async findEmail(): Promise<Signup[]> {
    return this.signupModel.findOne();
  }
}
