import { Injectable } from '@nestjs/common';
import { HealthCheckService } from './health-check/health-check.service';

@Injectable()
export class AppService {
  constructor(private healthCheckService: HealthCheckService) {}
  async getHello(): Promise<any> {
    const checkHealthResponse = await this.healthCheckService.checkHealth();
    console.log(checkHealthResponse);
    return checkHealthResponse;
  }
}
