import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type CarDocument = Car & Document;

@Schema({ timestamps: true })
export class Car {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  brand: string;

  @Prop({ required: true })
  type: string;

  @Prop({ required: true })
  transmission: string;

  @Prop({ required: true })
  seats: number;

  @Prop({ required: true })
  pricePerDay: number;

  @Prop()
  imageUrl: string;

  @Prop({ default: true })
  available: boolean;
}

export const CarSchema = SchemaFactory.createForClass(Car);
