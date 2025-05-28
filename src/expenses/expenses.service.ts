import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { UpdateExpenseDto } from './dto/update-expense.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Category, Prisma } from '@prisma/client';

@Injectable()
export class ExpensesService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateExpenseDto) {
    const dateObj = new Date(data.date);
    return this.prisma.expense.create({
      data: {
        ...data,
        month: dateObj.getUTCMonth() + 1,
        year: dateObj.getUTCFullYear(),
      },
    });
  }

  async findAll(filters?: {
    month?: number;
    year?: number;
    category?: Category;
  }) {
    const where: Prisma.ExpenseWhereInput = {};

    if (filters?.month != null) {
      where.month = filters.month;
    }

    if (filters?.year != null) {
      where.year = filters.year;
    }

    if (filters?.category) {
      where.category = filters.category;
    }

    return this.prisma.expense.findMany({
      where,
      orderBy: { date: 'desc' },
    });
  }

  async findOne(id: string) {
    const expense = await this.prisma.expense.findUnique({ where: { id } });

    if (!expense) {
      throw new NotFoundException('Despesa não encontrada');
    }
    return expense;
  }

  async update(id: string, data: UpdateExpenseDto) {
    await this.findOne(id);

    const updateData: Prisma.ExpenseUpdateInput = { ...data };

    if (data.date) {
      const dateObj = new Date(data.date);
      updateData.month = dateObj.getUTCMonth() + 1;
      updateData.year = dateObj.getUTCFullYear();
    }

    return this.prisma.expense.update({
      where: { id },
      data: updateData,
    });
  }

  async remove(id: string) {
    await this.findOne(id);
    return this.prisma.expense.delete({ where: { id } });
  }
}
