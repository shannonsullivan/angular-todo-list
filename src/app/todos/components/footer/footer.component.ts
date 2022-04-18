import {Component} from "@angular/core";
import {TodoService} from "../../services/todos.service";
import {map, Observable} from "rxjs";
import {FilterEnum} from "../../types/filter.enum";

@Component({
  selector: 'app-todos-footer',
  templateUrl: './footer.component.html',
})
export class FooterComponent {
  noTodosClass$: Observable<boolean>;
  activeCount$: Observable<number>;
  itemsLeftText$: Observable<string>;
  filter$: Observable<FilterEnum>;
  filterEnum = FilterEnum;

  constructor(private todosService: TodoService) {
    this.activeCount$ = this.todosService.todos$
      .pipe(map((todos) =>
        todos.filter((todo) => !todo.isCompleted).length)
      );

    this.itemsLeftText$ = this.activeCount$
      .pipe(map((activeCount) => `item${activeCount !== 1 ? 's' : ''} left`)
    );

    this.noTodosClass$ = this.todosService.todos$
      .pipe(map((todos) =>
        todos.length === 0)
      );
    this.filter$ = this.todosService.filter$;
  }

  changeFilter(event: Event, filterName: FilterEnum): void {
    event.preventDefault();
    this.todosService.changeFilter(filterName);
    console.log('changeFilter', filterName)
  }
}
