import { Module } from '@nestjs/common';
import { DbModule } from './db/db.module';
import { TarefaModule } from './tarefa/tarefa.module';
import { UsuarioModule } from './usuario/usuario.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [DbModule, TarefaModule, UsuarioModule, AuthModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
