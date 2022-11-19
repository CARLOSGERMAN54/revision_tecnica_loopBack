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
  Usuarios,
  Empleados,
} from '../models';
import {UsuariosRepository} from '../repositories';

export class UsuariosEmpleadosController {
  constructor(
    @repository(UsuariosRepository) protected usuariosRepository: UsuariosRepository,
  ) { }

  @get('/usuarios/{id}/empleados', {
    responses: {
      '200': {
        description: 'Usuarios has one Empleados',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Empleados),
          },
        },
      },
    },
  })
  async get(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Empleados>,
  ): Promise<Empleados> {
    return this.usuariosRepository.UsuarioEmpleado(id).get(filter);
  }

  @post('/usuarios/{id}/empleados', {
    responses: {
      '200': {
        description: 'Usuarios model instance',
        content: {'application/json': {schema: getModelSchemaRef(Empleados)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Usuarios.prototype.idUsuario,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Empleados, {
            title: 'NewEmpleadosInUsuarios',
            exclude: ['idEmpleado'],
            optional: ['idUsuario']
          }),
        },
      },
    }) empleados: Omit<Empleados, 'idEmpleado'>,
  ): Promise<Empleados> {
    return this.usuariosRepository.UsuarioEmpleado(id).create(empleados);
  }

  @patch('/usuarios/{id}/empleados', {
    responses: {
      '200': {
        description: 'Usuarios.Empleados PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Empleados, {partial: true}),
        },
      },
    })
    empleados: Partial<Empleados>,
    @param.query.object('where', getWhereSchemaFor(Empleados)) where?: Where<Empleados>,
  ): Promise<Count> {
    return this.usuariosRepository.UsuarioEmpleado(id).patch(empleados, where);
  }

  @del('/usuarios/{id}/empleados', {
    responses: {
      '200': {
        description: 'Usuarios.Empleados DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Empleados)) where?: Where<Empleados>,
  ): Promise<Count> {
    return this.usuariosRepository.UsuarioEmpleado(id).delete(where);
  }
}
