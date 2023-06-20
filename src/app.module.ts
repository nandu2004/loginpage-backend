import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './Database/database.module';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import Joi from "@hapi/joi";
// import Joi from "@hapi/joi";


@Module({
  imports: [DatabaseModule, ConfigModule.forRoot(
    {
      validationSchema:Joi.object({
          POSTGRES_PORT: Joi.string().required(),
          POSTGRES_HOST: Joi.string().required(),
          POSTGRES_USER: Joi.string().required(),
          POSTGRES_PASSWORD: Joi.string().required(),
          POSTGRES_DB: Joi.string().required(),
          JWT_SECRET: Joi.string().required(),
          JWT_EXPIRATION_TIME: Joi.string().required(),
      })
    }
  ),UserModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
