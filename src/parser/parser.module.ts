import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { StoresModule } from 'src/stores/stores.module';
import { ParserService } from './parser.service';
import { ParserController } from './parser.controller';

@Module({
  imports: [HttpModule, StoresModule],
  controllers: [ParserController],
  providers: [ParserService],
})
export class ParserModule {}
