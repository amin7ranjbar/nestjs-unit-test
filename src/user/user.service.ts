import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UserEntity } from './user.entity';
import { Repository } from 'typeorm';
import { compare, hash } from 'bcrypt';
import { LoginUserDto } from './dto/login-user.dto';
import { DecreaseCreditDto } from './dto/decrease-credit.dto';

@Injectable()
export class UserService {
  constructor(
    private readonly jwtService: JwtService,
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>,
  ) {}

  async create(body: CreateUserDto) {
    const hashedPassword = await hash(body.password, 10);
    try {
      const createdUser = await this.usersRepository.create({
        ...body,
        password: hashedPassword,
      });
      await this.usersRepository.save(createdUser);
      createdUser.password = undefined;
      return createdUser;
    } catch (error) {
      if (error?.code === '23505') {
        throw new HttpException(
          'User with that email already exists',
          HttpStatus.BAD_REQUEST,
        );
      }
      throw new HttpException(
        'Something went wrong',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async login(body: LoginUserDto) {
    try {
      const user = await this.getByEmail(body.email);
      const isPasswordMatching = await compare(body.password, user.password);
      if (!isPasswordMatching) {
        throw new HttpException(
          'Wrong credentials provided',
          HttpStatus.BAD_REQUEST,
        );
      }
      return await this.createAccessToken(user.id, user.email);
    } catch (error) {
      throw new HttpException(
        'Wrong credentials provided',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async increase(body: DecreaseCreditDto) {
    const user = await this.getByEmail(body.email);
    user.credit =
      user.credit + parseInt(this.convertPersianToEnglish(body.count));
    await this.usersRepository.save(user);
    return user.credit;
  }

  convertPersianToEnglish = (s) =>
    s.replace(/[۰-۹]/g, (d) => '۰۱۲۳۴۵۶۷۸۹'.indexOf(d));

  async getByEmail(email: string) {
    const user = await this.usersRepository.findOneBy({ email });
    if (user) {
      return user;
    }
    throw new HttpException(
      'User with this email does not exist',
      HttpStatus.NOT_FOUND,
    );
  }

  private async createAccessToken(
    id: number,
    email: string,
  ): Promise<{ accessToken: string }> {
    const accessToken = this.jwtService.sign({ id, email });
    return { accessToken };
  }
}
