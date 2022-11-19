import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Vehiculos, VehiculosRelations, Revisiones} from '../models';
import {RevisionesRepository} from './revisiones.repository';

export class VehiculosRepository extends DefaultCrudRepository<
  Vehiculos,
  typeof Vehiculos.prototype.idVehiculo,
  VehiculosRelations
> {

  public readonly VehiculosRevisiones: HasManyRepositoryFactory<Revisiones, typeof Vehiculos.prototype.idVehiculo>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('RevisionesRepository') protected revisionesRepositoryGetter: Getter<RevisionesRepository>,
  ) {
    super(Vehiculos, dataSource);
    this.VehiculosRevisiones = this.createHasManyRepositoryFactoryFor('VehiculosRevisiones', revisionesRepositoryGetter,);
    this.registerInclusionResolver('VehiculosRevisiones', this.VehiculosRevisiones.inclusionResolver);
  }
}
