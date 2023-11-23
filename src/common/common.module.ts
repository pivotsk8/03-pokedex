import { Module } from '@nestjs/common';
import { AxiosAdapte } from './adapters/axios.adapter';

@Module({
    providers: [AxiosAdapte],
    exports: [AxiosAdapte]
})
export class CommonModule { }
