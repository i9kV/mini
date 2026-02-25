import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Car, CarDocument } from './entities/car.schema';
import { CreateCarDto } from './dto/create-car.dto';
import { UpdateCarDto } from './dto/update-car.dto';

@Injectable()
export class CarsService {
  constructor(@InjectModel(Car.name) private carModel: Model<CarDocument>) {}
  async create(dto: CreateCarDto, file?: Express.Multer.File) {
    const imageUrl = file ? `/uploads/${file.filename}` : '';

    console.log('FILE:', file); // เช็ค

    const newCar = new this.carModel({
      ...dto,
      imageUrl,
    });

    return await newCar.save();
  }

  findAll() {
    return this.carModel.find();
  }

  findOne(id: string) {
    return this.carModel.findById(id);
  }

  update(id: string, dto: UpdateCarDto) {
    return this.carModel.findByIdAndUpdate(id, dto, { new: true });
  }

  remove(id: string) {
    return this.carModel.findByIdAndDelete(id);
  }
}
