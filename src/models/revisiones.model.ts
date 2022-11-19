import {Entity, hasMany, model, property} from '@loopback/repository';
import {CambioRepuestos} from './cambio-repuestos.model';

//import {Estados} from './estados.model';

@model()
export class Revisiones extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  idRevision?: string;

  @property({
    type: 'date',
    required: true,
  })
  fechaRegistro: string;

  @property({
    type: 'date',
    required: true,
  })
  fechaEntrada: string;

  @property({
    type: 'date',
    required: true,
  })
  fechaSalida: string;

  @property({
    type: 'string',
    required: true,
  })
  idVehiculo: string;

  @property({
    type: 'string',
    required: true,
  })
  nivelAceite: string;

  @property({
    type: 'string',
    required: true,
  })
  nivelLiquidoFrenos: string;

  @property({
    type: 'string',
    required: true,
  })
  nivelRefrigerante: string;

  @property({
    type: 'string',
    required: true,
  })
  nivelLiquidoDireccion: string;

  @property({
    type: 'string',
    required: true,
  })
  idSede: string;

  @property({
    type: 'string',
    required: true,
  })
  idServicio: string;

  @property({
    type: 'string',
  })
  idMecanico?: string;

  @property({
    type: 'string',
  })
  idEmpleado?: string;

  @property({
    type: 'string',
  })
  descripcion?: string;

  @property({
    type: 'string',
  })
  idEstado?: string;

  @hasMany(() => CambioRepuestos, {keyTo: 'idRevision'})
  RevisionesCambioRepuestos: CambioRepuestos[];

  constructor(data?: Partial<Revisiones>) {
    super(data);
  }
}

export interface RevisionesRelations {
  // describe navigational properties here
}

export type RevisionesWithRelations = Revisiones & RevisionesRelations;
