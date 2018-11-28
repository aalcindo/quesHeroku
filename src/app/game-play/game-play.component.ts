import { Component, OnInit } from '@angular/core';
import {QuestionsService} from '../services/questions.service';
import { Question,Categories } from '../classes/question';
import {Player} from '../classes/player';
import {FormControl } from '@angular/forms';
// import {GameRound,Guess} from '../classes/questionsGame';
import { QuestionGameInstanceService } from '../services/question-game-instance.service';


@Component({
  selector: 'game-play',
  templateUrl: './game-play.component.html',
  styleUrls: ['./game-play.component.css']
})
export class GamePlayComponent implements OnInit {


  constructor(public questionGameInstanceService: QuestionGameInstanceService) { }

  ngOnInit() {
  }



  guess(answer:string){
    
    this.questionGameInstanceService.game.playTurn(answer);
    if(this.questionGameInstanceService.game.isOver()){
      console.log("Game Over");
    }
  }

}

