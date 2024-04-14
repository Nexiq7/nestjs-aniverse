import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Saved } from './entity/saved.entity';
import { SavedService } from './saved.service';
import { UsersModule } from 'src/users/users.module';
import { SavedController } from './saved.controller';

@Module({
    imports: [UsersModule, TypeOrmModule.forFeature([Saved])],
    providers: [SavedService],
    exports: [SavedService],
    controllers: [SavedController],
})
export class SavedModule { }
