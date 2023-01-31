import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { JwtModule } from '@nestjs/jwt';
import { getRepositoryToken } from '@nestjs/typeorm';
import { UserEntity } from './user.entity';
import { HttpException } from '@nestjs/common';

describe('UserService', () => {
  let service: UserService;

  const mockDb = [];

  const mockUserRepository = {
    create: jest.fn((entity) => {
      const obj = mockDb.find((item) => item.email === entity.email);
      if (obj) {
        const error = new Error('message');
        error['code'] = '23505';
        throw error;
      }
      return { ...entity, id: mockDb.length + 1 };
    }),
    save: jest.fn((entity) => {
      const data = JSON.parse(JSON.stringify(entity));
      mockDb.push(data);
      return entity;
    }),
    findOneBy: jest.fn((entity) => {
      const obj = mockDb.find((item) => item.email === entity.email);
      return obj;
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [JwtModule.register({ secret: 'test' })],
      providers: [
        {
          provide: getRepositoryToken(UserEntity),
          useValue: mockUserRepository,
        },
        UserService,
      ],
    }).compile();

    service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('create user success', async () => {
    const response = await service.create({
      email: 'm@gmail.com',
      password: 'test',
      phone_numbers: ['test'],
      credit: 2,
      avatar: 'test',
    });
    expect(response.id).toBe(1);
    expect(response.email).toBe('m@gmail.com');
    expect(response.password).toBeUndefined();
    expect(response.phone_numbers).toHaveLength(1);
    expect(response.phone_numbers[0]).toBe('test');
    expect(response.credit).toBe(2);
    expect(response.avatar).toBe('test');
  });

  it('User with that email already exists', async () => {
    try {
      await service.create({
        email: 'm@gmail.com',
        password: 'test',
        phone_numbers: ['test'],
        credit: 2,
        avatar: 'test',
      });
    } catch (error) {
      expect(error).toBeInstanceOf(HttpException);
      expect(error.status).toBe(400);
      expect(error.response).toBe('User with that email already exists');
    }
  });

  it('get by email success', async () => {
    const response = await service.getByEmail('m@gmail.com');
    expect(response.id).toBe(1);
    expect(response.email).toBe('m@gmail.com');
    expect(typeof response.password).toBe('string');
    expect(response.phone_numbers).toHaveLength(1);
    expect(response.phone_numbers[0]).toBe('test');
    expect(response.credit).toBe(2);
    expect(response.avatar).toBe('test');
  });

  it('User with this email does not exist', async () => {
    try {
      await service.getByEmail('a@gmail.com');
    } catch (error) {
      expect(error).toBeInstanceOf(HttpException);
      expect(error.status).toBe(404);
      expect(error.response).toBe('User with this email does not exist');
    }
  });

  it('login success', async () => {
    const response = await service.login({
      email: 'm@gmail.com',
      password: 'test',
    });

    expect(typeof response.accessToken).toBe('string');
  });

  it('Wrong credentials provided', async () => {
    try {
      await service.login({
        email: 'm@gmail.com',
        password: 'test1',
      });
    } catch (error) {
      expect(error).toBeInstanceOf(HttpException);
      expect(error.status).toBe(400);
      expect(error.response).toBe('Wrong credentials provided');
    }
  });

  it('convertPersianToEnglish success', async () => {
    const response = await service.convertPersianToEnglish('2۲۱');

    expect(response).toBe('221');
  });
});
