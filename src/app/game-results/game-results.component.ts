import { Component, OnInit } from '@angular/core';

import {GameRound,Guess,Question,Categories,Player} from '../classes/questionsGame';
import { QuestionGameInstanceService } from '../services/question-game-instance.service';
import {mockPlayers} from '../mock-players';
import {mockRounds} from '../mock-rounds';

@Component({
  selector: 'game-results',
  templateUrl: './game-results.component.html',
  styleUrls: ['./game-results.component.css']
})
export class GameResultsComponent implements OnInit {

  players:Player[]
  rounds:GameRound[]



  displayedColumns: string[] = ['god','question','selectedAnswer'];
  gameWinnerString = '';
  opponentGuessesFiltered:Guess[];

  constructor(public questionGameInstanceService: QuestionGameInstanceService) {
    this.players=this.questionGameInstanceService.game.players;
    this.rounds=this.questionGameInstanceService.game.gameRounds;
   }

  ngOnInit() {

    let winners:Player[] =[]; 
    for(let player of this.players){
      if(winners.length==0 || winners[0].score == player.score){
        winners.push(player);
      }else if(winners[0].score < player.score){
        winners=[player];
      }
  
    }

    if(winners.length==1){
      this.gameWinnerString+=`${winners[0].name} `;
    }else{
      for(let p of winners){
          this.gameWinnerString+=`${p.name}, `;
      }
      let replacement = ' ';
      //replace last occurance of ,
      this.gameWinnerString = this.gameWinnerString.replace(/,([^,]*)$/,replacement+'$1');
      //replace last occurance of ,
      replacement = ' and'
      this.gameWinnerString = this.gameWinnerString.replace(/,([^,]*)$/,replacement+'$1');
    }
    this.gameWinnerString+=`won the game with ${winners[0].score} point(s).`;
    //console.log("Winner",this.gameWinnerString);

  }



   getRoundsGuessed(playerId:String):GameRound[]{
     //console.log(playerId,this.questionsService.game.gameRounds);
     return this.questionGameInstanceService.game.gameRounds.filter(gr=>{return gr.opponentGuesses.filter(guess=>{return guess.player.id==playerId})[0]});
   }


}
