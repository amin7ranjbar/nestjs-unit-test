import { DynamicModule, Global, Module } from '@nestjs/common';
import { HealthCheckService } from './health-check.service';

@Global()
@Module({
    exports: [HealthCheckService],
})
export class HealthCheckModule {
    static register(url: string): DynamicModule {
        try {
            new URL(url);
        } catch (error) {
            throw error;
        }
        return {
            global: true,
            module: HealthCheckModule,
            providers: [HealthCheckService, { provide: 'URL_ADDRESS', useValue: url }],
            exports: [HealthCheckService, HealthCheckModule]
        }
    }
}
