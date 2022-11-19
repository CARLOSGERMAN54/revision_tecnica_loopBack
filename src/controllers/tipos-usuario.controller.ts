import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import {TiposUsuario} from '../models';
import {TiposUsuarioRepository} from '../repositories';

export class TiposUsuarioController {
  constructor(
    @repository(TiposUsuarioRepository)
    public tiposUsuarioRepository : TiposUsuarioRepository,
  ) {}

  @post('/tipos-usuarios')
  @response(200, {
    description: 'TiposUsuario model instance',
    content: {'application/json': {schema: getModelSchemaRef(TiposUsuario)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(TiposUsuario, {
            title: 'NewTiposUsuario',
            
          }),
        },
      },
    })
    tiposUsuario: TiposUsuario,
  ): Promise<TiposUsuario> {
    return this.tiposUsuarioRepository.create(tiposUsuario);
  }

  @get('/tipos-usuarios/count')
  @response(200, {
    description: 'TiposUsuario model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(TiposUsuario) where?: Where<TiposUsuario>,
  ): Promise<Count> {
    return this.tiposUsuarioRepository.count(where);
  }

  @get('/tipos-usuarios')
  @response(200, {
    description: 'Array of TiposUsuario model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(TiposUsuario, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(TiposUsuario) filter?: Filter<TiposUsuario>,
  ): Promise<TiposUsuario[]> {
    return this.tiposUsuarioRepository.find(filter);
  }

  @patch('/tipos-usuarios')
  @response(200, {
    description: 'TiposUsuario PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(TiposUsuario, {partial: true}),
        },
      },
    })
    tiposUsuario: TiposUsuario,
    @param.where(TiposUsuario) where?: Where<TiposUsuario>,
  ): Promise<Count> {
    return this.tiposUsuarioRepository.updateAll(tiposUsuario, where);
  }

  @get('/tipos-usuarios/{id}')
  @response(200, {
    description: 'TiposUsuario model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(TiposUsuario, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(TiposUsuario, {exclude: 'where'}) filter?: FilterExcludingWhere<TiposUsuario>
  ): Promise<TiposUsuario> {
    return this.tiposUsuarioRepository.findById(id, filter);
  }

  @patch('/tipos-usuarios/{id}')
  @response(204, {
    description: 'TiposUsuario PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(TiposUsuario, {partial: true}),
        },
      },
    })
    tiposUsuario: TiposUsuario,
  ): Promise<void> {
    await this.tiposUsuarioRepository.updateById(id, tiposUsuario);
  }

  @put('/tipos-usuarios/{id}')
  @response(204, {
    description: 'TiposUsuario PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() tiposUsuario: TiposUsuario,
  ): Promise<void> {
    await this.tiposUsuarioRepository.replaceById(id, tiposUsuario);
  }

  @del('/tipos-usuarios/{id}')
  @response(204, {
    description: 'TiposUsuario DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.tiposUsuarioRepository.deleteById(id);
  }
}
