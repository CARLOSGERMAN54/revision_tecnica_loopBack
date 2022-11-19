import {Getter, inject} from '@loopback/core';
import {DefaultCrudRepository, HasManyRepositoryFactory, repository} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {CambioRepuestos, Revisiones, RevisionesRelations} from '../models';
import {CambioRepuestosRepository} from './cambio-repuestos.repository';
import {EstadosRepository} from './estados.repository';

export class RevisionesRepository extends DefaultCrudRepository<
  Revisiones,
  typeof Revisiones.prototype.idRevision,
  RevisionesRelations
> {

  public readonly RevisionesCambioRepuestos: HasManyRepositoryFactory<CambioRepuestos, typeof Revisiones.prototype.idRevision>;

  //public readonly RevisionEstado: HasManyRepositoryFactory<Estados, typeof Revisiones.prototype.idRevision>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('CambioRepuestosRepository') protected cambioRepuestosRepositoryGetter: Getter<CambioRepuestosRepository>, @repository.getter('EstadosRepository') protected estadosRepositoryGetter: Getter<EstadosRepository>,
  ) {
    super(Revisiones, dataSource);

    this.RevisionesCambioRepuestos = this.createHasManyRepositoryFactoryFor('RevisionesCambioRepuestos', cambioRepuestosRepositoryGetter,);
    this.registerInclusionResolver('RevisionesCambioRepuestos', this.RevisionesCambioRepuestos.inclusionResolver);
  }
}
