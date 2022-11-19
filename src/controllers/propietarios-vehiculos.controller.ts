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
  Propietarios,
  Vehiculos,
} from '../models';
import {PropietariosRepository} from '../repositories';

export class PropietariosVehiculosController {
  constructor(
    @repository(PropietariosRepository) protected propietariosRepository: PropietariosRepository,
  ) { }

  @get('/propietarios/{id}/vehiculos', {
    responses: {
      '200': {
        description: 'Array of Propietarios has many Vehiculos',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Vehiculos)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Vehiculos>,
  ): Promise<Vehiculos[]> {
    return this.propietariosRepository.PropietariosVehiculos(id).find(filter);
  }

  @post('/propietarios/{id}/vehiculos', {
    responses: {
      '200': {
        description: 'Propietarios model instance',
        content: {'application/json': {schema: getModelSchemaRef(Vehiculos)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Propietarios.prototype.idPropietario,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Vehiculos, {
            title: 'NewVehiculosInPropietarios',
            exclude: ['idVehiculo'],
            optional: ['idPropietario']
          }),
        },
      },
    }) vehiculos: Omit<Vehiculos, 'idVehiculo'>,
  ): Promise<Vehiculos> {
    return this.propietariosRepository.PropietariosVehiculos(id).create(vehiculos);
  }

  @patch('/propietarios/{id}/vehiculos', {
    responses: {
      '200': {
        description: 'Propietarios.Vehiculos PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Vehiculos, {partial: true}),
        },
      },
    })
    vehiculos: Partial<Vehiculos>,
    @param.query.object('where', getWhereSchemaFor(Vehiculos)) where?: Where<Vehiculos>,
  ): Promise<Count> {
    return this.propietariosRepository.PropietariosVehiculos(id).patch(vehiculos, where);
  }

  @del('/propietarios/{id}/vehiculos', {
    responses: {
      '200': {
        description: 'Propietarios.Vehiculos DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Vehiculos)) where?: Where<Vehiculos>,
  ): Promise<Count> {
    return this.propietariosRepository.PropietariosVehiculos(id).delete(where);
  }
}
