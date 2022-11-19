import {Entity, hasMany, model, property} from '@loopback/repository';
import {Revisiones} from './revisiones.model';

@model()
export class Empleados extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  idEmpleado?: string;

  @property({
    type: 'string',
    required: true,
  })
  idUsuario: string;
  @property({
    type: 'string',
    required: true,
  })
  cargo: string;
  @property({
    type: 'string',
    required: true,
  })
  direccion: string;

  @hasMany(() => Revisiones, {keyTo: 'idEmpleado'})
  EmpleadosRevisiones: Revisiones[];

  constructor(data?: Partial<Empleados>) {
    super(data);
  }
}

export interface EmpleadosRelations {
  // describe navigational properties here
}

export type EmpleadosWithRelations = Empleados & EmpleadosRelations;
