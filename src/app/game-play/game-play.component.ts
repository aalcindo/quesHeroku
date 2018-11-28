import { Component, OnInit } from '@angular/core';
import {QuestionsService} from '../services/questions.service';
import { Question,Categories } from '../classes/question';
import {Player} from '../classes/player';
import {FormControl } from '@angular/forms';
import {Answer,GameRound,Guess} from '../classes/questionsGame';


@Component({
  selector: 'game-play',
  templateUrl: './game-play.component.html',
  styleUrls: ['./game-play.component.css']
})
export class GamePlayComponent implements OnInit {


  constructor(public questionsService: QuestionsService) { }

  ngOnInit() {
  }



  guess(answer:Answer){
    
    this.questionsService.game.playTurn(answer);
    if(this.questionsService.game.isOver()){
      console.log("Game Over");
    }
  }

}

