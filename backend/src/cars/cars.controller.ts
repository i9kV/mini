import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
  Query,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { CarsService } from './cars.service';
import { CreateCarDto } from './dto/create-car.dto';
import { UpdateCarDto } from './dto/update-car.dto';
import { diskStorage } from 'multer';
import { extname } from 'path';

@Controller('cars')
export class CarsController {
  constructor(private readonly carsService: CarsService) {}

  // ✅ CREATE CAR WITH IMAGE
  @Post()
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, callback) => {
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);

          callback(
            null,
            file.fieldname + '-' + uniqueSuffix + extname(file.originalname),
          );
        },
      }),
    }),
  )
  create(@Body() dto: CreateCarDto, @UploadedFile() file: Express.Multer.File) {
    return this.carsService.create(dto, file);
  }

  // ✅ FILTER + SEARCH + PAGINATION
  @Get()
  findAll(
    @Query('search') search?: string,
    @Query('type') type?: string,
    @Query('available') available?: string,
    @Query('page') page?: string,
    @Query('limit') limit?: string,
  ) {
    return this.carsService.findAll({
      search,
      type,
      available,
      page: page ? parseInt(page) : 1,
      limit: limit ? parseInt(limit) : 10,
    });
  }

  @Get('stats')
  getStats() {
    return this.carsService.getStats();
  }
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.carsService.findOne(id);
  }
  @Patch(':id')
  @UseInterceptors(FileInterceptor('image'))
  update(
    @Param('id') id: string,
    @UploadedFile() file: Express.Multer.File,
    @Body() body: any,
  ) {
    return this.carsService.update(id, body, file);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.carsService.remove(id);
  }
}
