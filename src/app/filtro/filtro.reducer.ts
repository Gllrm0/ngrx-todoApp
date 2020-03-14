import { createReducer, Action, on } from '@ngrx/store';
import * as filtroActions from './filtro.actions';

const initialState: filtroActions.FiltrosValidos = 'todos';

const _filtroReducer = createReducer(
  initialState,
  on(filtroActions.filtrar, (state, { filtro }) => filtro),
);

export function filtroReducer(state, action: Action) {
  return _filtroReducer(state, action);
}
