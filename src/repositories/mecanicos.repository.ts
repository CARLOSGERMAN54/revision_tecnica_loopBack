import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Mecanicos, MecanicosRelations, Revisiones} from '../models';
import {RevisionesRepository} from './revisiones.repository';

export class MecanicosRepository extends DefaultCrudRepository<
  Mecanicos,
  typeof Mecanicos.prototype.idMecanico,
  MecanicosRelations
> {

  public readonly MecanicosRevisiones: HasManyRepositoryFactory<Revisiones, typeof Mecanicos.prototype.idMecanico>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('RevisionesRepository') protected revisionesRepositoryGetter: Getter<RevisionesRepository>,
  ) {
    super(Mecanicos, dataSource);
    this.MecanicosRevisiones = this.createHasManyRepositoryFactoryFor('MecanicosRevisiones', revisionesRepositoryGetter,);
    this.registerInclusionResolver('MecanicosRevisiones', this.MecanicosRevisiones.inclusionResolver);
  }
}
