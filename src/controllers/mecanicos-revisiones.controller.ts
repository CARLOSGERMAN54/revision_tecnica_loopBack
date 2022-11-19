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
  Mecanicos,
  Revisiones,
} from '../models';
import {MecanicosRepository} from '../repositories';

export class MecanicosRevisionesController {
  constructor(
    @repository(MecanicosRepository) protected mecanicosRepository: MecanicosRepository,
  ) { }

  @get('/mecanicos/{id}/revisiones', {
    responses: {
      '200': {
        description: 'Array of Mecanicos has many Revisiones',
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
    return this.mecanicosRepository.MecanicosRevisiones(id).find(filter);
  }

  @post('/mecanicos/{id}/revisiones', {
    responses: {
      '200': {
        description: 'Mecanicos model instance',
        content: {'application/json': {schema: getModelSchemaRef(Revisiones)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Mecanicos.prototype.idMecanico,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Revisiones, {
            title: 'NewRevisionesInMecanicos',
            exclude: ['idRevision'],
            optional: ['idMecanico']
          }),
        },
      },
    }) revisiones: Omit<Revisiones, 'idRevision'>,
  ): Promise<Revisiones> {
    return this.mecanicosRepository.MecanicosRevisiones(id).create(revisiones);
  }

  @patch('/mecanicos/{id}/revisiones', {
    responses: {
      '200': {
        description: 'Mecanicos.Revisiones PATCH success count',
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
    return this.mecanicosRepository.MecanicosRevisiones(id).patch(revisiones, where);
  }

  @del('/mecanicos/{id}/revisiones', {
    responses: {
      '200': {
        description: 'Mecanicos.Revisiones DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Revisiones)) where?: Where<Revisiones>,
  ): Promise<Count> {
    return this.mecanicosRepository.MecanicosRevisiones(id).delete(where);
  }
}
