import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { DecreaseCreditDto } from './decrease-credit.dto';

const validatorOptions = {
  transform: true,
  whitelist: true,
  forbidNonWhitelisted: true,
};

it('email should not be empty', async () => {
  const importInfo = {};
  const decreaseCreditDto = plainToInstance(DecreaseCreditDto, importInfo);
  const errors = await validate(decreaseCreditDto, validatorOptions);
  expect(errors.length).not.toBe(0);
  expect(JSON.stringify(errors)).toContain(`email should not be empty`);
});

it('email must be an email', async () => {
  const importInfo = {
    email: '1',
  };
  const decreaseCreditDto = plainToInstance(DecreaseCreditDto, importInfo);
  const errors = await validate(decreaseCreditDto, validatorOptions);
  expect(errors.length).not.toBe(0);
  expect(JSON.stringify(errors)).not.toContain(`email should not be empty`);
  expect(JSON.stringify(errors)).toContain(`email must be an email`);
});

it('count should not be empty', async () => {
  const importInfo = {
    email: 'm@gmail.com',
  };
  const decreaseCreditDto = plainToInstance(DecreaseCreditDto, importInfo);
  const errors = await validate(decreaseCreditDto, validatorOptions);
  expect(errors.length).not.toBe(0);

  expect(JSON.stringify(errors)).not.toContain(`email should not be empty`);
  expect(JSON.stringify(errors)).not.toContain(`email must be an email`);
  expect(JSON.stringify(errors)).toContain(`count should not be empty`);
});

it('count must be a string', async () => {
  const importInfo = {
    email: 'm@gmail.com',
    count: 2,
  };
  const decreaseCreditDto = plainToInstance(DecreaseCreditDto, importInfo);
  const errors = await validate(decreaseCreditDto, validatorOptions);
  expect(errors.length).not.toBe(0);
  expect(JSON.stringify(errors)).not.toContain(`email should not be empty`);
  expect(JSON.stringify(errors)).not.toContain(`email must be an email`);
  expect(JSON.stringify(errors)).not.toContain(`count should not be empty`);
  expect(JSON.stringify(errors)).toContain(`count must be a string`);
});

it('count must match regular expression', async () => {
  const importInfo = {
    email: 'm@gmail.com',
    count: 'ad',
  };
  const decreaseCreditDto = plainToInstance(DecreaseCreditDto, importInfo);
  const errors = await validate(decreaseCreditDto, validatorOptions);
  expect(errors.length).not.toBe(0);
  expect(JSON.stringify(errors)).not.toContain(`email should not be empty`);
  expect(JSON.stringify(errors)).not.toContain(`email must be an email`);
  expect(JSON.stringify(errors)).not.toContain(`count should not be empty`);
  expect(JSON.stringify(errors)).not.toContain(`count must be a string`);
  expect(JSON.stringify(errors)).toContain(
    `count must match /[۰۱۲۳۴۵۶۷۸۹0-9]$/ regular expression`,
  );
});

it('property test should not exist', async () => {
  const importInfo = {
    email: 'm@gmail.com',
    count: '2',
    test: 1,
  };
  const decreaseCreditDto = plainToInstance(DecreaseCreditDto, importInfo);
  const errors = await validate(decreaseCreditDto, validatorOptions);
  expect(errors.length).not.toBe(0);
  expect(JSON.stringify(errors)).not.toContain(`email should not be empty`);
  expect(JSON.stringify(errors)).not.toContain(`email must be an email`);
  expect(JSON.stringify(errors)).not.toContain(`count should not be empty`);
  expect(JSON.stringify(errors)).not.toContain(`count must be a string`);
  expect(JSON.stringify(errors)).not.toContain(
    `count must match /[۰۱۲۳۴۵۶۷۸۹0-9]$/ regular expression`,
  );
  expect(JSON.stringify(errors)).toContain('property test should not exist');
});

it('error length is 0', async () => {
  const importInfo = {
    email: 'm@gmail.com',
    count: '2',
  };
  const decreaseCreditDto = plainToInstance(DecreaseCreditDto, importInfo);
  const errors = await validate(decreaseCreditDto, validatorOptions);
  expect(errors.length).toBe(0);
  expect(JSON.stringify(errors)).not.toContain(`email should not be empty`);
  expect(JSON.stringify(errors)).not.toContain(`email must be an email`);
  expect(JSON.stringify(errors)).not.toContain(`count should not be empty`);
  expect(JSON.stringify(errors)).not.toContain(`count must be a string`);
  expect(JSON.stringify(errors)).not.toContain(
    `count must match /[۰۱۲۳۴۵۶۷۸۹0-9]$/ regular expression`,
  );
});
