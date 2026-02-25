import {
  IsString,
  IsNotEmpty,
  IsEnum,
  IsInt,
  IsNumber,
  IsBoolean,
  Min,
  IsOptional,
} from 'class-validator';

export enum CarType {
  SUV = 'SUV',
  Sedan = 'Sedan',
  Van = 'Van',
}

export enum Transmission {
  AUTO = 'AUTO',
  MANUAL = 'MANUAL',
}

export class CreateCarDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  brand: string;

  @IsEnum(CarType)
  type: CarType;

  @IsEnum(Transmission)
  transmission: Transmission;

  @IsInt()
  @Min(1)
  seats: number;

  @IsNumber()
  @Min(0)
  pricePerDay: number;

  @IsOptional()
  @IsBoolean()
  available?: boolean;

  // imageUrl จะถูกสร้างจาก multer

  @IsOptional()
  @IsString()
  imageUrl?: string;
}
