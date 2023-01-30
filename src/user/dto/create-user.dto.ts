import { IsNumber, IsArray, ArrayMinSize, IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { LoginUserDto } from './login-user.dto';

export class CreateUserDto extends LoginUserDto{
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

    @ApiProperty({
        example: ['1', '2'],
    })
    @IsArray()
    @IsString({ each: true })
    @ArrayMinSize(1)
    phone_numbers: string[];

    @ApiProperty({
        example: 0,
    })
    @IsNumber()
    credit: number;

    @ApiProperty({
        example: "111",
    })
    @IsString()
    avatar: string;
}