 import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import User from './user.entity';
import { Repository } from 'typeorm';
import CreateUserDTO from './user.create.dto';

@Injectable()
export class UserService {

    constructor(@InjectRepository(User) private userRepo: Repository<User>) {}
   
    async findById(id: string){
        const user = await this.userRepo.findOne({ where: {id:id} });
        if(user){
            return user;
        }
        throw new HttpException("User not found",HttpStatus.NOT_FOUND); 
    }
    async create(userData: CreateUserDTO){
        const newUser = await this.userRepo.create(userData)
        await this.userRepo.save(newUser);
        return newUser;
    }
    async findByEmail(email: string){
        const user=await this.userRepo.findOne({where:{email:email}})
        if(user){
            return user;}
        throw new HttpException("User not found",HttpStatus.NOT_FOUND); 
    }



}
