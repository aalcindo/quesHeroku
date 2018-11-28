import { Component } from '@angular/core';
import {QuestionsService} from './services/questions.service';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent  {
  name = 'Angular';

  constructor(public questionsService: QuestionsService){}
}
