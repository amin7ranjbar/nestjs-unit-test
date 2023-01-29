import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HealthCheckModule } from './health-check/health-check.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    HealthCheckModule.register(process.env.CHECK_HEALTH_URL)],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
