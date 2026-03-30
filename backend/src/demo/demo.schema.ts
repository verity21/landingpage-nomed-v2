import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type DemoBookingDocument = HydratedDocument<DemoBooking>;

@Schema({
  versionKey: false,
  toJSON: {
    transform: (_doc, ret) => {
      delete ret._id;
      return ret;
    },
  },
})
export class DemoBooking {
  @Prop({ required: true })
  nombre: string;

  @Prop({ default: '' })
  apellido: string;

  @Prop({ required: true })
  email: string;

  @Prop({ default: '' })
  empresa: string;

  @Prop({ default: '' })
  producto: string;

  @Prop({ default: '' })
  desafio: string;

  @Prop({ default: '' })
  fecha: string;

  @Prop({ default: '' })
  hora: string;

  @Prop({ default: 'America/Santiago' })
  timezone: string;

  @Prop({ default: 'formulario' })
  tipo: string;

  @Prop({ required: true })
  id: string;

  @Prop({ required: true })
  created_at: string;
}

export const DemoBookingSchema = SchemaFactory.createForClass(DemoBooking);
