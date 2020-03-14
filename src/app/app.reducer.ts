import { Todo } from './todos/todo';
import { ActionReducerMap, createReducer } from '@ngrx/store';
import { todoReducer } from './todos/todo.reducer';
import { FiltrosValidos } from './filtro/filtro.actions';
import { filtroReducer } from './filtro/filtro.reducer';

export interface AppState {
  todos: Todo[];
  filtro: FiltrosValidos;
}

export const appReducer: ActionReducerMap<AppState> = {
  todos: todoReducer,
  filtro: filtroReducer,
};
