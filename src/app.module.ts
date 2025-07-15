import { Module } from '@nestjs/common';
import { DbModule } from './db/db.module';
import { TarefaModule } from './tarefa/tarefa.module';
import { UsuarioModule } from './usuario/usuario.module';

@Module({
  imports: [DbModule, TarefaModule, UsuarioModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
