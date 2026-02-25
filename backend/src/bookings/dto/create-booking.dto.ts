import { IsMongoId, IsString, IsDateString } from 'class-validator';

export class CreateBookingDto {
  @IsMongoId()
  car: string;

  @IsString()
  customerName: string;

  @IsDateString()
  startDate: string;

  @IsDateString()
  endDate: string;
}
