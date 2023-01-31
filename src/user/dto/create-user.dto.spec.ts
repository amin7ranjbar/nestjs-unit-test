import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { CreateUserDto } from './create-user.dto';

const validatorOptions = {
  transform: true,
  whitelist: true,
  forbidNonWhitelisted: true,
};

it('email should not be empty', async () => {
  const importInfo = {};
  const createUserDto = plainToInstance(CreateUserDto, importInfo);
  const errors = await validate(createUserDto, validatorOptions);
  expect(errors.length).not.toBe(0);
  expect(JSON.stringify(errors)).toContain(`email should not be empty`);
});

it('email must be an email', async () => {
  const importInfo = {
    email: '1',
  };
  const createUserDto = plainToInstance(CreateUserDto, importInfo);
  const errors = await validate(createUserDto, validatorOptions);
  expect(errors.length).not.toBe(0);
  expect(JSON.stringify(errors)).not.toContain(`email should not be empty`);
  expect(JSON.stringify(errors)).toContain(`email must be an email`);
});

it('password should not be empty', async () => {
  const importInfo = {
    email: 'm@gmail.com',
  };
  const createUserDto = plainToInstance(CreateUserDto, importInfo);
  const errors = await validate(createUserDto, validatorOptions);
  expect(errors.length).not.toBe(0);
  expect(JSON.stringify(errors)).not.toContain(`email should not be empty`);
  expect(JSON.stringify(errors)).not.toContain(`email must be an email`);
  expect(JSON.stringify(errors)).toContain(`password should not be empty`);
});

it('password must be a string', async () => {
  const importInfo = {
    email: 'm@gmail.com',
    password: 1,
  };
  const createUserDto = plainToInstance(CreateUserDto, importInfo);
  const errors = await validate(createUserDto, validatorOptions);
  expect(errors.length).not.toBe(0);
  expect(JSON.stringify(errors)).not.toContain(`email should not be empty`);
  expect(JSON.stringify(errors)).not.toContain(`email must be an email`);
  expect(JSON.stringify(errors)).not.toContain(`password should not be empty`);
  expect(JSON.stringify(errors)).toContain(`password must be a string`);
});

it('phone_numbers must be an array 1', async () => {
  const importInfo = {
    email: 'm@gmail.com',
    password: 'test',
  };
  const createUserDto = plainToInstance(CreateUserDto, importInfo);
  const errors = await validate(createUserDto, validatorOptions);
  expect(errors.length).not.toBe(0);
  expect(JSON.stringify(errors)).not.toContain(`email should not be empty`);
  expect(JSON.stringify(errors)).not.toContain(`email must be an email`);
  expect(JSON.stringify(errors)).not.toContain(`password should not be empty`);
  expect(JSON.stringify(errors)).not.toContain(`password must be a string`);
  expect(JSON.stringify(errors)).toContain(`phone_numbers must be an array`);
});

it('phone_numbers must be an array 2', async () => {
  const importInfo = {
    email: 'm@gmail.com',
    password: 'test',
    phone_numbers: 'test',
  };
  const createUserDto = plainToInstance(CreateUserDto, importInfo);
  const errors = await validate(createUserDto, validatorOptions);
  expect(errors.length).not.toBe(0);
  expect(JSON.stringify(errors)).not.toContain(`email should not be empty`);
  expect(JSON.stringify(errors)).not.toContain(`email must be an email`);
  expect(JSON.stringify(errors)).not.toContain(`password should not be empty`);
  expect(JSON.stringify(errors)).not.toContain(`password must be a string`);
  expect(JSON.stringify(errors)).toContain(`phone_numbers must be an array`);
});

it('each value in phone_numbers must be a string', async () => {
  const importInfo = {
    email: 'm@gmail.com',
    password: 'test',
    phone_numbers: [1],
  };
  const createUserDto = plainToInstance(CreateUserDto, importInfo);
  const errors = await validate(createUserDto, validatorOptions);
  expect(errors.length).not.toBe(0);
  expect(JSON.stringify(errors)).not.toContain(`email should not be empty`);
  expect(JSON.stringify(errors)).not.toContain(`email must be an email`);
  expect(JSON.stringify(errors)).not.toContain(`password should not be empty`);
  expect(JSON.stringify(errors)).not.toContain(`password must be a string`);
  expect(JSON.stringify(errors)).not.toContain(
    `phone_numbers must be an array`,
  );
  expect(JSON.stringify(errors)).toContain(
    `each value in phone_numbers must be a string`,
  );
});

it('phone_numbers must contain at least 1 elements', async () => {
  const importInfo = {
    email: 'm@gmail.com',
    password: 'test',
    phone_numbers: [],
  };
  const createUserDto = plainToInstance(CreateUserDto, importInfo);
  const errors = await validate(createUserDto, validatorOptions);
  expect(errors.length).not.toBe(0);
  expect(JSON.stringify(errors)).not.toContain(`email should not be empty`);
  expect(JSON.stringify(errors)).not.toContain(`email must be an email`);
  expect(JSON.stringify(errors)).not.toContain(`password should not be empty`);
  expect(JSON.stringify(errors)).not.toContain(`password must be a string`);
  expect(JSON.stringify(errors)).not.toContain(
    `phone_numbers must be an array`,
  );
  expect(JSON.stringify(errors)).toContain(
    `phone_numbers must contain at least 1 elements`,
  );
});

it('credit must be a number conforming to the specified constraints 1', async () => {
  const importInfo = {
    email: 'm@gmail.com',
    password: 'test',
    phone_numbers: ['test'],
  };
  const createUserDto = plainToInstance(CreateUserDto, importInfo);
  const errors = await validate(createUserDto, validatorOptions);
  expect(errors.length).not.toBe(0);
  expect(JSON.stringify(errors)).not.toContain(`email should not be empty`);
  expect(JSON.stringify(errors)).not.toContain(`email must be an email`);
  expect(JSON.stringify(errors)).not.toContain(`password should not be empty`);
  expect(JSON.stringify(errors)).not.toContain(`password must be a string`);
  expect(JSON.stringify(errors)).not.toContain(
    `phone_numbers must be an array`,
  );
  expect(JSON.stringify(errors)).not.toContain(
    `phone_numbers must contain at least 1 elements`,
  );
  expect(JSON.stringify(errors)).toContain(
    `credit must be a number conforming to the specified constraints`,
  );
});

it('credit must be a number conforming to the specified constraints 2', async () => {
  const importInfo = {
    email: 'm@gmail.com',
    password: 'test',
    phone_numbers: ['test'],
    credit: '2',
  };
  const createUserDto = plainToInstance(CreateUserDto, importInfo);
  const errors = await validate(createUserDto, validatorOptions);
  expect(errors.length).not.toBe(0);
  expect(JSON.stringify(errors)).not.toContain(`email should not be empty`);
  expect(JSON.stringify(errors)).not.toContain(`email must be an email`);
  expect(JSON.stringify(errors)).not.toContain(`password should not be empty`);
  expect(JSON.stringify(errors)).not.toContain(`password must be a string`);
  expect(JSON.stringify(errors)).not.toContain(
    `phone_numbers must be an array`,
  );
  expect(JSON.stringify(errors)).not.toContain(
    `phone_numbers must contain at least 1 elements`,
  );
  expect(JSON.stringify(errors)).toContain(
    `credit must be a number conforming to the specified constraints`,
  );
});

it('avatar must be a string 1', async () => {
  const importInfo = {
    email: 'm@gmail.com',
    password: 'test',
    phone_numbers: ['test'],
    credit: 2,
  };
  const createUserDto = plainToInstance(CreateUserDto, importInfo);
  const errors = await validate(createUserDto, validatorOptions);
  expect(errors.length).not.toBe(0);
  expect(JSON.stringify(errors)).not.toContain(`email should not be empty`);
  expect(JSON.stringify(errors)).not.toContain(`email must be an email`);
  expect(JSON.stringify(errors)).not.toContain(`password should not be empty`);
  expect(JSON.stringify(errors)).not.toContain(`password must be a string`);
  expect(JSON.stringify(errors)).not.toContain(
    `phone_numbers must be an array`,
  );
  expect(JSON.stringify(errors)).not.toContain(
    `phone_numbers must contain at least 1 elements`,
  );
  expect(JSON.stringify(errors)).not.toContain(
    `credit must be a number conforming to the specified constraints`,
  );
  expect(JSON.stringify(errors)).toContain('avatar must be a string');
});

it('avatar must be a string 2', async () => {
  const importInfo = {
    email: 'm@gmail.com',
    password: 'test',
    phone_numbers: ['test'],
    credit: 2,
    avatar: 1,
  };
  const createUserDto = plainToInstance(CreateUserDto, importInfo);
  const errors = await validate(createUserDto, validatorOptions);
  expect(errors.length).not.toBe(0);
  expect(JSON.stringify(errors)).not.toContain(`email should not be empty`);
  expect(JSON.stringify(errors)).not.toContain(`email must be an email`);
  expect(JSON.stringify(errors)).not.toContain(`password should not be empty`);
  expect(JSON.stringify(errors)).not.toContain(`password must be a string`);
  expect(JSON.stringify(errors)).not.toContain(
    `phone_numbers must be an array`,
  );
  expect(JSON.stringify(errors)).not.toContain(
    `phone_numbers must contain at least 1 elements`,
  );
  expect(JSON.stringify(errors)).not.toContain(
    `credit must be a number conforming to the specified constraints`,
  );
  expect(JSON.stringify(errors)).toContain('avatar must be a string');
});

it('property test should not exist', async () => {
  const importInfo = {
    email: 'm@gmail.com',
    password: 'test',
    phone_numbers: ['test'],
    credit: 2,
    avatar: 'test',
    test: 1,
  };
  const createUserDto = plainToInstance(CreateUserDto, importInfo);
  const errors = await validate(createUserDto, validatorOptions);
  expect(errors.length).not.toBe(0);
  expect(JSON.stringify(errors)).not.toContain(`email should not be empty`);
  expect(JSON.stringify(errors)).not.toContain(`email must be an email`);
  expect(JSON.stringify(errors)).not.toContain(`password should not be empty`);
  expect(JSON.stringify(errors)).not.toContain(`password must be a string`);
  expect(JSON.stringify(errors)).not.toContain(
    `phone_numbers must be an array`,
  );
  expect(JSON.stringify(errors)).not.toContain(
    `phone_numbers must contain at least 1 elements`,
  );
  expect(JSON.stringify(errors)).not.toContain(
    `credit must be a number conforming to the specified constraints`,
  );
  expect(JSON.stringify(errors)).not.toContain('avatar must be a string');
  expect(JSON.stringify(errors)).toContain('property test should not exist');
});

it('error length is 0', async () => {
  const importInfo = {
    email: 'm@gmail.com',
    password: 'test',
    phone_numbers: ['test'],
    credit: 2,
    avatar: 'test',
  };
  const createUserDto = plainToInstance(CreateUserDto, importInfo);
  const errors = await validate(createUserDto, validatorOptions);
  expect(errors.length).toBe(0);
  expect(JSON.stringify(errors)).not.toContain(`email should not be empty`);
  expect(JSON.stringify(errors)).not.toContain(`email must be an email`);
  expect(JSON.stringify(errors)).not.toContain(`password should not be empty`);
  expect(JSON.stringify(errors)).not.toContain(`password must be a string`);
  expect(JSON.stringify(errors)).not.toContain(
    `phone_numbers must be an array`,
  );
  expect(JSON.stringify(errors)).not.toContain(
    `phone_numbers must contain at least 1 elements`,
  );
  expect(JSON.stringify(errors)).not.toContain(
    `credit must be a number conforming to the specified constraints`,
  );
  expect(JSON.stringify(errors)).not.toContain('avatar must be a string');
});
