import { Controller,Get,Param} from '@nestjs/common';
// import { Get } from '@nestjs/common/decorators';
// import { Param } from '@nestjs/common/decorators';
import { UserService } from './user.service';


@Controller('users')
export class UserController {
    constructor(private readonly userService: UserService){}
   
    @Get(':id')
    async findOne(@Param("id") id: string){
       return await this.userService.findById(id); 
    
    }

}
