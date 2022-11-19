import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Estados, EstadosRelations, Revisiones, Usuarios} from '../models';
import {RevisionesRepository} from './revisiones.repository';
import {UsuariosRepository} from './usuarios.repository';

export class EstadosRepository extends DefaultCrudRepository<
  Estados,
  typeof Estados.prototype.idEstado,
  EstadosRelations
> {

  public readonly EstadosRevisiones: HasManyRepositoryFactory<Revisiones, typeof Estados.prototype.idEstado>;

  public readonly estadosusuarios: HasManyRepositoryFactory<Usuarios, typeof Estados.prototype.idEstado>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('RevisionesRepository') protected revisionesRepositoryGetter: Getter<RevisionesRepository>, @repository.getter('UsuariosRepository') protected usuariosRepositoryGetter: Getter<UsuariosRepository>,
  ) {
    super(Estados, dataSource);
    this.estadosusuarios = this.createHasManyRepositoryFactoryFor('estadosusuarios', usuariosRepositoryGetter,);
    this.registerInclusionResolver('estadosusuarios', this.estadosusuarios.inclusionResolver);
    this.EstadosRevisiones = this.createHasManyRepositoryFactoryFor('EstadosRevisiones', revisionesRepositoryGetter,);
    this.registerInclusionResolver('EstadosRevisiones', this.EstadosRevisiones.inclusionResolver);
  }
}
