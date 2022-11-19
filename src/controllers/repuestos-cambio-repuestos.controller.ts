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
  Repuestos,
  CambioRepuestos,
} from '../models';
import {RepuestosRepository} from '../repositories';

export class RepuestosCambioRepuestosController {
  constructor(
    @repository(RepuestosRepository) protected repuestosRepository: RepuestosRepository,
  ) { }

  @get('/repuestos/{id}/cambio-repuestos', {
    responses: {
      '200': {
        description: 'Array of Repuestos has many CambioRepuestos',
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
    return this.repuestosRepository.RepuestoCambioRepuesto(id).find(filter);
  }

  @post('/repuestos/{id}/cambio-repuestos', {
    responses: {
      '200': {
        description: 'Repuestos model instance',
        content: {'application/json': {schema: getModelSchemaRef(CambioRepuestos)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Repuestos.prototype.idRepuesto,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(CambioRepuestos, {
            title: 'NewCambioRepuestosInRepuestos',
            exclude: ['idCambioRepuesto'],
            optional: ['idRepuesto']
          }),
        },
      },
    }) cambioRepuestos: Omit<CambioRepuestos, 'idCambioRepuesto'>,
  ): Promise<CambioRepuestos> {
    return this.repuestosRepository.RepuestoCambioRepuesto(id).create(cambioRepuestos);
  }

  @patch('/repuestos/{id}/cambio-repuestos', {
    responses: {
      '200': {
        description: 'Repuestos.CambioRepuestos PATCH success count',
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
    return this.repuestosRepository.RepuestoCambioRepuesto(id).patch(cambioRepuestos, where);
  }

  @del('/repuestos/{id}/cambio-repuestos', {
    responses: {
      '200': {
        description: 'Repuestos.CambioRepuestos DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(CambioRepuestos)) where?: Where<CambioRepuestos>,
  ): Promise<Count> {
    return this.repuestosRepository.RepuestoCambioRepuesto(id).delete(where);
  }
}
