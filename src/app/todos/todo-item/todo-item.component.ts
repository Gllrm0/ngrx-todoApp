import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { Todo } from '../todo';
import { FormControl, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import * as todoActions from '../todo.actions';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.css'],
})
export class TodoItemComponent implements OnInit {
  checkCompletado: FormControl;
  editTodo: FormControl;
  editando = false;
  @Input() todo: Todo;
  @ViewChild('todoInput') todoInput: ElementRef;

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.checkCompletado = new FormControl(this.todo.completado);
    this.editTodo = new FormControl(this.todo.texto, Validators.required);

    this.checkCompletado.valueChanges.subscribe(value => {
      this.store.dispatch(todoActions.toggle({ id: this.todo.id }));
      console.log(value);
    });
  }

  onCompletar() {
    // this.todo.completado = true;
  }

  onEditar() {
    this.editTodo.setValue(this.todo.texto);
    this.editando = true;
    setTimeout(() => {
      this.todoInput.nativeElement.select();
    }, 0);
  }

  onEliminar() {
    console.log('elimina');

    const id = this.todo.id;
    this.store.dispatch(todoActions.eliminar({ id }));
  }

  finalizarEdicion() {
    this.editando = false;
    const texto = this.editTodo.value;
    if (this.editTodo.invalid || texto === this.todo.texto) return;
    this.store.dispatch(todoActions.editar({ id: this.todo.id, texto }));
  }
}
