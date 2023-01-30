import { IsNumber, IsArray, ArrayMinSize, IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginUserDto {
    @ApiProperty({
        example: 'admin@gmail.com',
    })
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @ApiProperty({
        example: 'admin',
    })
    @IsString()
    @IsNotEmpty()
    password: string;
}