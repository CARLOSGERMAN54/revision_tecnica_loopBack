import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Servicios, ServiciosRelations, Revisiones} from '../models';
import {RevisionesRepository} from './revisiones.repository';

export class ServiciosRepository extends DefaultCrudRepository<
  Servicios,
  typeof Servicios.prototype.idServicio,
  ServiciosRelations
> {

  public readonly ServiciosRevisiones: HasManyRepositoryFactory<Revisiones, typeof Servicios.prototype.idServicio>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('RevisionesRepository') protected revisionesRepositoryGetter: Getter<RevisionesRepository>,
  ) {
    super(Servicios, dataSource);
    this.ServiciosRevisiones = this.createHasManyRepositoryFactoryFor('ServiciosRevisiones', revisionesRepositoryGetter,);
    this.registerInclusionResolver('ServiciosRevisiones', this.ServiciosRevisiones.inclusionResolver);
  }
}
