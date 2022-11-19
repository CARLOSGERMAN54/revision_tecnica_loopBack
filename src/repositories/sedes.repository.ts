import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Sedes, SedesRelations, Revisiones} from '../models';
import {RevisionesRepository} from './revisiones.repository';

export class SedesRepository extends DefaultCrudRepository<
  Sedes,
  typeof Sedes.prototype.idSede,
  SedesRelations
> {

  public readonly SedesRevisiones: HasManyRepositoryFactory<Revisiones, typeof Sedes.prototype.idSede>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('RevisionesRepository') protected revisionesRepositoryGetter: Getter<RevisionesRepository>,
  ) {
    super(Sedes, dataSource);
    this.SedesRevisiones = this.createHasManyRepositoryFactoryFor('SedesRevisiones', revisionesRepositoryGetter,);
    this.registerInclusionResolver('SedesRevisiones', this.SedesRevisiones.inclusionResolver);
  }
}
