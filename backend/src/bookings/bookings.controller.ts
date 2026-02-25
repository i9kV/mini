import { Controller, Post, Body, Get, Patch, Param } from '@nestjs/common';
import { BookingsService } from './bookings.service';
import { CreateBookingDto } from './dto/create-booking.dto';
import { UseGuards, Req } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Controller('bookings')
export class BookingsController {
  constructor(private readonly bookingsService: BookingsService) {}

  @Post()
  create(@Body() dto: CreateBookingDto) {
    return this.bookingsService.create(dto);
  }

  @Get('my')
  @UseGuards(AuthGuard('jwt')) // 👈 ใส่ 'jwt'
  getMyBookings(@Req() req) {
    return this.bookingsService.findByUser(req.user.email);
  }

  @Get()
  findAll() {
    return this.bookingsService.findAll();
  }

  @Patch(':id/status/:status')
  updateStatus(@Param('id') id: string, @Param('status') status: string) {
    return this.bookingsService.updateStatus(id, status);
  }

  @Get('stats')
  getBookingStats() {
    return this.bookingsService.getStats();
  }
}
