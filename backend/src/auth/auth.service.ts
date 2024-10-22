
import {  Injectable} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
//import { UserService } from 'src/users/services/users/users.service';
import { LoginDto } from './dto/login.dto';
//import { CreateUserDto } from 'src/users/dtos/CreateUser.dto';
import {  InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { Login } from 'src/tyoeorm/entities/Login';
import { DataSource, Repository } from 'typeorm';
import { SignupDto } from './dto/signup.dto';
//import { AddUserDto } from './dto/adduserform.dto';
//import { User } from 'src/tyoeorm/entities/User';
import { UserRequestDto } from './dto/requestform.dto';
import { RequestForm } from 'src/tyoeorm/entities/Request';
import * as bcrypt from 'bcrypt';
import { UserRole } from 'src/tyoeorm/entities/LoginEnums';
import { RequestType } from 'src/tyoeorm/entities/RequestEnums';
import { RequestSubtype } from 'src/tyoeorm/entities/RequestEnums';


@Injectable()
export class AuthService {
  constructor(

    @InjectDataSource()
     private readonly dataSource: DataSource,
    @InjectRepository(Login)
    private loginRepository: Repository<Login>,
    @InjectRepository(RequestForm) 
    private requestRepository: Repository<RequestForm>,
    private jwtService: JwtService,
  
    
  ) {}
async validateUser(email: string, password: string): Promise<Login | null> {
    try {
        //find user in the database based on email
      const user = await this.loginRepository.findOne({ where: { email } });
      // if (user && user.password === password) {
      //   return user;
      // }
      if (user) {
                          
        const isPasswordMatching = await bcrypt.compare(password, user.password);
        if (isPasswordMatching) {
          return user;
        }
      }
      return null;
    } catch (error) {
      console.error('Error validating user:', error);
      throw new Error('Database query error');
    }
  }
  async login(loginDto: LoginDto): Promise<string | null> {
    const user = await this.validateUser(loginDto.email, loginDto.password);
    if (!user) {
      return null;
    }

    const payload = { username: user.email, sub: user.id };
    return this.jwtService.sign(payload);
  }
  async signup(signupDto: SignupDto): Promise<{ message: string; user?: Login }> {
       
    const existingUser = await this.loginRepository.findOne({ where: { email: signupDto.email } });
  
    if (existingUser) {
      
      return { message: 'Email already exists' };
    }
    
    // returns the salt value
    const salt = await bcrypt.genSalt();
    //password in signupdto is hashed
     const hashedPassword = await bcrypt.hash(signupDto.password, salt);
    const newUser = this.loginRepository.create(
      {...signupDto
      ,password: hashedPassword,
      role: signupDto.role as UserRole,
    });
     this.loginRepository.save(newUser);
    return { message: 'Signup successful', user: newUser };

   // return this.loginRepository.save(newUser);
    
  }
      
  // async addUser(addUserDto: AddUserDto): Promise<User> {
  //   const newUser = this.userRepository.create(addUserDto);
  //   return this.userRepository.save(newUser);
  // }
  async createRequest(userrequestDto: UserRequestDto): Promise<RequestForm> {
    const newRequest = this.requestRepository.create({...userrequestDto,
      request_type: userrequestDto.request_type as RequestType, 
      request_subtype: userrequestDto.request_subtype as RequestSubtype,
  });
    return this.requestRepository.save(newRequest);
  }
  
  async getAllRequests(): Promise<RequestForm[]> {
    try {
      return await this.requestRepository.find(); 
    } catch (error) {
      console.error('Error fetching requests:', error);
      throw new Error('Database query error');
    }
  }
      async approveRequest(id: number, role: string): Promise<RequestForm | null> {
    return this.updateRequestStatus(id, 'Approved', role);
  }

  async declineRequest(id: number, role: string): Promise<RequestForm | null> {
    return this.updateRequestStatus(id, 'Declined', role);
  }

  async updateRequestStatus(id: number, status: string, role: string): Promise<RequestForm | null> {
    const request = await this.requestRepository.findOne({ where: { id } });
  
    if (!request) {
      return null;
    }
    switch (role) {
      case 'Superadmin':
        request.superadmin_approval = status;
        break;
      case 'HR':
        request.hr_approval = status;
        break;
      case 'IT':
        request.it_approval = status;
        break;
      default:
        return null;
    }
    request.updated_by = role;
  
    return this.requestRepository.save(request);
  }
     
  async getRequestsByType(type: string, role: string): Promise<RequestForm[]> {
    let approvalColumn: string;
  
    switch (role) {
      case 'Superadmin':
        approvalColumn = 'superadmin_approval';
        break;
      case 'HR':
        approvalColumn = 'hr_approval';
        break;
      case 'IT':
        approvalColumn = 'it_approval';
        break;
      // default:
      //   return [];
    }
  
    return await this.requestRepository.find({
      where: { request_type: type as RequestType},
      //where: { request_type: type, superadmin_approval: 'Approved', [approvalColumn]: 'Pending' },
    });
    
  }
  }

