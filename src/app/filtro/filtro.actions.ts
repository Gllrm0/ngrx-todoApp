import { createAction, props } from '@ngrx/store';

export type FiltrosValidos = 'todos' | 'completados' | 'pendientes';

export const filtrar = createAction(
  '[Filtro] Establecer filtro',
  props<{ filtro: FiltrosValidos }>(),
);
