import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HealthCheckModule } from './health-check/health-check.module';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './user/user.entity';
import { ServeStaticModule } from '@nestjs/serve-static';

@Module({
  imports: [
    ConfigModule.forRoot(),
    HealthCheckModule.register(process.env.CHECK_HEALTH_URL),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: parseInt(process.env.POSTGRES_PORT, 10),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      entities: [UserEntity],
      synchronize: true,
      logging: ['error'],
    }),
    ServeStaticModule.forRoot({
      serveRoot: process.env.UPLOAD_URL,
      rootPath: process.env.UPLOAD_LOCATION,
    }),
    UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
