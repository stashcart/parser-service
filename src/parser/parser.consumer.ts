import { RabbitSubscribe } from '@golevelup/nestjs-rabbitmq';
import { Injectable } from '@nestjs/common';
import { AmqpService } from 'src/amqp/amqp.service';
import { ParseProductRequestDto } from './dto/parse-product.request.dto';
import { ParserService } from './parser.service';

@Injectable()
export class ParserConsumer {
  constructor(
    private readonly parserService: ParserService,
    private readonly amqpService: AmqpService,
  ) {}

  @RabbitSubscribe({
    exchange: 'product',
    routingKey: 'parse',
    queue: 'parser-service-queue',
  })
  async parseProduct({ url, storeName }: ParseProductRequestDto) {
    const response = await this.parserService.parseProductByUrlAndStoreName(
      url,
      storeName,
    );
    this.amqpService.publish('product', 'product.parsed', response);
  }
}
