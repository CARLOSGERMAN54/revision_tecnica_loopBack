import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  Estados,
  Revisiones,
} from '../models';
import {EstadosRepository} from '../repositories';

export class EstadosRevisionesController {
  constructor(
    @repository(EstadosRepository) protected estadosRepository: EstadosRepository,
  ) { }

  @get('/estados/{id}/revisiones', {
    responses: {
      '200': {
        description: 'Array of Estados has many Revisiones',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Revisiones)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Revisiones>,
  ): Promise<Revisiones[]> {
    return this.estadosRepository.EstadosRevisiones(id).find(filter);
  }

  @post('/estados/{id}/revisiones', {
    responses: {
      '200': {
        description: 'Estados model instance',
        content: {'application/json': {schema: getModelSchemaRef(Revisiones)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Estados.prototype.idEstado,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Revisiones, {
            title: 'NewRevisionesInEstados',
            exclude: ['idRevision'],
            optional: ['idEstado']
          }),
        },
      },
    }) revisiones: Omit<Revisiones, 'idRevision'>,
  ): Promise<Revisiones> {
    return this.estadosRepository.EstadosRevisiones(id).create(revisiones);
  }

  @patch('/estados/{id}/revisiones', {
    responses: {
      '200': {
        description: 'Estados.Revisiones PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Revisiones, {partial: true}),
        },
      },
    })
    revisiones: Partial<Revisiones>,
    @param.query.object('where', getWhereSchemaFor(Revisiones)) where?: Where<Revisiones>,
  ): Promise<Count> {
    return this.estadosRepository.EstadosRevisiones(id).patch(revisiones, where);
  }

  @del('/estados/{id}/revisiones', {
    responses: {
      '200': {
        description: 'Estados.Revisiones DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Revisiones)) where?: Where<Revisiones>,
  ): Promise<Count> {
    return this.estadosRepository.EstadosRevisiones(id).delete(where);
  }
}
