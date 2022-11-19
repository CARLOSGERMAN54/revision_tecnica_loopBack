import {Entity, model, property, hasMany} from '@loopback/repository';
import {Revisiones} from './revisiones.model';
import {Usuarios} from './usuarios.model';

@model()
export class Estados extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: false,
    required: true,
  })
  idEstado: string;

  @property({
    type: 'string',
    required: true,
  })
  estado: string;

  @hasMany(() => Revisiones, {keyTo: 'idEstado'})
  EstadosRevisiones: Revisiones[];

  @hasMany(() => Usuarios, {keyTo: 'idEstado'})
  estadosusuarios: Usuarios[];

  constructor(data?: Partial<Estados>) {
    super(data);
  }
}

export interface EstadosRelations {
  // describe navigational properties here
}

export type EstadosWithRelations = Estados & EstadosRelations;
