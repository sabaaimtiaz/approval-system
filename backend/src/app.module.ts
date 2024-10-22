import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Login} from './tyoeorm/entities/Login';
//import { UserModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { JwtModule } from '@nestjs/jwt';
//import { UserService } from './users/services/users/users.service';
import { AuthService } from './auth/auth.service';
import { JwtStrategy } from './auth/strategies/jwt.strategy';
//import { User } from './tyoeorm/entities/User';
import { RequestForm } from './tyoeorm/entities/Request';

@Module({
  imports: [      //for global setting
    TypeOrmModule.forRoot({ //map typescript class with coressponding sql table and colums it has bunch of apis that allow us to interect with database without writing sql statments  
      type: 'mysql',
      host: 'localhost',
      port: 3306, 
      username: 'root',
      password: 'sql12345',
      database: 'request_approval_system'    ,
      entities: [Login,RequestForm],
      synchronize: true, 
      autoLoadEntities:true,
    }),
    //UserModule,
    AuthModule,
    TypeOrmModule.forFeature([Login,RequestForm]), //allow to inject repository 
    JwtModule.register({
      secret:'abc12345',
      signOptions:{ expiresIn:'1h'},
    }),
  ],

  controllers: [AppController],
  providers: [AppService,AuthService,JwtStrategy],
})
export class AppModule {}




