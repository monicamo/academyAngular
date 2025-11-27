import { Component, computed, input, output } from '@angular/core';
import { User } from '../models/app.models';
import { CardComponent } from '../shared/card/card.component';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [CardComponent],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css',
})
export class UserComponent {
  // @Input({ required: true }) avatar!: string;
  // @Input({ required: true }) name!: string;
  // @Output() select = new EventEmitter<string>();

  // avatar = input.required<string>();
  // name = input.required<string>();
  // id = input.required<string>();

  user = input.required<User>();
  selected = input.required<boolean>();
  select = output<string>();

  imagePath = computed(() => `assets/users/${this.user().avatar}`);

  // get imagePath() {
  //   return `assets/users/${this.avatar()}`;
  // }

  onSelectUser() {
    this.select.emit(this.user().id);
  }
}
