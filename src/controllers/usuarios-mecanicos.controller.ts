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
  Mecanicos,
} from '../models';
import {UsuariosRepository} from '../repositories';

export class UsuariosMecanicosController {
  constructor(
    @repository(UsuariosRepository) protected usuariosRepository: UsuariosRepository,
  ) { }

  @get('/usuarios/{id}/mecanicos', {
    responses: {
      '200': {
        description: 'Usuarios has one Mecanicos',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Mecanicos),
          },
        },
      },
    },
  })
  async get(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Mecanicos>,
  ): Promise<Mecanicos> {
    return this.usuariosRepository.UsuarioMecanico(id).get(filter);
  }

  @post('/usuarios/{id}/mecanicos', {
    responses: {
      '200': {
        description: 'Usuarios model instance',
        content: {'application/json': {schema: getModelSchemaRef(Mecanicos)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Usuarios.prototype.idUsuario,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Mecanicos, {
            title: 'NewMecanicosInUsuarios',
            exclude: ['idMecanico'],
            optional: ['idUsuario']
          }),
        },
      },
    }) mecanicos: Omit<Mecanicos, 'idMecanico'>,
  ): Promise<Mecanicos> {
    return this.usuariosRepository.UsuarioMecanico(id).create(mecanicos);
  }

  @patch('/usuarios/{id}/mecanicos', {
    responses: {
      '200': {
        description: 'Usuarios.Mecanicos PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Mecanicos, {partial: true}),
        },
      },
    })
    mecanicos: Partial<Mecanicos>,
    @param.query.object('where', getWhereSchemaFor(Mecanicos)) where?: Where<Mecanicos>,
  ): Promise<Count> {
    return this.usuariosRepository.UsuarioMecanico(id).patch(mecanicos, where);
  }

  @del('/usuarios/{id}/mecanicos', {
    responses: {
      '200': {
        description: 'Usuarios.Mecanicos DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Mecanicos)) where?: Where<Mecanicos>,
  ): Promise<Count> {
    return this.usuariosRepository.UsuarioMecanico(id).delete(where);
  }
}
