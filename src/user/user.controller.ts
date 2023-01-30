import { Body, Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { UserService } from './user.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { multerOptions } from '../config/multer.config';
import { CreateUserDto } from './dto/create-user.dto';
import { ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { LoginUserDto } from './dto/login-user.dto';
import { DecreaseCreditDto } from './dto/decrease-credit.dto';

@Controller('user')
@ApiTags('user')
export class UserController {
    constructor(private readonly userService: UserService) { }

    @Post('create')
    async create(@Body() body: CreateUserDto) {
        return this.userService.create(body);
    }

    @Post('login')
    async login(@Body() body: LoginUserDto) {
        return this.userService.login(body);
    }

    @Post('increase')
    async increase(@Body() body: DecreaseCreditDto) {
        return this.userService.increase(body);
    }

    @ApiConsumes('multipart/form-data')
    @ApiBody({
      schema: {
        type: 'object',
        properties: {
          file: {
            type: 'string',
            format: 'binary',
          },
        },
      },
    })
    @Post('avatar')
    @UseInterceptors(FileInterceptor('file', multerOptions))
    saveAvatar(@UploadedFile() file: Express.Multer.File) {
      return file.filename;
    }

}
