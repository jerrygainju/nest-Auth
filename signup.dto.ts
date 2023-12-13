import { ObjectType, Field, InputType } from '@nestjs/graphql';
// import { IsOptional, Is } from 'class-validator/types/decorator/decorators';

@ObjectType('SignupType')
@InputType('SignupInputType')
export class SignupType {
  @Field({nullable:true})
  username?: string;

  @Field()
  email: string;

  @Field()
  password: string;
}
