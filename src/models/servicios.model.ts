import {Entity, model, property, hasMany} from '@loopback/repository';
import {Revisiones} from './revisiones.model';

@model()
export class Servicios extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: false,
    required: true,
  })
  idServicio: string;

  @property({
    type: 'string',
    required: true,
  })
  servicio: string;

  @hasMany(() => Revisiones, {keyTo: 'idServicio'})
  ServiciosRevisiones: Revisiones[];

  constructor(data?: Partial<Servicios>) {
    super(data);
  }
}

export interface ServiciosRelations {
  // describe navigational properties here
}

export type ServiciosWithRelations = Servicios & ServiciosRelations;
