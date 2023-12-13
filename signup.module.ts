import { Module } from '@nestjs/common';
import { SignupService } from './signup.service';
import { SignupResolver } from './signup.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { Signup, SignupSchema } from './signup.schema';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [MongooseModule.forFeature([{ name: Signup.name, schema: SignupSchema }]),
  JwtModule.register({
    signOptions:{expiresIn:" "},
    secret:"this is just secret"
  })
],
  providers: [SignupService, SignupResolver],
})
export class SignupModule {}
