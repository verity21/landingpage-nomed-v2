import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';
import { DemoBooking, DemoBookingDocument } from './demo.schema';
import { CreateDemoDto } from './dto/create-demo.dto';

@Injectable()
export class DemoService {
  constructor(
    @InjectModel(DemoBooking.name)
    private demoModel: Model<DemoBookingDocument>,
  ) {}

  async createBooking(dto: CreateDemoDto): Promise<DemoBooking> {
    const booking = new this.demoModel({
      nombre: dto.nombre,
      apellido: dto.apellido ?? '',
      email: dto.email,
      empresa: dto.empresa ?? '',
      producto: dto.producto ?? '',
      desafio: dto.desafio ?? '',
      fecha: dto.fecha ?? '',
      hora: dto.hora ?? '',
      timezone: dto.timezone ?? 'America/Santiago',
      tipo: dto.tipo ?? 'formulario',
      id: uuidv4(),
      created_at: new Date().toISOString(),
    });

    const saved = await booking.save();
    return saved.toJSON() as DemoBooking;
  }

  async getAllBookings(): Promise<DemoBooking[]> {
    const bookings = await this.demoModel.find({}, { _id: 0 }).lean().exec();
    return bookings as DemoBooking[];
  }
}
