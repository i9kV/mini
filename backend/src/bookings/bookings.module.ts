import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BookingsController } from './bookings.controller';
import { BookingsService } from './bookings.service';
import { Booking, BookingSchema } from './schemas/booking.schema';
import { Car, CarSchema } from '../cars/entities/car.schema';
import { User, UserSchema } from '../users/schemas/user.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Booking.name, schema: BookingSchema },
      { name: Car.name, schema: CarSchema },
      { name: User.name, schema: UserSchema },
    ]),
  ],

  controllers: [BookingsController],
  providers: [BookingsService],
})
export class BookingsModule {}
