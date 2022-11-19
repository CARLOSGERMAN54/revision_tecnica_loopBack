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
import {CambioRepuestos} from '../models';
import {CambioRepuestosRepository} from '../repositories';

export class CambioRepuestosController {
  constructor(
    @repository(CambioRepuestosRepository)
    public cambioRepuestosRepository : CambioRepuestosRepository,
  ) {}

  @post('/cambio-repuestos')
  @response(200, {
    description: 'CambioRepuestos model instance',
    content: {'application/json': {schema: getModelSchemaRef(CambioRepuestos)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(CambioRepuestos, {
            title: 'NewCambioRepuestos',
            exclude: ['idCambioRepuesto'],
          }),
        },
      },
    })
    cambioRepuestos: Omit<CambioRepuestos, 'idCambioRepuesto'>,
  ): Promise<CambioRepuestos> {
    return this.cambioRepuestosRepository.create(cambioRepuestos);
  }

  @get('/cambio-repuestos/count')
  @response(200, {
    description: 'CambioRepuestos model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(CambioRepuestos) where?: Where<CambioRepuestos>,
  ): Promise<Count> {
    return this.cambioRepuestosRepository.count(where);
  }

  @get('/cambio-repuestos')
  @response(200, {
    description: 'Array of CambioRepuestos model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(CambioRepuestos, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(CambioRepuestos) filter?: Filter<CambioRepuestos>,
  ): Promise<CambioRepuestos[]> {
    return this.cambioRepuestosRepository.find(filter);
  }

  @patch('/cambio-repuestos')
  @response(200, {
    description: 'CambioRepuestos PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(CambioRepuestos, {partial: true}),
        },
      },
    })
    cambioRepuestos: CambioRepuestos,
    @param.where(CambioRepuestos) where?: Where<CambioRepuestos>,
  ): Promise<Count> {
    return this.cambioRepuestosRepository.updateAll(cambioRepuestos, where);
  }

  @get('/cambio-repuestos/{id}')
  @response(200, {
    description: 'CambioRepuestos model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(CambioRepuestos, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(CambioRepuestos, {exclude: 'where'}) filter?: FilterExcludingWhere<CambioRepuestos>
  ): Promise<CambioRepuestos> {
    return this.cambioRepuestosRepository.findById(id, filter);
  }

  @patch('/cambio-repuestos/{id}')
  @response(204, {
    description: 'CambioRepuestos PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(CambioRepuestos, {partial: true}),
        },
      },
    })
    cambioRepuestos: CambioRepuestos,
  ): Promise<void> {
    await this.cambioRepuestosRepository.updateById(id, cambioRepuestos);
  }

  @put('/cambio-repuestos/{id}')
  @response(204, {
    description: 'CambioRepuestos PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() cambioRepuestos: CambioRepuestos,
  ): Promise<void> {
    await this.cambioRepuestosRepository.replaceById(id, cambioRepuestos);
  }

  @del('/cambio-repuestos/{id}')
  @response(204, {
    description: 'CambioRepuestos DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.cambioRepuestosRepository.deleteById(id);
  }
}
