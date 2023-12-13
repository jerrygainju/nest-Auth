import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { SignupService } from './signup.service';
import { SignupType } from './signup.dto';
import * as bcrypt from 'bcrypt';
import { ConflictException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { SignupDocument, Signup } from './signup.schema';
import { Model } from 'mongoose';
import { validateEmail } from 'utils/emailValidation';

@Resolver()
export class SignupResolver {
  constructor(
    private readonly signupService: SignupService,
    @InjectModel(Signup.name) private signupModel: Model<SignupDocument>,
  ) {}

  @Mutation((returns) => SignupType)
  async signUp(@Args('input') input: SignupType) {
    const newInput = {
      username: input.username,
      email: input.email,
      password: await bcrypt.hash(input.password, 10),
    };
    if (input.password === ' ' || input.password.length <= 6) {
      throw new ConflictException('password is short or null');
    }
    if (!validateEmail(input.email)) {
      throw new ConflictException('provide proper email');
    }
    const emailExist = await this.signupModel.findOne({ email: input.email });
    if (emailExist) {
      throw new ConflictException('email already exists');
    } else {
      return this.signupService.create(newInput);
    }
  }
  @Mutation((returns) => SignupType)
  async signIn(@Args('input') input: SignupType ) {
    if(!(input.password)){
      throw new ConflictException('password required')
    }
    const user = await this.signupModel.findOne({email:input.email})
    if(!user){
      throw new ConflictException('provide valid email')
    }
    const isPasswordValid = await bcrypt.compare(input.password, user.password)
    if(!isPasswordValid){
      throw new ConflictException('provide valid password')
    }
    return user
  }
}
