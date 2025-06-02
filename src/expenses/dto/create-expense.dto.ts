import { ApiProperty } from '@nestjs/swagger';
import { Category } from '@prisma/client';
import { IsEnum, IsNumber, IsString, Matches } from 'class-validator';

export class CreateExpenseDto {
  @ApiProperty()
  @IsString()
  title: string;

  @ApiProperty()
  @IsNumber()
  amount: number;

  @ApiProperty({ enum: Category })
  @IsEnum(Category)
  category: Category;

  @ApiProperty()
  @IsString()
  @Matches(/^[0-3]\d-[0-1]\d-\d{4}$/, {
    message: 'Data deve ter o seguinte formato DD-MM-YYYY',
  })
  date: string;

  // @ApiProperty()
  // @IsString()
  // userId: string;
}
