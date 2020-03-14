import { Pipe, PipeTransform } from '@angular/core';
import { Todo } from './todo';
import { FiltrosValidos } from '../filtro/filtro.actions';

@Pipe({
  name: 'todoFiltro',
})
export class TodoPipe implements PipeTransform {
  transform(todos: Todo[], filtro: FiltrosValidos): Todo[] {
    console.log(todos);
    switch (filtro) {
      case 'completados':
        return todos.filter(todo => todo.completado);

      case 'pendientes':
        return todos.filter(todo => !todo.completado);

      default:
        return todos;
    }
  }
}
