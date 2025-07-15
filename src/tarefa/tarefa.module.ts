import { Module } from '@nestjs/common';
import { TarefaService } from './tarefa.service';
import { TarefaController } from './tarefa.controller';
import { DbModule } from 'src/db/db.module';

@Module({
  imports: [DbModule],
  controllers: [TarefaController],
  providers: [TarefaService],
})
export class TarefaModule {}
