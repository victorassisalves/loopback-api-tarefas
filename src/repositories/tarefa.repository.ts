import {DefaultCrudRepository} from '@loopback/repository';
import {Tarefa, TarefaRelations} from '../models';
import {FirebaseDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class TarefaRepository extends DefaultCrudRepository<
  Tarefa,
  typeof Tarefa.prototype.id,
  TarefaRelations
> {
  constructor(
    @inject('datasources.firebase') dataSource: FirebaseDataSource,
  ) {
    super(Tarefa, dataSource);
  }
}
