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
  Propietarios,
} from '../models';
import {UsuariosRepository} from '../repositories';

export class UsuariosPropietariosController {
  constructor(
    @repository(UsuariosRepository) protected usuariosRepository: UsuariosRepository,
  ) { }

  @get('/usuarios/{id}/propietarios', {
    responses: {
      '200': {
        description: 'Usuarios has one Propietarios',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Propietarios),
          },
        },
      },
    },
  })
  async get(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Propietarios>,
  ): Promise<Propietarios> {
    return this.usuariosRepository.UsuarioPropietario(id).get(filter);
  }

  @post('/usuarios/{id}/propietarios', {
    responses: {
      '200': {
        description: 'Usuarios model instance',
        content: {'application/json': {schema: getModelSchemaRef(Propietarios)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Usuarios.prototype.idUsuario,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Propietarios, {
            title: 'NewPropietariosInUsuarios',
            exclude: ['idPropietario'],
            optional: ['idUsuario']
          }),
        },
      },
    }) propietarios: Omit<Propietarios, 'idPropietario'>,
  ): Promise<Propietarios> {
    return this.usuariosRepository.UsuarioPropietario(id).create(propietarios);
  }

  @patch('/usuarios/{id}/propietarios', {
    responses: {
      '200': {
        description: 'Usuarios.Propietarios PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Propietarios, {partial: true}),
        },
      },
    })
    propietarios: Partial<Propietarios>,
    @param.query.object('where', getWhereSchemaFor(Propietarios)) where?: Where<Propietarios>,
  ): Promise<Count> {
    return this.usuariosRepository.UsuarioPropietario(id).patch(propietarios, where);
  }

  @del('/usuarios/{id}/propietarios', {
    responses: {
      '200': {
        description: 'Usuarios.Propietarios DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Propietarios)) where?: Where<Propietarios>,
  ): Promise<Count> {
    return this.usuariosRepository.UsuarioPropietario(id).delete(where);
  }
}
