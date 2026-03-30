import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DemoController } from './demo.controller';
import { DemoService } from './demo.service';
import { DemoBooking, DemoBookingSchema } from './demo.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: DemoBooking.name, schema: DemoBookingSchema },
    ]),
  ],
  controllers: [DemoController],
  providers: [DemoService],
})
export class DemoModule {}
