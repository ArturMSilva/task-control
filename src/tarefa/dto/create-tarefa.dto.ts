export interface CreateTarefaDto {
    titulo: string;
    descricao: string;
    status: 'PENDENTE' | 'EM_ANDAMENTO' | 'CONCLUIDA' | 'CANCELADA';
    usuarioId: number;
    
}
