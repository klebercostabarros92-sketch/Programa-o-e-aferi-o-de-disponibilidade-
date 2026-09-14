import { Module } from '@nestjs/common';
import { SswModule } from './ssw/ssw.module';

@Module({
  imports: [SswModule],
})
export class AppModule {}
