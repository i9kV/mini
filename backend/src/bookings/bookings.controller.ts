import {
  Controller,
  Post,
  Body,
  Get,
  Patch,
  Param,
  UseGuards,
  Req,
  Delete,
} from '@nestjs/common';

import { BookingsService } from './bookings.service';
import { CreateBookingDto } from './dto/create-booking.dto';

// import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { AccessTokenGuard } from '../auth/guards/access-token.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';

@Controller('bookings')
export class BookingsController {
  constructor(private readonly bookingsService: BookingsService) {}

  // =========================
  // CREATE BOOKING (USER)
  // =========================
  @Post()
  @UseGuards(AccessTokenGuard)
  create(@Body() dto: CreateBookingDto, @Req() req) {
    return this.bookingsService.create(dto, req.user.userId);
  }

  // =========================
  // USER VIEW OWN BOOKINGS
  // =========================
  @Get('my')
  @UseGuards(AccessTokenGuard)
  getMyBookings(@Req() req) {
    return this.bookingsService.findByUser(req.user.userId);
  }

  // =========================
  // ADMIN VIEW ALL BOOKINGS
  // =========================
  @Get()
  @UseGuards(AccessTokenGuard, RolesGuard)
  @Roles('admin')
  findAll() {
    return this.bookingsService.findAll();
  }

  // =========================
  // ADMIN UPDATE STATUS
  // =========================
  @Patch(':id/status')
  @UseGuards(AccessTokenGuard, RolesGuard)
  @Roles('admin')
  updateStatus(
    @Param('id') id: string,
    @Body('action') action: 'completed' | 'cancelled',
  ) {
    return this.bookingsService.updateStatus(id, action);
  }

  // =========================
  // ADMIN STATS
  // =========================

  @Get('revenue')
  @UseGuards(AccessTokenGuard, RolesGuard)
  @Roles('admin')
  getRevenue() {
    return this.bookingsService.getRevenue();
  }

  @Get('stats')
  @UseGuards(AccessTokenGuard, RolesGuard)
  @Roles('admin')
  getBookingStats() {
    return this.bookingsService.getStats();
  }

  @UseGuards(AccessTokenGuard)
  @Patch(':id/cancel')
  cancelBooking(@Param('id') id: string, @Req() req: any) {
    return this.bookingsService.cancelBooking(id, req.user.userId);
  }

  @Delete(':id')
  @UseGuards(AccessTokenGuard, RolesGuard)
  @Roles('admin')
  remove(@Param('id') id: string) {
    return this.bookingsService.remove(id);
  }
}
