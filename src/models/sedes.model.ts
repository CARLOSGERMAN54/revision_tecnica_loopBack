import {Entity, model, property, hasMany} from '@loopback/repository';
import {Revisiones} from './revisiones.model';

@model()
export class Sedes extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: false,
    required: true,
  })
  idSede: string;

  @property({
    type: 'string',
    required: true,
  })
  sede: string;

  @hasMany(() => Revisiones, {keyTo: 'idSede'})
  SedesRevisiones: Revisiones[];

  constructor(data?: Partial<Sedes>) {
    super(data);
  }
}

export interface SedesRelations {
  // describe navigational properties here
}

export type SedesWithRelations = Sedes & SedesRelations;
