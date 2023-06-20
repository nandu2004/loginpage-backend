import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import CreateUserDTO from 'src/user/user.create.dto';
import { UserService } from 'src/user/user.service';
import User from "src/user/user.entity";
import TokenPayload from "./interface/tokenPayload.i";
import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService,
        private readonly configService: ConfigService,){}
    async register({password,email}: CreateUserDTO){
        try{
            const hashpassword= await bcrypt.hash(password,23)
            const use=this.userService.create({
                email,
                password:hashpassword
            })

            return use;
        }
        catch(e){}
    }

    public async getAuthendicatedUser(email:string, plainTextPassword:string){
        try{
           const user = await this.userService.findByEmail(email);
           await this.verifyPassword(plainTextPassword,user.password);
        }catch(e){}
    }
    
  public getCookieWithJwtToken(user: User) {
    const payload: TokenPayload = { user };
    const token = this.jwtService.sign(payload);
    return `Authentication=${token}; HttpOnly; Path=/; Max-Age=${this.configService.get(
      "JWT_EXPIRATION_TIME",
    )}`;
  }

  public getCookieForLogout() {
    return `Authentication=; HttpOnly; Path=/; Max-Age:0`;
  }
    private async verifyPassword(plainTextPassword:string, hashedPassword:string){
        const isEqual = await bcrypt.compare(plainTextPassword,hashedPassword)
        if(!isEqual){
            throw new HttpException("wrong credentials",HttpStatus.BAD_REQUEST)
        }
    
    }

    
}
