import { Component } from '@angular/core';
import { QuestionGameInstanceService } from './services/question-game-instance.service';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent  {
  name = 'Angular';

  constructor(public questionGameInstanceService: QuestionGameInstanceService){}
}
