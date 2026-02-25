import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Car, CarDocument } from './entities/car.schema';
import { CreateCarDto } from './dto/create-car.dto';
import { UpdateCarDto } from './dto/update-car.dto';

interface CarFilter {
  search?: string;
  type?: string;
  available?: string;
  page: number;
  limit: number;
}

@Injectable()
export class CarsService {
  constructor(
    @InjectModel(Car.name)
    private carModel: Model<CarDocument>,
  ) {}

  async create(dto: CreateCarDto, file?: Express.Multer.File) {
    const imageUrl = file ? `/uploads/${file.filename}` : '';

    const newCar = new this.carModel({
      ...dto,
      imageUrl,
    });

    return await newCar.save();
  }

  async findAll(filters: CarFilter) {
    const { search, type, available, page, limit } = filters;

    const query: any = {};

    if (search) {
      query.name = { $regex: search, $options: 'i' };
    }

    if (type) {
      query.type = type;
    }

    if (available !== undefined) {
      query.available = available === 'true';
    }

    const skip = (page - 1) * limit;

    const [data, total] = await Promise.all([
      this.carModel
        .find(query)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .lean(),
      this.carModel.countDocuments(query),
    ]);

    return {
      data,
      total,
      page,
      totalPages: Math.ceil(total / limit),
    };
  }

  async findOne(id: string) {
    const car = await this.carModel.findById(id);

    if (!car) {
      throw new NotFoundException('Car not found');
    }

    return car;
  }

  async remove(id: string) {
    const car = await this.carModel.findByIdAndDelete(id);

    if (!car) {
      throw new NotFoundException('Car not found');
    }

    return { message: 'Car deleted successfully' };
  }

  async getStats() {
    const totalCars = await this.carModel.countDocuments();
    const availableCars = await this.carModel.countDocuments({
      available: true,
    });

    return {
      totalCars,
      availableCars,
    };
  }

  async update(id: string, dto: UpdateCarDto, file?: Express.Multer.File) {
    const car = await this.carModel.findById(id);

    if (!car) {
      throw new NotFoundException('ไม่พบรถ');
    }

    // ถ้ามีไฟล์ใหม่
    if (file) {
      // ลบไฟล์เก่า (ถ้ามี)
      if (car.imageUrl) {
        const oldPath = `.${car.imageUrl}`;
        const fs = require('fs');

        if (fs.existsSync(oldPath)) {
          fs.unlinkSync(oldPath);
        }
      }

      dto.imageUrl = `/uploads/${file.filename}`;
    }

    return this.carModel.findByIdAndUpdate(id, dto, {
      new: true,
    });
  }
}
