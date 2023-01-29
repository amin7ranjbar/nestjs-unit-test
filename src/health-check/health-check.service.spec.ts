import { Test, TestingModule } from '@nestjs/testing';
import { HealthCheckModule } from './health-check.module';
import { HealthCheckService } from './health-check.service';

import axios from 'axios';

jest.mock('axios');

describe('HealthCheckService', () => {
  let service: HealthCheckService;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [HealthCheckModule.register("https://dummyjson.com/products/1")],
    }).compile();
    service = module.get<HealthCheckService>(HealthCheckService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('checkHealth success', async () => {
    jest.spyOn(axios, 'get').mockResolvedValueOnce({data : "OK"});
    let res = await service.checkHealth();
    expect(res).toEqual('OK');
  });

  it('checkHealth error', async () => {
    jest.spyOn(axios, 'get').mockRejectedValueOnce(new Error('Async error'));
    try {
      await service.checkHealth();
    } catch (error) {
      expect(error.statusCode).toBeUndefined();
      expect(error.message).toEqual('Async error');
    }
  });
});