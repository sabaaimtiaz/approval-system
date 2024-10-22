
import { Controller, Post, Body, Get, NotFoundException, Param, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { SignupDto } from './dto/signup.dto';
//import { AddUserDto } from './dto/adduserform.dto';
import { UserRequestDto } from './dto/requestform.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('/validate-token')
   @UseGuards(AuthGuard('jwt'))
  validateToken() {
    return { valid: true };
  }
    @Post('login')
  async login(@Body() loginDto: LoginDto) {
    try {
      const user = await this.authService.validateUser(loginDto.email, loginDto.password);
      if (!user) {
        return { message: 'Invalid credentials' };
      }
      const token = await this.authService.login(loginDto);

      const { password, ...userDetails } = user;
      return { token,
         message: 'Login successful',
         userDetails };
    } catch (error) {
      console.error('Error during login:', error);
      return { message: 'An error occurred during login' };
    }
  }
  @Post('signup')
  async signup(@Body() signupDto: SignupDto) {
    try {
      const user = await this.authService.signup(signupDto);
      return { message: 'Signup successful', user };
    } catch (error) {
      console.error('Error during signup:', error);
      return { message: 'An error occurred during signup' };
    }
  }

  // @Post('adduser')
  // async addUser(@Body() addUserDto: AddUserDto) {
  //   try {
  //     const user = await this.authService.addUser(addUserDto);
  //     return { message: 'User added successfully', user };
  //   } catch (error) {
  //     console.error('Error during add user:', error.message);
  //     return { message: 'An error occurred during adding the user', error: error.message };
  //   }
  // }
  
  @Post('request')
async request(@Body() userrequestDto: UserRequestDto) {
  try {
    const user = await this.authService.createRequest(userrequestDto);
    return { message: 'Request added successfully', user };
  } catch (error) {
    console.error('Error during Request:', error.message);
    return { message: 'An error occurred during request', error: error.message };
  }
}
  @Get('requests')
  async getAllRequests() {
    try {
      const requests = await this.authService.getAllRequests();
      return { message: 'Requests fetched successfully', requests };
    } catch (error) {
      console.error('Error fetching requests:', error.message);
      return { message: 'An error occurred during fetching requests', error: error.message };
    }
  }

  @Post('requests/:id/approve')
  async approveRequest(@Param('id') id: number, @Body('role') role: string) { 
    try {
      const updatedRequest = await this.authService.approveRequest(id, role); // pass role to the service
      if (!updatedRequest) {
        throw new NotFoundException(`Request with ID ${id} not found.`);
      }
      return { message: `Request approved successfully by ${role}`, request: updatedRequest };
      //return { message: `Request approved successfully by ${role}`, updatedRequest };  
    } catch (error) {
      console.error('Error during request approval:', error.message);
      return { message: 'An error occurred during request approval', error: error.message };
    }
  }
  
  @Post('requests/:id/decline')
  async declineRequest(@Param('id') id: number, @Body('role') role: string) { 
    try {
      const updatedRequest = await this.authService.declineRequest(id, role); 
      if (!updatedRequest) {
        throw new NotFoundException(`Request with ID ${id} not found.`);
      }
      return { message: `Request declined successfully by ${role}`, request: updatedRequest }; 
      //return { message: `Request declined successfully by ${role}`,  updatedRequest };
    } catch (error) {
      console.error('Error during request decline:', error.message);
      return { message: 'An error occurred during request decline', error: error.message };
    }
  }
  
  @Get('requests/hr')
  async getHRRequests() {
    try {                                                         //type and role
      const hrRequests = await this.authService.getRequestsByType('HR','HR');
      return { message: 'HR Requests fetched successfully', requests: hrRequests };
      
    } catch (error) {
      console.error('Error fetching HR requests:', error.message);
      return { message: 'An error occurred during fetching HR requests', error: error.message };
    }
  }

  @Get('requests/it')
  async getITRequests() {
    try {
      const itRequests = await this.authService.getRequestsByType('IT','IT');
      return { message: 'IT Requests fetched successfully', requests: itRequests };
      //return { message: 'IT Requests fetched successfully',  itRequests };
    } catch (error) {
      console.error('Error fetching IT requests:', error.message);
      return { message: 'An error occurred during fetching IT requests', error: error.message };
    }
  }
}




