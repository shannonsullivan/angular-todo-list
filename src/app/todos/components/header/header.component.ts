import {Component} from "@angular/core";
import {TodoService} from "../../services/todos.service";

@Component({
  selector: 'app-todos-header',
  templateUrl: './header.component.html',
})
export class HeaderComponent {
  text: string = '';

  constructor(private todoService: TodoService) {
    // for testing - remove this
    this.todoService.todos$.subscribe(todos => {
      console.log('todos', todos);
    })
  }

  changeText(event: Event) {
    const target = event.target as HTMLInputElement;
    this.text = target.value;
    console.log(target.value);
  }

  addTodo(): void {
    console.log('addTodo', this.text);
    this.todoService.addTodo(this.text);
    this.text = '';
  }
}
