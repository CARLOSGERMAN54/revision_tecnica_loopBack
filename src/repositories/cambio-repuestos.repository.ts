import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {CambioRepuestos, CambioRepuestosRelations} from '../models';

export class CambioRepuestosRepository extends DefaultCrudRepository<
  CambioRepuestos,
  typeof CambioRepuestos.prototype.idCambioRepuesto,
  CambioRepuestosRelations
> {
  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource,
  ) {
    super(CambioRepuestos, dataSource);
  }
}
