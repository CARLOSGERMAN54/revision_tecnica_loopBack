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
  Revisiones,
  CambioRepuestos,
} from '../models';
import {RevisionesRepository} from '../repositories';

export class RevisionesCambioRepuestosController {
  constructor(
    @repository(RevisionesRepository) protected revisionesRepository: RevisionesRepository,
  ) { }

  @get('/revisiones/{id}/cambio-repuestos', {
    responses: {
      '200': {
        description: 'Array of Revisiones has many CambioRepuestos',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(CambioRepuestos)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<CambioRepuestos>,
  ): Promise<CambioRepuestos[]> {
    return this.revisionesRepository.RevisionesCambioRepuestos(id).find(filter);
  }

  @post('/revisiones/{id}/cambio-repuestos', {
    responses: {
      '200': {
        description: 'Revisiones model instance',
        content: {'application/json': {schema: getModelSchemaRef(CambioRepuestos)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Revisiones.prototype.idRevision,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(CambioRepuestos, {
            title: 'NewCambioRepuestosInRevisiones',
            exclude: ['idCambioRepuesto'],
            optional: ['idRevision']
          }),
        },
      },
    }) cambioRepuestos: Omit<CambioRepuestos, 'idCambioRepuesto'>,
  ): Promise<CambioRepuestos> {
    return this.revisionesRepository.RevisionesCambioRepuestos(id).create(cambioRepuestos);
  }

  @patch('/revisiones/{id}/cambio-repuestos', {
    responses: {
      '200': {
        description: 'Revisiones.CambioRepuestos PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(CambioRepuestos, {partial: true}),
        },
      },
    })
    cambioRepuestos: Partial<CambioRepuestos>,
    @param.query.object('where', getWhereSchemaFor(CambioRepuestos)) where?: Where<CambioRepuestos>,
  ): Promise<Count> {
    return this.revisionesRepository.RevisionesCambioRepuestos(id).patch(cambioRepuestos, where);
  }

  @del('/revisiones/{id}/cambio-repuestos', {
    responses: {
      '200': {
        description: 'Revisiones.CambioRepuestos DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(CambioRepuestos)) where?: Where<CambioRepuestos>,
  ): Promise<Count> {
    return this.revisionesRepository.RevisionesCambioRepuestos(id).delete(where);
  }
}
