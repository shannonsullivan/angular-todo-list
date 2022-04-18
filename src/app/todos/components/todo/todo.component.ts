import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild
} from "@angular/core";
import {TodoInterface} from "../../types/todo.interface";
import {TodoService} from "../../services/todos.service";

@Component({
  selector: 'app-todos-todo',
  templateUrl: './todo.component.html'
})
export class TodoComponent implements OnInit, OnChanges{

  // @Input('todo') todoProps: TodoInterface
  @Input('todo') todoProps!: TodoInterface;
  @Input('isEditing') isEditingProps!: boolean;
  @Output('setEditingId') setEditingIdEvent:
    EventEmitter<string | null> = new EventEmitter();

  editingText: string = '';
  @ViewChild('textInput') textInput!: ElementRef;

  constructor(private todoService: TodoService) {}

  ngOnInit(): void {
    this.editingText = this.todoProps.text;
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes["isEditingProps"].currentValue) {
      setTimeout(() => {
        this.textInput.nativeElement.focus();
      }, 0);
    }
    console.log('changes', changes)
  }

  setTodoInEditMode(): void {
    this.setEditingIdEvent.emit(this.todoProps.id);
    console.log('setTodoInEditMode');
  }

  removeTodo(): void {
    console.log('removeTodo');
    this.todoService.removeTodo(this.todoProps.id);
  }

  toggleTodo(): void {
  console.log('toggleTodo');
  this.todoService.toggleTodo(this.todoProps.id);
  }

  changeText(event: Event): void {
    this.editingText = (event.target as HTMLInputElement).value;
    console.log('changeText');
  }

  changeTodo(): void {
    this.todoService.changeTodo(this.todoProps.id, this.editingText);
    this.setEditingIdEvent.emit(null);
    console.log('changeTodo');
  }
}
