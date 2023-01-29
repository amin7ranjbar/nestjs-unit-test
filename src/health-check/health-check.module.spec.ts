import { Test, TestingModule } from '@nestjs/testing';
import { HealthCheckModule } from './health-check.module';

describe('HealthCheckModule', () => {
  it('invalid url', async () => {
    try {
      await Test.createTestingModule({
        imports: [HealthCheckModule.register("")],
      }).compile();
    } catch (error) {
      expect(error.code).toEqual("ERR_INVALID_URL");
    }
  });

  it('should be defined', async() => {
    const module = await Test.createTestingModule({
      imports: [HealthCheckModule.register("https://dummyjson.com/products/1")],
    }).compile();
    expect(module).toBeDefined();
    expect(module).toBeInstanceOf(TestingModule);
  });
});