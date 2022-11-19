import {Entity, model, property} from '@loopback/repository';

@model()
export class CambioRepuestos extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  idCambioRepuesto?: string;

  @property({
    type: 'string',
    required: true,
  })
  idRepuesto: string;

  @property({
    type: 'string',
    required: true,
  })
  idRevision: string;


  constructor(data?: Partial<CambioRepuestos>) {
    super(data);
  }
}

export interface CambioRepuestosRelations {
  // describe navigational properties here
}

export type CambioRepuestosWithRelations = CambioRepuestos & CambioRepuestosRelations;
