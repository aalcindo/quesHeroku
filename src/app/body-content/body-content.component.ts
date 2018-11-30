import { Component, OnInit } from '@angular/core';
import { QuestionGameInstanceService } from '../services/question-game-instance.service';


@Component({
  selector: 'body-content',
  templateUrl: './body-content.component.html',
  styleUrls: ['./body-content.component.css']
})
export class BodyContentComponent implements OnInit {

  constructor(public questionGameInstanceService:QuestionGameInstanceService) { }

  ngOnInit() {
  }

}
