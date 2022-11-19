import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Repuestos, RepuestosRelations, CambioRepuestos} from '../models';
import {CambioRepuestosRepository} from './cambio-repuestos.repository';

export class RepuestosRepository extends DefaultCrudRepository<
  Repuestos,
  typeof Repuestos.prototype.idRepuesto,
  RepuestosRelations
> {

  public readonly RepuestoCambioRepuesto: HasManyRepositoryFactory<CambioRepuestos, typeof Repuestos.prototype.idRepuesto>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('CambioRepuestosRepository') protected cambioRepuestosRepositoryGetter: Getter<CambioRepuestosRepository>,
  ) {
    super(Repuestos, dataSource);
    this.RepuestoCambioRepuesto = this.createHasManyRepositoryFactoryFor('RepuestoCambioRepuesto', cambioRepuestosRepositoryGetter,);
    this.registerInclusionResolver('RepuestoCambioRepuesto', this.RepuestoCambioRepuesto.inclusionResolver);
  }
}
