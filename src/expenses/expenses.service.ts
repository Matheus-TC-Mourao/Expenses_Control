import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { UpdateExpenseDto } from './dto/update-expense.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Category, Prisma } from '@prisma/client';

@Injectable()
export class ExpensesService {
  constructor(private readonly prisma: PrismaService) {}

  async create(userId: string, data: CreateExpenseDto) {
    const dateObj = this.parseDate(data.date);
    return this.prisma.expense.create({
      data: {
        userId,
        ...data,
        date: dateObj,
      },
    });
  }

  async findAll(
    filters: { month?: number; year?: number; category?: Category },
    userId: string,
  ) {
    const where: Prisma.ExpenseWhereInput = { userId };

    if (filters.category) {
      where.category = filters.category;
    }

    if (filters.year) {
      const startDate = new Date(filters.year, 0, 1);
      const endDate = new Date(filters.year, 12, 31);
      where.date = {
        gte: startDate,
        lt: endDate,
      };
    }

    if (filters.year && filters.month) {
      const startDate = new Date(filters.year, filters.month - 1, 1);
      const endDate = new Date(filters.year, filters.month - 1, 31);

      where.date = {
        gte: startDate,
        lt: endDate,
      };
    }

    return this.prisma.expense.findMany({
      where,
      orderBy: { date: 'desc' },
    });
  }

  async findOne(userId: string, id: string) {
    const expense = await this.prisma.expense.findUnique({ where: { id } });

    if (!expense) {
      throw new NotFoundException('Despesa não encontrada');
    }

    if (userId !== expense.id) {
      throw new ForbiddenException('Acesso negado!');
    }

    return expense;
  }

  async update(userId: string, id: string, data: UpdateExpenseDto) {
    await this.findOne(userId, id);

    let parsedDate: Date | undefined = undefined;
    if (data.date) {
      parsedDate = this.parseDate(data.date);
    }

    const updateData: Prisma.ExpenseUpdateInput = { ...data, date: parsedDate };

    return this.prisma.expense.update({
      where: { id },
      data: updateData,
    });
  }

  async remove(userId: string, id: string) {
    await this.findOne(userId, id);
    return this.prisma.expense.delete({ where: { id } });
  }

  private parseDate(str: string): Date {
    const [day, month, year] = str.split('-').map(Number);

    const date = new Date(year, month - 1, day);

    if (
      date.getFullYear() !== year ||
      date.getMonth() !== month - 1 ||
      date.getDate() !== day
    ) {
      throw new BadRequestException(
        'Formato incorreto de data. (ex. 01-02-2000)',
      );
    }

    return date;
  }
}
