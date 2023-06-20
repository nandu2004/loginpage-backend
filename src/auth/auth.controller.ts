import { Body, Controller, HttpCode, Post, Req,Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { localAuthenticationGuard } from './localAuthenticationGuard';
import { JwtService } from "@nestjs/jwt";
import { Response } from "express";
import JwtAuthGuard from "./jwtAuth.guard";
import RequestWithUser from './interface/requestWithUser.i';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService){}

    @Post('register')
    async register(@Body('email') email: string, @Body('password') password: string)
    {
        return this.authService.register({email, password})
    }
    @HttpCode(200)
    @Post('login')
    @UseGuards(localAuthenticationGuard)
    async login(@Req() request: RequestWithUser, @Res() response: Response) {
      const { user } = request;
      const cookie = this.authService.getCookieWithJwtToken(user);
      response.setHeader("Set-Cookie", cookie);
      return response.send(user);
    }
  
    @HttpCode(200)
    @UseGuards(JwtAuthGuard)
    @Post("logout")
    async logOut(@Req() _request: RequestWithUser, @Res() response: Response) {
      response.setHeader("Set-Cookie", this.authService.getCookieForLogout());
      response.send();
    }
        
    }


