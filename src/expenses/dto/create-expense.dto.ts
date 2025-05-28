import { ApiProperty } from '@nestjs/swagger';
import { Category } from '@prisma/client';
import { IsDateString, IsEnum, IsNumber, IsString } from 'class-validator';

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
  @IsDateString()
  date: Date;
}
