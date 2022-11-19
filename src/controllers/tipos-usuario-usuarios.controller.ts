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
  TiposUsuario,
  Usuarios,
} from '../models';
import {TiposUsuarioRepository} from '../repositories';

export class TiposUsuarioUsuariosController {
  constructor(
    @repository(TiposUsuarioRepository) protected tiposUsuarioRepository: TiposUsuarioRepository,
  ) { }

  @get('/tipos-usuarios/{id}/usuarios', {
    responses: {
      '200': {
        description: 'Array of TiposUsuario has many Usuarios',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Usuarios)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Usuarios>,
  ): Promise<Usuarios[]> {
    return this.tiposUsuarioRepository.tiposUsuarios(id).find(filter);
  }

  @post('/tipos-usuarios/{id}/usuarios', {
    responses: {
      '200': {
        description: 'TiposUsuario model instance',
        content: {'application/json': {schema: getModelSchemaRef(Usuarios)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof TiposUsuario.prototype.idTipoUsuario,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Usuarios, {
            title: 'NewUsuariosInTiposUsuario',
            exclude: ['idUsuario'],
            optional: ['idTipoUsuario']
          }),
        },
      },
    }) usuarios: Omit<Usuarios, 'idUsuario'>,
  ): Promise<Usuarios> {
    return this.tiposUsuarioRepository.tiposUsuarios(id).create(usuarios);
  }

  @patch('/tipos-usuarios/{id}/usuarios', {
    responses: {
      '200': {
        description: 'TiposUsuario.Usuarios PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Usuarios, {partial: true}),
        },
      },
    })
    usuarios: Partial<Usuarios>,
    @param.query.object('where', getWhereSchemaFor(Usuarios)) where?: Where<Usuarios>,
  ): Promise<Count> {
    return this.tiposUsuarioRepository.tiposUsuarios(id).patch(usuarios, where);
  }

  @del('/tipos-usuarios/{id}/usuarios', {
    responses: {
      '200': {
        description: 'TiposUsuario.Usuarios DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Usuarios)) where?: Where<Usuarios>,
  ): Promise<Count> {
    return this.tiposUsuarioRepository.tiposUsuarios(id).delete(where);
  }
}
