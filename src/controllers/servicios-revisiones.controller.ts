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
  Servicios,
  Revisiones,
} from '../models';
import {ServiciosRepository} from '../repositories';

export class ServiciosRevisionesController {
  constructor(
    @repository(ServiciosRepository) protected serviciosRepository: ServiciosRepository,
  ) { }

  @get('/servicios/{id}/revisiones', {
    responses: {
      '200': {
        description: 'Array of Servicios has many Revisiones',
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
    return this.serviciosRepository.ServiciosRevisiones(id).find(filter);
  }

  @post('/servicios/{id}/revisiones', {
    responses: {
      '200': {
        description: 'Servicios model instance',
        content: {'application/json': {schema: getModelSchemaRef(Revisiones)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Servicios.prototype.idServicio,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Revisiones, {
            title: 'NewRevisionesInServicios',
            exclude: ['idRevision'],
            optional: ['idServicio']
          }),
        },
      },
    }) revisiones: Omit<Revisiones, 'idRevision'>,
  ): Promise<Revisiones> {
    return this.serviciosRepository.ServiciosRevisiones(id).create(revisiones);
  }

  @patch('/servicios/{id}/revisiones', {
    responses: {
      '200': {
        description: 'Servicios.Revisiones PATCH success count',
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
    return this.serviciosRepository.ServiciosRevisiones(id).patch(revisiones, where);
  }

  @del('/servicios/{id}/revisiones', {
    responses: {
      '200': {
        description: 'Servicios.Revisiones DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Revisiones)) where?: Where<Revisiones>,
  ): Promise<Count> {
    return this.serviciosRepository.ServiciosRevisiones(id).delete(where);
  }
}
