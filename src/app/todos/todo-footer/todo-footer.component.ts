import { Component, OnInit } from '@angular/core';
import { FiltrosValidos, filtrar } from 'src/app/filtro/filtro.actions';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { Observable } from 'rxjs';
import { scan, map } from 'rxjs/operators';
import { Todo } from '../todo';
import { limpiarCompletados } from '../todo.actions';

@Component({
  selector: 'app-todo-footer',
  templateUrl: './todo-footer.component.html',
  styleUrls: ['./todo-footer.component.css'],
})
export class TodoFooterComponent implements OnInit {
  filtros: FiltrosValidos[] = ['todos', 'completados', 'pendientes'];
  filtroActual: FiltrosValidos = 'todos';
  tareasPendientes$: Observable<number>;
  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.store
      .select('filtro')
      .subscribe(filtro => (this.filtroActual = filtro));

    this.tareasPendientes$ = this.store
      .select('todos')
      .pipe(map(todos => todos.filter(todo => !todo.completado).length));
  }

  setFiltro(filtro) {
    this.filtroActual = filtro;
    this.store.dispatch(filtrar({ filtro: this.filtroActual }));
  }

  onLimpiarCompletados() {
    this.store.dispatch(limpiarCompletados());
  }
}
