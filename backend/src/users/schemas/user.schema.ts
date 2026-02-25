import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;
export type UserRole = 'user' | 'admin';

@Schema({ timestamps: true })
export class User {
  @Prop({
    required: true,
    unique: true, //( ห้ามซ้ำกัน )
    lowercase: true,
    trim: true,
    index: true,
  })
  email: string;

  @Prop({ required: true, select: false }) //( ดึงหนูไปใช้งานไม่ได้ )
  passwordHash: string;

  @Prop({ required: true, default: 'user' })
  role: UserRole;

  @Prop({ type: String, select: false, default: null })
  refreshTokenHash?: string | null;
}

export const UserSchema = SchemaFactory.createForClass(User);
