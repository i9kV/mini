import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type BookingDocument = Booking & Document;

@Schema({ timestamps: true })
export class Booking {
  @Prop({ type: Types.ObjectId, ref: 'Car', required: true })
  car: Types.ObjectId;

  @Prop({ required: true })
  customerName: string;

  @Prop({ required: true })
  brand: string;

  @Prop({ required: true })
  phone: string;

  @Prop({ required: true })
  startDate: Date;

  @Prop({ required: true })
  endDate: Date;

  @Prop({ default: 'pending' })
  status: string; // pending | approved | cancelled
}

export const BookingSchema = SchemaFactory.createForClass(Booking);
