import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Propietarios, PropietariosRelations, Vehiculos} from '../models';
import {VehiculosRepository} from './vehiculos.repository';

export class PropietariosRepository extends DefaultCrudRepository<
  Propietarios,
  typeof Propietarios.prototype.idPropietario,
  PropietariosRelations
> {

  public readonly PropietariosVehiculos: HasManyRepositoryFactory<Vehiculos, typeof Propietarios.prototype.idPropietario>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('VehiculosRepository') protected vehiculosRepositoryGetter: Getter<VehiculosRepository>,
  ) {
    super(Propietarios, dataSource);
    this.PropietariosVehiculos = this.createHasManyRepositoryFactoryFor('PropietariosVehiculos', vehiculosRepositoryGetter,);
    this.registerInclusionResolver('PropietariosVehiculos', this.PropietariosVehiculos.inclusionResolver);
  }
}
