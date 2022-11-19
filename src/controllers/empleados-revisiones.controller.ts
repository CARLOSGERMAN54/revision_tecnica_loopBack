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
  Empleados,
  Revisiones,
} from '../models';
import {EmpleadosRepository} from '../repositories';

export class EmpleadosRevisionesController {
  constructor(
    @repository(EmpleadosRepository) protected empleadosRepository: EmpleadosRepository,
  ) { }

  @get('/empleados/{id}/revisiones', {
    responses: {
      '200': {
        description: 'Array of Empleados has many Revisiones',
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
    return this.empleadosRepository.EmpleadosRevisiones(id).find(filter);
  }

  @post('/empleados/{id}/revisiones', {
    responses: {
      '200': {
        description: 'Empleados model instance',
        content: {'application/json': {schema: getModelSchemaRef(Revisiones)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Empleados.prototype.idEmpleado,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Revisiones, {
            title: 'NewRevisionesInEmpleados',
            exclude: ['idRevision'],
            optional: ['idEmpleado']
          }),
        },
      },
    }) revisiones: Omit<Revisiones, 'idRevision'>,
  ): Promise<Revisiones> {
    return this.empleadosRepository.EmpleadosRevisiones(id).create(revisiones);
  }

  @patch('/empleados/{id}/revisiones', {
    responses: {
      '200': {
        description: 'Empleados.Revisiones PATCH success count',
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
    return this.empleadosRepository.EmpleadosRevisiones(id).patch(revisiones, where);
  }

  @del('/empleados/{id}/revisiones', {
    responses: {
      '200': {
        description: 'Empleados.Revisiones DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Revisiones)) where?: Where<Revisiones>,
  ): Promise<Count> {
    return this.empleadosRepository.EmpleadosRevisiones(id).delete(where);
  }
}
