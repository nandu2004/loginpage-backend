import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { string } from "joi";
import { Strategy } from "passport-local";
import { AuthService } from "./auth.service";


@Injectable()
export class localStrategy extends PassportStrategy(Strategy){

    constructor(private authService: AuthService){
        super({
            usernameField: "email",
        })
    }
    async validateUser(email:string,password:string){
        return this.authService.getAuthendicatedUser(email,password);
    }
        // const user=await this.userService.findOne(email)
        // if (user && user.password==password){
        //     //to take out username and password 
        //     const{password,email,...rest}=user
}
