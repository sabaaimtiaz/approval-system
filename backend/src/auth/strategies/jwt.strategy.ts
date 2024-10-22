// import { Injectable, UnauthorizedException } from "@nestjs/common";
// import { PassportStrategy } from "@nestjs/passport";
// import { JwtPayload } from "jsonwebtoken";
// import { ExtractJwt, Strategy } from "passport-jwt";
// import { UsersService } from "src/users/services/users/users.service";
// //import { AuthService } from "../auth.service";


// @Injectable()
// export class JwtStrategy extends PassportStrategy(Strategy) {
//     constructor(private usersService:UsersService){
//         super({ 
//             jwtFromRequest:ExtractJwt.fromAuthHeaderAsBearerToken(),
//             ignoreExpiration: false,
//             secretOrKey:'abc12345', 
//         });
//     }
      
//     async validate(payload: JwtPayload) { // extract the username from JWT payload 
//         const user = await this.usersService.findOneByEmail(payload.email); //It uses the UsersService to find a user in the database with the given username
//         if (!user) {
//             throw new UnauthorizedException();//if user found it will attach to the request object and this canbe accessed in a route handler
//         }
//         return user;
//     }
//     // validate(payLoad: any) {
//     //     console.log("Inside JWT Strategy Validate");
//     //     console.log(payLoad);
//     //     return payLoad;
//     // } }
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable() //makiing jwt strategy as a provider which can be use in controller or services 
export class JwtStrategy extends PassportStrategy(Strategy) { //strategy class from passport-jwt that implements jwt
  constructor() {
    super({ 
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'abc12345',
    });
  }

  async validate(payload: any) {  
    return { userId: payload.sub, email: payload.email };
  
  }
}
