import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { AppController } from './../src/app.controller';
import { HealthCheckModule } from './../src/health-check/health-check.module';
import { AppService } from './../src/app.service';
import { HealthCheckService } from './../src/health-check/health-check.service';

describe('AppController (e2e)', () => {
  let app: INestApplication;
  let healthCheckService: HealthCheckService;
  let appController: AppController;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [HealthCheckModule.register("https://dummyjson.com/products/1")],
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    app = moduleFixture.createNestApplication();
    healthCheckService = moduleFixture.get(HealthCheckService);
    appController = moduleFixture.get(AppController);
    await app.init();
  });

  it('invalid url', async () => {
    try {
      await Test.createTestingModule({
        imports: [HealthCheckModule.register("")],
        controllers: [AppController],
      }).compile();
    } catch (error) {
      expect(error.code).toEqual("ERR_INVALID_URL");
    }
  });


  it('/ (GET) success', async () => {
    jest.spyOn(healthCheckService, 'checkHealth').mockResolvedValueOnce("OK");
    let res = await appController.getHello();
    expect(res).toEqual('OK');
  });

  it('/ (GET) error', async () => {
    jest.spyOn(healthCheckService, 'checkHealth').mockRejectedValueOnce(new Error('Async error'));
    try {
      await appController.getHello();
    } catch (error) {
      expect(error.statusCode).toBeUndefined();
      expect(error.message).toEqual('Async error');
    }
  });
});
