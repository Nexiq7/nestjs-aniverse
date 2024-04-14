import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { SavedService } from './saved.service';
import { Saved } from './entity/saved.entity';
import { SaveAnimeDto } from './dtos/SaveAnime.dto';
import { RemoveSavedAnimeDto } from './dtos/RemoveSavedAnime.dto';
import { User } from 'src/users/entity/user.entity';
import { CheckAnimeSavedDto } from './dtos/CheckAnimeSavedDto.dto';

@Controller('saved')
export class SavedController {

    constructor(private readonly savedService: SavedService) { }

    @Get()
    async getAllSavedAnime() {
        return this.savedService.getAllSavedAnime();
    }

    @Get(':username')
    async getSavedAnimeByUsername(@Param('username') username: string) {
        return this.savedService.getSavedAnimesByUsername(username)
    }

    @Get(':animeId')
    async getSavedAnimesByAnimeId(@Param('animeId') animeId: string) {
        return this.savedService.getSavedAnimesByAnimeId(animeId)
    }

    @Post('saveAnime')
    async saveAnime(@Body() saveAnimeProps: SaveAnimeDto): Promise<Saved> {
        return await this.savedService.saveAnime(saveAnimeProps);
    }

    @Post('removeSavedAnime')
    async removeSavedAnime(@Body() removeSavedAnimeDto: RemoveSavedAnimeDto) {
        return await this.savedService.removeSavedAnime(removeSavedAnimeDto);
    }

    @Get('removeSavedAnimesByUsername/:username')
    async removeSavedAnimesByUsername(@Param('username') username: string) {
        return this.savedService.removeSavedAnimesByUsername(username)
    }

    @Post('checkAnimeSaved')
    async checkAnimeSaved(@Body() CheckAnimeSavedProps: CheckAnimeSavedDto) {
        return await this.savedService.checkAnimeSaved(CheckAnimeSavedProps);
    }
}
