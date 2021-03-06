import { Player } from './player';
import { Categories, Question } from './question';
import { Color } from './color';
import { GameRound, Guess } from './gameRound';

//import { QuestionsService } from '../services/questions.service';
import { QuestionGameInstanceService } from '../services/question-game-instance.service';
export class QuestionsGame {
  questions: Question[];
  players: Player[];
  gameRounds: GameRound[];
  numberOfRoundsPerGame: number;
  totNumOfPlayers: number;
  nextQuestionIndex: number;


  constructor(players: Player[], categories: Categories[], numOfQuestions: number, private questionGameInstanceService: QuestionGameInstanceService,questions: Question[], shuffle:boolean) {
    this.players = players;
    let questionsFromServer: Question[];
    //questionsService.getQuestionsByCategory(numOfQuestions, categories).subscribe(questions => {console.log("qqq",questions);questionsFromServer = questions});
    questionsFromServer = questions;//////////////////////i just did this
    this.initQuestionForAllPlayers(questionsFromServer);
    if(shuffle){
      this.questions=this.shuffle(this.questions);
    }
    
    this.gameRounds = [];
    this.nextQuestionIndex = 0;
    this.addGameRound();
    //this.gameRounds=this.shuffle(this.gameRounds);
    this.numberOfRoundsPerGame = players.length * numOfQuestions;
    this.totNumOfPlayers = players.length;
    
  }

  private initQuestionForAllPlayers(questions: Question[]) {
    this.questions = [];
    for (let q of questions) {
      for (let i = 0; i < this.players.length; i++)
        this.questions.push(q);
    }
    
    
  }

  private shuffle(array) {
    var currentIndex = array.length; 
    var temporaryValue;
    var randomIndex;
  
    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
  
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;

    }
    return array;
  }

  playTurn(answer:string){
    
    if(!this.isOver()){
      let currRound = this.getCurrentRound();
      if(currRound.isGodTurn()){
        currRound.setGodAnswer(answer);
      }else{
        let playerGuessing:Player=currRound.getCurrentPlayer();
        if(
          currRound.setOpponentGuessAndValidate(new Guess(playerGuessing,answer))
        ){
          playerGuessing.incrementScore();
        }

      }

      if(currRound.isOver() && !this.questionGameInstanceService.game.isOver()){
        this.questionGameInstanceService.game.addGameRound();
      }
    }
  }

  isOver(): boolean {
    
    if (this.gameRounds.length == this.numberOfRoundsPerGame &&
      this.gameRounds[this.numberOfRoundsPerGame - 1].isOver()) {
      return true;
      // console.log("GameRound in is over",true);
    }
    // console.log("GameRound in is over",true);
    return false;
  }

  addGameRound() {
    let godIndex = this.getCurrentGodPlayerIndex();
    //console.log("godIndex",godIndex);
    let opponents: Player[] = this.players.slice(0, godIndex).concat(this.players.slice(godIndex + 1));
    //console.log("opps",opponents);
    let newGameRound: GameRound = new GameRound(
      this.getCurrentQuestion(),
      this.players[godIndex],
      opponents
    );
    this.gameRounds.push(newGameRound);
    this.nextQuestionIndex++;
  }



  getCurrentQuestion(): Question {
    let question: Question = this.questions[this.nextQuestionIndex];
    // console.log(this.questions);
    // console.log(this.nextQuestionIndex);
    //this.nextQuestionIndex++;
    
    return question;
  }

  getCurrentRound(): GameRound {
    return this.gameRounds[this.gameRounds.length - 1];
  }

  getCurrentGodPlayerIndex(): number {
    if (this.gameRounds.length == 0)
      return 0;
    if (this.gameRounds[this.gameRounds.length - 1].isOver()) {
      let index = this.gameRounds.length;
      if (index >= this.players.length){
        return index % this.players.length
      }
      return index;
    }
  }






}

export { Player, Color, Categories, Question, GameRound, Guess, QuestionGameInstanceService }

  // players:Player[];
  // categories:Categories[];
  // numOfQuestions:number;
  // setupComplete:boolean;
  // questions: Question[];
  // isGameOver:boolean;
  // allGameRounds:GameRound[];

