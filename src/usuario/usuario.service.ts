import { Injectable } from '@nestjs/common';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { PrismaService } from 'src/db/prisma.service';

@Injectable()
export class UsuarioService {
  constructor(private readonly prismaService: PrismaService) {}

  create(createUsuarioDto: CreateUsuarioDto) {
    return this.prismaService.usuario.create({
      data: createUsuarioDto,
    });
  }

  findAll() {
    return this.prismaService.usuario.findMany();
  }

  findOne(id: number) {
    return this.prismaService.usuario.findUnique({
      where: { id },
    });
  }

  update(id: number, updateUsuarioDto: UpdateUsuarioDto) {
    return this.prismaService.usuario.update({
      where: { id },
      data: updateUsuarioDto,
    });
  }

  remove(id: number) {
    return this.prismaService.usuario.delete({
      where: { id },
    });
  }

  async findTarefasByUsuario(id: number) {
    return this.prismaService.tarefa.findMany({
      where: { usuarioId: id },
      select: {
        id: true,
        titulo: true,
        descricao: true,
        status: true,
        criadoEm: true,
      },
      orderBy: {
        criadoEm: 'desc',
      },
    });
  }

  async getEstatisticas(id: number) {
    const tarefas = await this.prismaService.tarefa.findMany({
      where: { usuarioId: id },
      select: {
        status: true,
      },
    });

    const pendentes = tarefas.filter(
      (t) => t.status === 'PENDENTE' || t.status === 'EM_ANDAMENTO',
    ).length;
    const concluidas = tarefas.filter((t) => t.status === 'CONCLUIDA').length;

    return {
      pendentes,
      concluidas,
    };
  }
}
