import { Injectable } from '@angular/core';
import {QuestionsGame} from '../classes/questionsGame';

@Injectable()
// @Injectable({
//   providedIn: 'root'
// })
export class QuestionGameInstanceService {
  game:QuestionsGame;
  constructor() { }
}
