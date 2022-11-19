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
import {Revisiones} from '../models';
import {RevisionesRepository} from '../repositories';

export class RevisionesController {
  constructor(
    @repository(RevisionesRepository)
    public revisionesRepository : RevisionesRepository,
  ) {}

  @post('/revisiones')
  @response(200, {
    description: 'Revisiones model instance',
    content: {'application/json': {schema: getModelSchemaRef(Revisiones)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Revisiones, {
            title: 'NewRevisiones',
            exclude: ['idRevision'],
          }),
        },
      },
    })
    revisiones: Omit<Revisiones, 'idRevision'>,
  ): Promise<Revisiones> {
    return this.revisionesRepository.create(revisiones);
  }

  @get('/revisiones/count')
  @response(200, {
    description: 'Revisiones model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Revisiones) where?: Where<Revisiones>,
  ): Promise<Count> {
    return this.revisionesRepository.count(where);
  }

  @get('/revisiones')
  @response(200, {
    description: 'Array of Revisiones model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Revisiones, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Revisiones) filter?: Filter<Revisiones>,
  ): Promise<Revisiones[]> {
    return this.revisionesRepository.find(filter);
  }

  @patch('/revisiones')
  @response(200, {
    description: 'Revisiones PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Revisiones, {partial: true}),
        },
      },
    })
    revisiones: Revisiones,
    @param.where(Revisiones) where?: Where<Revisiones>,
  ): Promise<Count> {
    return this.revisionesRepository.updateAll(revisiones, where);
  }

  @get('/revisiones/{id}')
  @response(200, {
    description: 'Revisiones model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Revisiones, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Revisiones, {exclude: 'where'}) filter?: FilterExcludingWhere<Revisiones>
  ): Promise<Revisiones> {
    return this.revisionesRepository.findById(id, filter);
  }

  @patch('/revisiones/{id}')
  @response(204, {
    description: 'Revisiones PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Revisiones, {partial: true}),
        },
      },
    })
    revisiones: Revisiones,
  ): Promise<void> {
    await this.revisionesRepository.updateById(id, revisiones);
  }

  @put('/revisiones/{id}')
  @response(204, {
    description: 'Revisiones PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() revisiones: Revisiones,
  ): Promise<void> {
    await this.revisionesRepository.replaceById(id, revisiones);
  }

  @del('/revisiones/{id}')
  @response(204, {
    description: 'Revisiones DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.revisionesRepository.deleteById(id);
  }
}
