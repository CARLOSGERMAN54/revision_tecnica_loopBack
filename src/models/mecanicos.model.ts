import {Entity, hasMany, model, property} from '@loopback/repository';
import {Revisiones} from './revisiones.model';

@model()
export class Mecanicos extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  idMecanico?: string;

  @property({
    type: 'string',
    required: true,
  })
  idUsuario: string;

  @property({
    type: 'string',
    required: true,
  })
  direccion: string;

  @property({
    type: 'string',
    required: true,
  })
  nivelEstudios: string;

  @hasMany(() => Revisiones, {keyTo: 'idMecanico'})
  MecanicosRevisiones: Revisiones[];

  constructor(data?: Partial<Mecanicos>) {
    super(data);
  }
}

export interface MecanicosRelations {
  // describe navigational properties here
}

export type MecanicosWithRelations = Mecanicos & MecanicosRelations;
