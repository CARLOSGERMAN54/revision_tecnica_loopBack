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
import {Mecanicos} from '../models';
import {MecanicosRepository} from '../repositories';

export class MecanicosController {
  constructor(
    @repository(MecanicosRepository)
    public mecanicosRepository : MecanicosRepository,
  ) {}

  @post('/mecanicos')
  @response(200, {
    description: 'Mecanicos model instance',
    content: {'application/json': {schema: getModelSchemaRef(Mecanicos)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Mecanicos, {
            title: 'NewMecanicos',
            exclude: ['idMecanico'],
          }),
        },
      },
    })
    mecanicos: Omit<Mecanicos, 'idMecanico'>,
  ): Promise<Mecanicos> {
    return this.mecanicosRepository.create(mecanicos);
  }

  @get('/mecanicos/count')
  @response(200, {
    description: 'Mecanicos model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Mecanicos) where?: Where<Mecanicos>,
  ): Promise<Count> {
    return this.mecanicosRepository.count(where);
  }

  @get('/mecanicos')
  @response(200, {
    description: 'Array of Mecanicos model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Mecanicos, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Mecanicos) filter?: Filter<Mecanicos>,
  ): Promise<Mecanicos[]> {
    return this.mecanicosRepository.find(filter);
  }

  @patch('/mecanicos')
  @response(200, {
    description: 'Mecanicos PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Mecanicos, {partial: true}),
        },
      },
    })
    mecanicos: Mecanicos,
    @param.where(Mecanicos) where?: Where<Mecanicos>,
  ): Promise<Count> {
    return this.mecanicosRepository.updateAll(mecanicos, where);
  }

  @get('/mecanicos/{id}')
  @response(200, {
    description: 'Mecanicos model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Mecanicos, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Mecanicos, {exclude: 'where'}) filter?: FilterExcludingWhere<Mecanicos>
  ): Promise<Mecanicos> {
    return this.mecanicosRepository.findById(id, filter);
  }

  @patch('/mecanicos/{id}')
  @response(204, {
    description: 'Mecanicos PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Mecanicos, {partial: true}),
        },
      },
    })
    mecanicos: Mecanicos,
  ): Promise<void> {
    await this.mecanicosRepository.updateById(id, mecanicos);
  }

  @put('/mecanicos/{id}')
  @response(204, {
    description: 'Mecanicos PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() mecanicos: Mecanicos,
  ): Promise<void> {
    await this.mecanicosRepository.replaceById(id, mecanicos);
  }

  @del('/mecanicos/{id}')
  @response(204, {
    description: 'Mecanicos DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.mecanicosRepository.deleteById(id);
  }
}
