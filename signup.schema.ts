import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
// import { IsEmail } from 'class-validator';


@Schema()
export class Signup {
  @Prop()
  username: string;

  @Prop({unique:true})
  email: string;

  @Prop()
  password: string;
}

export type SignupDocument = Signup & Document;
export const SignupSchema = SchemaFactory.createForClass(Signup);
