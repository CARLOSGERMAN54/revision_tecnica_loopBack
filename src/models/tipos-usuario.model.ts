import {Entity, model, property, hasMany} from '@loopback/repository';
import {Usuarios} from './usuarios.model';

@model()
export class TiposUsuario extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: false,
    required: true,
  })
  idTipoUsuario: string;

  @property({
    type: 'string',
    required: true,
  })
  tipoUsuario: string;

  @hasMany(() => Usuarios, {keyTo: 'idTipoUsuario'})
  tiposUsuarios: Usuarios[];

  constructor(data?: Partial<TiposUsuario>) {
    super(data);
  }
}

export interface TiposUsuarioRelations {
  // describe navigational properties here
}

export type TiposUsuarioWithRelations = TiposUsuario & TiposUsuarioRelations;
