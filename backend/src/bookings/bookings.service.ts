import {
  Injectable,
  BadRequestException,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';

import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';

import { Booking, BookingDocument } from './schemas/booking.schema';
import { Car, CarDocument } from '../cars/entities/car.schema';
import { CreateBookingDto } from './dto/create-booking.dto';

@Injectable()
export class BookingsService {
  async remove(id: string) {
    const booking = await this.bookingModel.findByIdAndDelete(id);

    if (!booking) {
      throw new NotFoundException('Booking not found');
    }

    return { message: 'Booking deleted successfully' };
  }
  constructor(
    @InjectModel(Booking.name)
    private bookingModel: Model<BookingDocument>,

    @InjectModel(Car.name)
    private carModel: Model<CarDocument>,
  ) {}

  // ===============================
  // CREATE BOOKING
  // ===============================
  async create(dto: CreateBookingDto, userId: string) {
    if (!Types.ObjectId.isValid(dto.car)) {
      throw new BadRequestException('Car ID ไม่ถูกต้อง');
    }

    const start = new Date(dto.startDate);
    const end = new Date(dto.endDate);

    if (start >= end) {
      throw new BadRequestException('วันที่ไม่ถูกต้อง');
    }

    const car = await this.carModel.findById(dto.car);
    if (!car) {
      throw new NotFoundException('ไม่พบรถคันนี้');
    }

    // 🔥 ใช้ available แค่กรณีรถถูกปิดใช้งาน
    if (car.available === false) {
      throw new BadRequestException('รถคันนี้ถูกปิดใช้งาน');
    }

    // 🔥 ตรวจสอบช่วงเวลาซ้อน
    const overlapping = await this.bookingModel.findOne({
      car: dto.car,
      status: { $ne: 'cancelled' },
      startDate: { $lt: end },
      endDate: { $gt: start },
    });

    if (overlapping) {
      throw new BadRequestException('รถคันนี้ถูกจองแล้วในช่วงเวลานี้');
    }

    const booking = await this.bookingModel.create({
      car: dto.car,
      user: userId,
      // user: req.user.userId,
      brand: dto.brand,
      phone: dto.phone,
      startDate: start,
      endDate: end,
      status: 'pending',
    });

    return booking;
  }

  // ===============================
  // USER VIEW OWN BOOKINGS
  // ===============================
  async findByUser(userId: string) {
    return this.bookingModel.find({ user: userId }).populate('car');
  }
  // ===============================
  // ADMIN VIEW ALL
  // ===============================
  async findAll() {
    return this.bookingModel.find().populate('car').populate('user', 'email');
  }

  // ===============================
  // UPDATE STATUS (ADMIN)
  // ===============================
  async updateStatus(id: string, action: 'completed' | 'cancelled') {
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException('Booking ID ไม่ถูกต้อง');
    }

    const booking = await this.bookingModel.findById(id);

    if (!booking) {
      throw new NotFoundException('Booking not found');
    }

    if (booking.status !== 'pending') {
      throw new BadRequestException(
        `สถานะปัจจุบันคือ ${booking.status} ไม่สามารถเปลี่ยนได้`,
      );
    }

    if (!['completed', 'cancelled'].includes(action)) {
      throw new BadRequestException('สถานะไม่ถูกต้อง');
    }

    booking.status = action;
    await booking.save();

    return booking;
  }

  // ===============================
  // STATS
  // ===============================
  async getStats() {
    const totalBookings = await this.bookingModel.countDocuments();
    const pending = await this.bookingModel.countDocuments({
      status: 'pending',
    });
    const completed = await this.bookingModel.countDocuments({
      status: 'completed',
    });
    const cancelled = await this.bookingModel.countDocuments({
      status: 'cancelled',
    });

    return {
      totalBookings,
      pending,
      completed,
      cancelled,
    };
  }
  // ยกเลิกการจอง
  async cancelBooking(id: string, userId: string) {
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException('Booking ID ไม่ถูกต้อง');
    }

    const booking = await this.bookingModel.findById(id);

    if (!booking) {
      throw new NotFoundException('ไม่พบการจอง');
    }

    if (booking.user.toString() !== userId) {
      throw new ForbiddenException('ไม่มีสิทธิ์ยกเลิก');
    }

    if (booking.status !== 'pending') {
      throw new BadRequestException('ยกเลิกได้เฉพาะรายการที่รอดำเนินการ');
    }

    booking.status = 'cancelled';
    await booking.save();

    await this.carModel.findByIdAndUpdate(booking.car, {
      available: true,
    });

    return booking;
  }
}
