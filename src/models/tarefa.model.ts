import {Entity, model, property} from '@loopback/repository';

@model()
export class Tarefa extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'string',
    required: true,
  })
  titulo: string;

  @property({
    type: 'string',
  })
  descricao?: string;

  @property({
    type: 'boolean',
  })
  concluida?: boolean;


  constructor(data?: Partial<Tarefa>) {
    super(data);
  }
}

export interface TarefaRelations {
  // describe navigational properties here
}

export type TarefaWithRelations = Tarefa & TarefaRelations;
