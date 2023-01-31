import { FileInterceptor } from '@nestjs/platform-express';
import { multerOptions } from './multer.config';

const interceptor = FileInterceptor('file', multerOptions);

describe('FileInterceptor', () => {
  it('should be defined', () => {
    expect(interceptor).toBeDefined();
  });
});
