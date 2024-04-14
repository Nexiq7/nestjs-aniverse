import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Saved } from './entity/saved.entity';
import { Repository } from 'typeorm';
import { UsersService } from 'src/users/users.service';
import { SaveAnimeDto } from './dtos/SaveAnime.dto';
import { RemoveSavedAnimeDto } from './dtos/RemoveSavedAnime.dto';
import { CheckAnimeSavedDto } from './dtos/CheckAnimeSavedDto.dto';


@Injectable()
export class SavedService {
    constructor(
        @InjectRepository(Saved)
        private readonly savedRepository: Repository<Saved>,
        private usersService: UsersService,
    ) { }

    async getAllSavedAnime() {
        return this.savedRepository.find({ relations: ['user'] });
    }

    async getSavedAnimesByUsername(username: string) {
        return await this.savedRepository.find({
            where: {
                user: {
                    username: username
                }
            }
        });
    }

    async getSavedAnimesByAnimeId(animeId: string) {
        return await this.savedRepository.find({
            where: {
                animeId
            }
        });
    }

    async saveAnime(saveAnimeProps: SaveAnimeDto): Promise<Saved> {
        const user = await this.usersService.findUserByUsername(saveAnimeProps.username);
        const isAnimeAlreadySaved = await this.checkAnimeSaved(saveAnimeProps)

        if (!isAnimeAlreadySaved) {
            const savedAnime = new Saved();
            savedAnime.animeId = saveAnimeProps.animeId;
            savedAnime.user = user;

            return this.savedRepository.save(savedAnime);
        } else {
            throw new HttpException("This AnimeId is already saved", HttpStatus.BAD_REQUEST);
        }
    }

    async removeSavedAnime(removeSavedAnimeDto: RemoveSavedAnimeDto): Promise<void> {

        const animeId = removeSavedAnimeDto.animeId
        const username = removeSavedAnimeDto.username

        const saved = await this.savedRepository.findOne({
            where: {
                animeId,
                user: {
                    username
                }
            }
        });
        if (!saved) {
            throw new HttpException('This AnimeId is not saved', HttpStatus.NOT_FOUND);
        }

        await this.savedRepository.remove(saved);
    }

    async removeSavedAnimesByUsername(username: string) {
        const savedAnimes = await this.savedRepository.find({
            where: {
                user: {
                    username: username
                }
            }
        });

        return await this.savedRepository.remove(savedAnimes);

    }


    async checkAnimeSaved(checkAnimeSavedProps: CheckAnimeSavedDto) {
        const username = checkAnimeSavedProps.username
        const animeId = checkAnimeSavedProps.animeId

        const savedEntry = await this.savedRepository.findOne({
            where: {
                animeId,
                user: {
                    username
                }
            }
        });

        if (username == null || animeId == null) {
            throw new HttpException('Username or AnimeId missing', HttpStatus.BAD_REQUEST);
        }

        if (savedEntry) {
            return true;
        } else {
            return false;
        }
    }
}
