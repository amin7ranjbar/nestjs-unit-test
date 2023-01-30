import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { JwtModule } from '@nestjs/jwt';
import { getRepositoryToken } from '@nestjs/typeorm';
import { UserEntity } from './user.entity';

describe('UserService', () => {
  let service: UserService;

  const mockUserRepository = {
    save: jest.fn(entity => entity),
    findOne: jest.fn(entity => entity)
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        JwtModule.register({ secret: "test" }),
      ],
      providers: [
        {
          provide: getRepositoryToken(UserEntity),
          useValue: mockUserRepository,
        },
        UserService],
    }).compile();

    service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
