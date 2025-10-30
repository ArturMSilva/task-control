import { Injectable } from '@nestjs/common';
import { CreateTarefaDto } from './dto/create-tarefa.dto';
import { UpdateTarefaDto } from './dto/update-tarefa.dto';
import { PrismaService } from 'src/db/prisma.service';

@Injectable()
export class TarefaService {
  constructor(private readonly prismaService: PrismaService) {} //injecao do PrismaService

  create(createTarefaDto: CreateTarefaDto) {
    return this.prismaService.tarefa.create({
      data: createTarefaDto,
    });
  }

  findAll(status?: string) {
    const where = status ? { status: status as any } : {};

    return this.prismaService.tarefa.findMany({
      where,
      include: {
        usuario: {
          select: {
            id: true,
            nome: true,
            email: true,
          },
        },
      },
      orderBy: {
        criadoEm: 'desc',
      },
    });
  }

  findOne(id: number) {
    return this.prismaService.tarefa.findUnique({
      where: { id },
    });
  }

  update(id: number, updateTarefaDto: UpdateTarefaDto) {
    return this.prismaService.tarefa.update({
      where: { id },
      data: updateTarefaDto,
    });
  }

  remove(id: number) {
    return this.prismaService.tarefa.delete({
      where: { id },
    });
  }

  async concluir(id: number) {
    return this.prismaService.tarefa.update({
      where: { id },
      data: { status: 'CONCLUIDA' },
    });
  }
}
