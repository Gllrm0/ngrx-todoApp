import { Todo } from './todo';
import { createReducer, on, Action } from '@ngrx/store';
import * as todoActions from './todo.actions';

const nuevoTodo = (texto: string): Todo => {
  return {
    id: Math.floor(Math.random() * 1000),
    texto,
    completado: false,
  };
};
export const estadoInicial: Todo[] = [
  nuevoTodo('Fotografíar la Luna'),
];

const _todoReducer = createReducer(
  estadoInicial,
  on(todoActions.crear, (state, { texto }) => [...state, nuevoTodo(texto)]),
  on(todoActions.toggle, (state, { id }) => {
    return state.map(todo => {
      if (todo.id === id) {
        return {
          ...todo,
          completado: !todo.completado,
        };
      }
      return todo;
    });
  }),
  on(todoActions.editar, (state, { id, texto }) => {
    return state.map(todo => {
      if (todo.id === id) {
        return {
          ...todo,
          texto,
        };
      }
      return todo;
    });
  }),
  on(todoActions.eliminar, (state, { id }) => {
    return state.filter(todo => todo.id !== id);
  }),
  on(todoActions.marcarTodos, (state, { valor }) => {
    return state.map(todo => {
      return {
        ...todo,
        completado: valor,
      };
    });
  }),
  on(todoActions.limpiarCompletados, state =>
    state.filter(todos => !todos.completado),
  ),
);

export function todoReducer(state, action: Action) {
  return _todoReducer(state, action);
}
