import {Entity, model, property, hasMany} from '@loopback/repository';
import {CambioRepuestos} from './cambio-repuestos.model';

@model()
export class Repuestos extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  idRepuesto?: string;

  @property({
    type: 'string',
    required: true,
  })
  repuesto: string;

  @hasMany(() => CambioRepuestos, {keyTo: 'idRepuesto'})
  RepuestoCambioRepuesto: CambioRepuestos[];

  constructor(data?: Partial<Repuestos>) {
    super(data);
  }
}

export interface RepuestosRelations {
  // describe navigational properties here
}

export type RepuestosWithRelations = Repuestos & RepuestosRelations;
