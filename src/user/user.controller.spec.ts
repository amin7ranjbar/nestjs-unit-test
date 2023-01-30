import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { JwtModule } from '@nestjs/jwt';
import { UserService } from './user.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { UserEntity } from './user.entity';
import { ValidationPipe } from '@nestjs/common';

describe('UserController', () => {
  let app;
  let controller: UserController;
  const mockUserRepository = {
    save: jest.fn(entity => entity),
    findOne: jest.fn(entity => entity)
  };
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        JwtModule.register({ secret: "test" }),
      ],
      controllers: [UserController],
      providers: [
        {
          provide: getRepositoryToken(UserEntity),
          useValue: mockUserRepository,
        },
        UserService],
    }).compile();

    controller = module.get<UserController>(UserController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
