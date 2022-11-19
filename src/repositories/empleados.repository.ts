import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Empleados, EmpleadosRelations, Revisiones} from '../models';
import {RevisionesRepository} from './revisiones.repository';

export class EmpleadosRepository extends DefaultCrudRepository<
  Empleados,
  typeof Empleados.prototype.idEmpleado,
  EmpleadosRelations
> {

  public readonly EmpleadosRevisiones: HasManyRepositoryFactory<Revisiones, typeof Empleados.prototype.idEmpleado>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('RevisionesRepository') protected revisionesRepositoryGetter: Getter<RevisionesRepository>,
  ) {
    super(Empleados, dataSource);
    this.EmpleadosRevisiones = this.createHasManyRepositoryFactoryFor('EmpleadosRevisiones', revisionesRepositoryGetter,);
    this.registerInclusionResolver('EmpleadosRevisiones', this.EmpleadosRevisiones.inclusionResolver);
  }
}
