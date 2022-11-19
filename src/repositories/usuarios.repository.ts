import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasOneRepositoryFactory} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Usuarios, UsuariosRelations, Empleados, Propietarios, Mecanicos} from '../models';
import {EmpleadosRepository} from './empleados.repository';
import {PropietariosRepository} from './propietarios.repository';
import {MecanicosRepository} from './mecanicos.repository';

export class UsuariosRepository extends DefaultCrudRepository<
  Usuarios,
  typeof Usuarios.prototype.idUsuario,
  UsuariosRelations
> {

  public readonly UsuarioEmpleado: HasOneRepositoryFactory<Empleados, typeof Usuarios.prototype.idUsuario>;

  public readonly UsuarioPropietario: HasOneRepositoryFactory<Propietarios, typeof Usuarios.prototype.idUsuario>;

  public readonly UsuarioMecanico: HasOneRepositoryFactory<Mecanicos, typeof Usuarios.prototype.idUsuario>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('EmpleadosRepository') protected empleadosRepositoryGetter: Getter<EmpleadosRepository>, @repository.getter('PropietariosRepository') protected propietariosRepositoryGetter: Getter<PropietariosRepository>, @repository.getter('MecanicosRepository') protected mecanicosRepositoryGetter: Getter<MecanicosRepository>,
  ) {
    super(Usuarios, dataSource);
    this.UsuarioMecanico = this.createHasOneRepositoryFactoryFor('UsuarioMecanico', mecanicosRepositoryGetter);
    this.registerInclusionResolver('UsuarioMecanico', this.UsuarioMecanico.inclusionResolver);
    this.UsuarioPropietario = this.createHasOneRepositoryFactoryFor('UsuarioPropietario', propietariosRepositoryGetter);
    this.registerInclusionResolver('UsuarioPropietario', this.UsuarioPropietario.inclusionResolver);
    this.UsuarioEmpleado = this.createHasOneRepositoryFactoryFor('UsuarioEmpleado', empleadosRepositoryGetter);
    this.registerInclusionResolver('UsuarioEmpleado', this.UsuarioEmpleado.inclusionResolver);
  }
}
