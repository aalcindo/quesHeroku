import {Player,Question} from './questionsGame';



export class GameRound{
    question:Question;
    godGuess:Guess;
    opponentGuesses:Guess[];
    opponents:Player[];
    private maxNumberOfGuesses:number;

    

    constructor(question:Question,god:Player,opponents:Player[]){
      this.question = question;
      this.godGuess = new Guess(god,null);
      this.maxNumberOfGuesses = opponents.length;
      this.opponents=opponents;
      this.opponentGuesses = [];
    }

    isOver():boolean{
      if(this.opponentGuesses[this.maxNumberOfGuesses-1])
        return true;
      return false;
    }

    getCurrentPlayer():Player{
      if(!this.godGuess.answer){
        return this.getGod();
      }
      if(this.isOver())
        return this.opponents[this.opponentGuesses.length-1]; 
      return this.opponents[this.opponentGuesses.length];//next player
    }

    getGod():Player{
      return this.godGuess.player;
    }

    setGodAnswer(answer:string){
      this.godGuess.answer=answer;
    }

    getGodAnswer():string{
      return this.godGuess.answer;
    }

    isGodTurn():boolean{
      return this.getCurrentPlayer()==this.getGod();
    }

    setOpponentGuessAndValidate(guess:Guess):boolean{
      if(guess.player.id==this.godGuess.player.id)
        throw "God guess cannot be added to opponentGuesses";
     let opponentIds:String[]=( Array.from(this.opponentGuesses).map(item=>item.player.id));
     if(opponentIds.includes(guess.player.id))
        throw "Player has already taken a guess";
     if(this.opponentGuesses.length<=this.maxNumberOfGuesses-1 ){
          this.opponentGuesses.push(guess);
          if(guess.answer == this.godGuess.answer)
            return true;
          else 
            return false;
      }
      throw "opponentGuesses array is already full.";
    }




    






}

export class Guess{
    player:Player;
    answer:string;

    constructor(player:Player,answer:string){
      this.player=player;
      this.answer=answer;
    }

    setAnswer(answer:string){
      this.answer=answer;
    }
    


}