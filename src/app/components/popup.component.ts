import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-popup',
  templateUrl: 'popup.component.html'
})
export class PopupComponent {
  @Input() icon;
  @Input() message;
  @Input() title;
  @Input() iconTitle;
  @Input() action: Function;

  constructor() {}
}
