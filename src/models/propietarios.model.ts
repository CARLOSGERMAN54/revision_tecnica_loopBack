import {Entity, hasMany, model, property} from '@loopback/repository';
import {Vehiculos} from './vehiculos.model';

@model()
export class Propietarios extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  idPropietario?: string;

  @property({
    type: 'string',
    required: true,
  })
  idUsuario: string;

  @property({
    type: 'string',
    required: true,
  })
  ciudadResidencia: string;

  @property({
    type: 'string',
    required: true,
  })
  direccion: string;



  @hasMany(() => Vehiculos, {keyTo: 'idPropietario'})
  PropietariosVehiculos: Vehiculos[];

  constructor(data?: Partial<Propietarios>) {
    super(data);
  }
}

export interface PropietariosRelations {
  // describe navigational properties here
}

export type PropietariosWithRelations = Propietarios & PropietariosRelations;
