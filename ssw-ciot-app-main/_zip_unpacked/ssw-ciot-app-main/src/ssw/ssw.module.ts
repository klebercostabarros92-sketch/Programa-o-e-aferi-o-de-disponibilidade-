import { Module } from '@nestjs/common';
import { SSW_SESSION_SERVICE } from './session-ssw.service';
import { EMITIR_CIOT_SSW } from './services/emission-ciot-ssw';

@Module({
  providers: [SSW_SESSION_SERVICE, EMITIR_CIOT_SSW],
  exports: [SSW_SESSION_SERVICE, EMITIR_CIOT_SSW],
})
export class SswModule {}
