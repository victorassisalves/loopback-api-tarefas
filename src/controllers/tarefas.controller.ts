import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getFilterSchemaFor,
  getModelSchemaRef,
  getWhereSchemaFor,
  patch,
  put,
  del,
  requestBody,
} from '@loopback/rest';
import {Tarefa} from '../models';
import {TarefaRepository} from '../repositories';

export class TarefasController {
  constructor(
    @repository(TarefaRepository)
    public tarefaRepository : TarefaRepository,
  ) {}

  @post('/tarefas', {
    responses: {
      '200': {
        description: 'Tarefa model instance',
        content: {'application/json': {schema: getModelSchemaRef(Tarefa)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Tarefa, {
            title: 'NewTarefa',
            exclude: ['id'],
          }),
        },
      },
    })
    tarefa: Omit<Tarefa, 'id'>,
  ): Promise<Tarefa> {
    return this.tarefaRepository.create(tarefa);
  }

  @get('/tarefas/count', {
    responses: {
      '200': {
        description: 'Tarefa model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.query.object('where', getWhereSchemaFor(Tarefa)) where?: Where<Tarefa>,
  ): Promise<Count> {
    return this.tarefaRepository.count(where);
  }

  @get('/tarefas', {
    responses: {
      '200': {
        description: 'Array of Tarefa model instances',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Tarefa)},
          },
        },
      },
    },
  })
  async find(
    @param.query.object('filter', getFilterSchemaFor(Tarefa)) filter?: Filter<Tarefa>,
  ): Promise<Tarefa[]> {
    return this.tarefaRepository.find(filter);
  }

  @patch('/tarefas', {
    responses: {
      '200': {
        description: 'Tarefa PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Tarefa, {partial: true}),
        },
      },
    })
    tarefa: Tarefa,
    @param.query.object('where', getWhereSchemaFor(Tarefa)) where?: Where<Tarefa>,
  ): Promise<Count> {
    return this.tarefaRepository.updateAll(tarefa, where);
  }

  @get('/tarefas/{id}', {
    responses: {
      '200': {
        description: 'Tarefa model instance',
        content: {'application/json': {schema: getModelSchemaRef(Tarefa)}},
      },
    },
  })
  async findById(@param.path.string('id') id: string): Promise<Tarefa> {
    return this.tarefaRepository.findById(id);
  }

  @patch('/tarefas/{id}', {
    responses: {
      '204': {
        description: 'Tarefa PATCH success',
      },
    },
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Tarefa, {partial: true}),
        },
      },
    })
    tarefa: Tarefa,
  ): Promise<void> {
    await this.tarefaRepository.updateById(id, tarefa);
  }

  @put('/tarefas/{id}', {
    responses: {
      '204': {
        description: 'Tarefa PUT success',
      },
    },
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() tarefa: Tarefa,
  ): Promise<void> {
    await this.tarefaRepository.replaceById(id, tarefa);
  }

  @del('/tarefas/{id}', {
    responses: {
      '204': {
        description: 'Tarefa DELETE success',
      },
    },
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.tarefaRepository.deleteById(id);
  }
}
