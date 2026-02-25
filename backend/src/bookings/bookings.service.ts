import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Booking, BookingDocument } from './schemas/booking.schema';
import { CreateBookingDto } from './dto/create-booking.dto';

@Injectable()
export class BookingsService {
  constructor(
    @InjectModel(Booking.name)
    private bookingModel: Model<BookingDocument>,
  ) {}

  async create(dto: CreateBookingDto) {
    const start = new Date(dto.startDate);
    const end = new Date(dto.endDate);

    if (start >= end) {
      throw new BadRequestException('วันที่ไม่ถูกต้อง');
    }

    // 🔥 เช็ควันชน
    const overlapping = await this.bookingModel.findOne({
      car: dto.car,
      status: { $ne: 'cancelled' },
      $or: [
        {
          startDate: { $lte: end },
          endDate: { $gte: start },
        },
      ],
    });

    if (overlapping) {
      throw new BadRequestException('รถคันนี้ถูกจองแล้วในช่วงเวลานี้');
    }

    return this.bookingModel.create({
      ...dto,
      startDate: start,
      endDate: end,
    });
  }
  findByUser(email: string) {
    return this.bookingModel.find({ customerName: email });
  }

  async findAll() {
    return this.bookingModel.find().populate('car');
  }

  async updateStatus(id: string, status: string) {
    return this.bookingModel.findByIdAndUpdate(id, { status }, { new: true });
  }

  async getStats() {
    const totalBookings = await this.bookingModel.countDocuments();

    return {
      totalBookings,
    };
  }
}
