import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { User } from './users/entity/user.entity';
import { AuthModule } from './auth/auth.module';
import { AppController } from './app.controller';
import { SavedService } from './saved/saved.service';
import { SavedModule } from './saved/saved.module';
import { Saved } from './saved/entity/saved.entity';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: process.env.DATABASE_USERNAME,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      entities: [User, Saved],
      synchronize: true,
    }),
    UsersModule,
    AuthModule,
    SavedModule,

  ],
  controllers: [AppController],
})
export class AppModule { }
