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
  Sedes,
  Revisiones,
} from '../models';
import {SedesRepository} from '../repositories';

export class SedesRevisionesController {
  constructor(
    @repository(SedesRepository) protected sedesRepository: SedesRepository,
  ) { }

  @get('/sedes/{id}/revisiones', {
    responses: {
      '200': {
        description: 'Array of Sedes has many Revisiones',
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
    return this.sedesRepository.SedesRevisiones(id).find(filter);
  }

  @post('/sedes/{id}/revisiones', {
    responses: {
      '200': {
        description: 'Sedes model instance',
        content: {'application/json': {schema: getModelSchemaRef(Revisiones)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Sedes.prototype.idSede,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Revisiones, {
            title: 'NewRevisionesInSedes',
            exclude: ['idRevision'],
            optional: ['idSede']
          }),
        },
      },
    }) revisiones: Omit<Revisiones, 'idRevision'>,
  ): Promise<Revisiones> {
    return this.sedesRepository.SedesRevisiones(id).create(revisiones);
  }

  @patch('/sedes/{id}/revisiones', {
    responses: {
      '200': {
        description: 'Sedes.Revisiones PATCH success count',
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
    return this.sedesRepository.SedesRevisiones(id).patch(revisiones, where);
  }

  @del('/sedes/{id}/revisiones', {
    responses: {
      '200': {
        description: 'Sedes.Revisiones DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Revisiones)) where?: Where<Revisiones>,
  ): Promise<Count> {
    return this.sedesRepository.SedesRevisiones(id).delete(where);
  }
}
