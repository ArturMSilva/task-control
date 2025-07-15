import { CreateTarefaDto } from './create-tarefa.dto';

export interface UpdateTarefaDto extends Partial<CreateTarefaDto> {
    id: number;
}
