import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {TiposUsuario, TiposUsuarioRelations, Usuarios} from '../models';
import {UsuariosRepository} from './usuarios.repository';

export class TiposUsuarioRepository extends DefaultCrudRepository<
  TiposUsuario,
  typeof TiposUsuario.prototype.idTipoUsuario,
  TiposUsuarioRelations
> {

  public readonly tiposUsuarios: HasManyRepositoryFactory<Usuarios, typeof TiposUsuario.prototype.idTipoUsuario>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('UsuariosRepository') protected usuariosRepositoryGetter: Getter<UsuariosRepository>,
  ) {
    super(TiposUsuario, dataSource);
    this.tiposUsuarios = this.createHasManyRepositoryFactoryFor('tiposUsuarios', usuariosRepositoryGetter,);
    this.registerInclusionResolver('tiposUsuarios', this.tiposUsuarios.inclusionResolver);
  }
}
