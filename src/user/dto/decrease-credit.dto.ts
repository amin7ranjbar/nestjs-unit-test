import { IsEmail, IsNotEmpty, IsString, Matches } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class DecreaseCreditDto {

    @ApiProperty({
        example: 'admin@gmail.com',
    })
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @ApiProperty({
        example: '23',
    })
    @Matches(/[۰۱۲۳۴۵۶۷۸۹0-9]$/)
    @IsString()
    @IsNotEmpty()
    count: string;
}