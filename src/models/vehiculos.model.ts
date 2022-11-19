import {Entity, model, property, hasMany} from '@loopback/repository';
import {Revisiones} from './revisiones.model';

@model()
export class Vehiculos extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  idVehiculo?: string;

  @property({
    type: 'string',
    required: true,
  })
  numeroChasis: string;

  @property({
    type: 'string',
    required: true,
  })
  placa: string;

  @property({
    type: 'string',
    required: true,
  })
  marca: string;

  @property({
    type: 'string',
    required: true,
  })
  modelo: string;

  @property({
    type: 'string',
    required: true,
  })
  color: string;

  @property({
    type: 'string',
    required: true,
  })
  tipo: string;

  @property({
    type: 'string',
  })
  descripcion?: string;

  /*
    @property({
      type: 'string',
      required: true,
    })
    idUsuario: string;*/
  @property({
    type: 'string',
  })
  idPropietario?: string;
  @hasMany(() => Revisiones, {keyTo: 'idVehiculo'})
  VehiculosRevisiones: Revisiones[];

  constructor(data?: Partial<Vehiculos>) {
    super(data);
  }
}

export interface VehiculosRelations {
  // describe navigational properties here
}

export type VehiculosWithRelations = Vehiculos & VehiculosRelations;
