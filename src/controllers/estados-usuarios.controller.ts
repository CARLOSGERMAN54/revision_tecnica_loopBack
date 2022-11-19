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
  Estados,
  Usuarios,
} from '../models';
import {EstadosRepository} from '../repositories';

export class EstadosUsuariosController {
  constructor(
    @repository(EstadosRepository) protected estadosRepository: EstadosRepository,
  ) { }

  @get('/estados/{id}/usuarios', {
    responses: {
      '200': {
        description: 'Array of Estados has many Usuarios',
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
    return this.estadosRepository.estadosusuarios(id).find(filter);
  }

  @post('/estados/{id}/usuarios', {
    responses: {
      '200': {
        description: 'Estados model instance',
        content: {'application/json': {schema: getModelSchemaRef(Usuarios)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Estados.prototype.idEstado,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Usuarios, {
            title: 'NewUsuariosInEstados',
            exclude: ['idUsuario'],
            optional: ['idEstado']
          }),
        },
      },
    }) usuarios: Omit<Usuarios, 'idUsuario'>,
  ): Promise<Usuarios> {
    return this.estadosRepository.estadosusuarios(id).create(usuarios);
  }

  @patch('/estados/{id}/usuarios', {
    responses: {
      '200': {
        description: 'Estados.Usuarios PATCH success count',
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
    return this.estadosRepository.estadosusuarios(id).patch(usuarios, where);
  }

  @del('/estados/{id}/usuarios', {
    responses: {
      '200': {
        description: 'Estados.Usuarios DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Usuarios)) where?: Where<Usuarios>,
  ): Promise<Count> {
    return this.estadosRepository.estadosusuarios(id).delete(where);
  }
}
