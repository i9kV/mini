import { IsMongoId, IsString, IsDateString, Matches } from 'class-validator';

export class CreateBookingDto {
  @IsMongoId()
  car: string;

  // @IsString()
  // customerName: string;

  @IsString()
  brand: string;

  @Matches(/^[0-9]{9,10}$/, {
    message: 'เบอร์โทรต้องเป็นตัวเลข 9-10 หลัก',
  })
  phone: string;

  @IsDateString()
  startDate: string;

  @IsDateString()
  endDate: string;
}
