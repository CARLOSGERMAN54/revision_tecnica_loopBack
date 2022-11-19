import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where
} from '@loopback/repository';
import {
  del, get,
  getModelSchemaRef, param, patch, post, put, requestBody,
  response
} from '@loopback/rest';
import {Estados} from '../models';
import {EstadosRepository} from '../repositories';

export class EstadosController {
  constructor(
    @repository(EstadosRepository)
    public estadosRepository: EstadosRepository,
  ) { }

  @post('/estados')
  @response(200, {
    description: 'Estados model instance',
    content: {'application/json': {schema: getModelSchemaRef(Estados)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Estados, {
            title: 'NewEstados',

          }),
        },
      },
    })
    estados: Estados,
  ): Promise<Estados> {
    return this.estadosRepository.create(estados);
  }

  @get('/estados/count')
  @response(200, {
    description: 'Estados model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Estados) where?: Where<Estados>,
  ): Promise<Count> {
    return this.estadosRepository.count(where);
  }

  @get('/estados')
  @response(200, {
    description: 'Array of Estados model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Estados, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Estados) filter?: Filter<Estados>,
  ): Promise<Estados[]> {
    return this.estadosRepository.find(filter);
  }

  @patch('/estados')
  @response(200, {
    description: 'Estados PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Estados, {partial: true}),
        },
      },
    })
    estados: Estados,
    @param.where(Estados) where?: Where<Estados>,
  ): Promise<Count> {
    return this.estadosRepository.updateAll(estados, where);
  }

  @get('/estados/{id}')
  @response(200, {
    description: 'Estados model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Estados, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Estados, {exclude: 'where'}) filter?: FilterExcludingWhere<Estados>
  ): Promise<Estados> {
    return this.estadosRepository.findById(id, filter);
  }

  @patch('/estados/{id}')
  @response(204, {
    description: 'Estados PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Estados, {partial: true}),
        },
      },
    })
    estados: Estados,
  ): Promise<void> {
    await this.estadosRepository.updateById(id, estados);
  }

  @put('/estados/{id}')
  @response(204, {
    description: 'Estados PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() estados: Estados,
  ): Promise<void> {
    await this.estadosRepository.replaceById(id, estados);
  }

  @del('/estados/{id}')
  @response(204, {
    description: 'Estados DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.estadosRepository.deleteById(id);
  }
}
