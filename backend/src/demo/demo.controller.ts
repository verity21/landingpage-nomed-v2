import { Body, Controller, Get, HttpCode, Post } from '@nestjs/common';
import { DemoService } from './demo.service';
import { CreateDemoDto } from './dto/create-demo.dto';
import { DemoBooking } from './demo.schema';

@Controller()
export class DemoController {
  constructor(private readonly demoService: DemoService) {}

  @Get('/')
  root(): { message: string } {
    return { message: 'Nomed API v2' };
  }

  @Post('/demo')
  @HttpCode(200)
  async createDemo(@Body() dto: CreateDemoDto): Promise<DemoBooking> {
    return this.demoService.createBooking(dto);
  }

  @Get('/demo')
  async getDemos(): Promise<DemoBooking[]> {
    return this.demoService.getAllBookings();
  }
}
