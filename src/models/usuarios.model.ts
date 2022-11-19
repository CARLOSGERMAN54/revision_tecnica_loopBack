import {Entity, model, property, hasMany, hasOne} from '@loopback/repository';
import {Vehiculos} from './vehiculos.model';
import {Revisiones} from './revisiones.model';
import {Propietarios} from './propietarios.model';
import {Mecanicos} from './mecanicos.model';
import {Empleados} from './empleados.model';

@model()
export class Usuarios extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: false,
    required: true,
  })
  idUsuario: string;

  @property({
    type: 'string',
    required: true,
  })
  nombres: string;

  @property({
    type: 'string',
    required: true,
  })
  apellidos: string;

  @property({
    type: 'string',
    required: true,
  })
  idTipoUsuario: string;

  @property({
    type: 'string',
    required: true,
  })
  idEstado: string;

  @property({
    type: 'string',
  })
  correo?: string;

  @property({
    type: 'string',
  })
  telefono?: string;

  
  @property({
    type: 'date',
    required: true,
  })
  fechaNacimiento: string;

  @property({
    type: 'string',
  })
  password?: string;

  @hasOne(() => Empleados, {keyTo: 'idUsuario'})
  UsuarioEmpleado: Empleados;

  @hasOne(() => Propietarios, {keyTo: 'idUsuario'})
  UsuarioPropietario: Propietarios;

  @hasOne(() => Mecanicos, {keyTo: 'idUsuario'})
  UsuarioMecanico: Mecanicos;

  constructor(data?: Partial<Usuarios>) {
    super(data);
  }
}

export interface UsuariosRelations {
  // describe navigational properties here
}

export type UsuariosWithRelations = Usuarios & UsuariosRelations;
