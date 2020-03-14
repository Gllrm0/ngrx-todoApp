import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { AppState } from 'src/app/app.reducer';
import { Store } from '@ngrx/store';
import { marcarTodos } from '../todo.actions';

@Component({
  selector: 'app-todo-page',
  templateUrl: './todo-page.component.html',
  styleUrls: ['./todo-page.component.css'],
})
export class TodoPageComponent implements OnInit {
  marcarTodosCheckbox: FormControl;

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.marcarTodosCheckbox = new FormControl(null);

    this.marcarTodosCheckbox.valueChanges.subscribe(valor => {
      this.store.dispatch(marcarTodos({ valor }));
    });
  }
}
