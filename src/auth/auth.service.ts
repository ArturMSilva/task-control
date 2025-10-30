import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from 'src/db/prisma.service';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(private readonly prismaService: PrismaService) {}

  async login(loginDto: LoginDto) {
    const { email, senha } = loginDto;

    // Busca o usuário pelo email
    const usuario = await this.prismaService.usuario.findUnique({
      where: { email },
      select: {
        id: true,
        nome: true,
        email: true,
        senha: true,
      },
    });

    // Valida se o usuário existe e se a senha está correta
    if (!usuario || usuario.senha !== senha) {
      throw new UnauthorizedException('Email ou senha inválidos');
    }

    // Retorna os dados do usuário (sem a senha)
    const { senha: _, ...usuarioSemSenha } = usuario;
    return usuarioSemSenha;
  }
}
