import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
//import { LocalStrategy } from './strategies/local.strategy';
import { JwtStrategy } from './strategies/jwt.strategy';
//import { JwtStrategy } from './strategies/jwt.strategy';
//import { UserModule } from 'src/users/users.module';
//import { JwtAuthGuard } from './guards/jwt.guard';
//import { LocalGuard } from './guards/local.guard';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Login } from 'src/tyoeorm/entities/Login';
//import { User } from 'src/tyoeorm/entities/User';
import { RequestForm } from 'src/tyoeorm/entities/Request';
@Module({

  imports: [
    //UserModule,
    PassportModule,
    TypeOrmModule.forFeature([Login,RequestForm]),
    JwtModule.register(
      {
        secret:'abc12345',
        signOptions :{expiresIn:'1h'},
      }),
  ],
  providers: [AuthService,JwtStrategy],
   
  controllers: [AuthController],
  exports: [AuthService],

})
export class AuthModule {}