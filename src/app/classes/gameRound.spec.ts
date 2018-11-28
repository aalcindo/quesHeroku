// Straight Jasmine testing without Angular's testing support
import {GameRound,Answer,Guess} from './questionsGame';
import {mockPlayers} from '../mock-players'
import {QUESTIONS} from '../mock-questions'

describe('GameRound', () => {


 let gameRound: GameRound;

  beforeEach(() => { gameRound = new GameRound(QUESTIONS[0],mockPlayers[0],[mockPlayers[1],mockPlayers[2]]); });
 
  it('Game Round should not be over if there are no guesses', () => {
    expect(gameRound.isOver()).toBeFalsy();
    
  }); 

  it('Game Round should not be over if there is the last player hasn\'t guessed', () => {
    // spyOnProperty(gameRound,'guesses').and.returnValue(null);
    gameRound.opponentGuesses=[new Guess()];
    expect(gameRound.isOver()).toBeFalsy();
  });

  it('Game Round should be over if every opponent has guessed', () => {
    //spyOnProperty(gameRound,'test').and.returnValue(1);
    gameRound.opponentGuesses=[new Guess(),new Guess()];
    expect(gameRound.isOver()).toBeTruthy();
  });

  it('God should be the player passed in constructor', () => {
    expect(gameRound.getGod()).toEqual(mockPlayers[0]);
  });

  it('getGodAnswer sound return the answer that was set for the god', () => {
    let answer:Answer={id:'1',body:'be always late'}
    gameRound.setGodAnswer(answer);
    expect(answer).toEqual(gameRound.getGodAnswer());
  });

  it('God player cannot add a guess to opponent\'s guesses', () => {
    gameRound = new GameRound(QUESTIONS[0],mockPlayers[0],[mockPlayers[1]]);
    let answer:Answer={id:'1',body:'be always late'}
    expect( function(){ 
      gameRound.setOpponentGuessAndValidate({player:mockPlayers[0],answer});
    } ).toThrow("God guess cannot be added to opponentGuesses");
  });

  it('Same Guess cannot be added swtice', () => {
    gameRound = new GameRound(QUESTIONS[0],mockPlayers[0],[mockPlayers[1]]);
    let answer:Answer={id:'1',body:'be always late'}
    console.log(gameRound);
    gameRound.setGodAnswer(answer);
    gameRound.setOpponentGuessAndValidate({player:mockPlayers[1],answer});
      
    expect( function(){ 
       gameRound.setOpponentGuessAndValidate({player:mockPlayers[1],answer});
     } ).toThrow("Player has already taken a guess");
  });

  it('no more guesses can be taken because all players have guessed', () => {
    gameRound = new GameRound(QUESTIONS[0],mockPlayers[0],[mockPlayers[1],mockPlayers[2]]);
    let answer:Answer={id:'1',body:'be always late'}
    gameRound.setGodAnswer(answer);
    gameRound.setOpponentGuessAndValidate({player:mockPlayers[1],answer});
    gameRound.setOpponentGuessAndValidate({player:mockPlayers[2],answer});
      
    expect( function(){ 
      gameRound.setOpponentGuessAndValidate({player:mockPlayers[3],answer});
    } ).toThrow("opponentGuesses array is already full.");
  });

  it('opponent makes correct guess', () => {
   gameRound = new GameRound(QUESTIONS[0],mockPlayers[0],[mockPlayers[1],mockPlayers[2]]);
    let answer:Answer={id:'1',body:'be always late'}
    gameRound.setGodAnswer(answer);
    let answerFeedback = gameRound.setOpponentGuessAndValidate({player:mockPlayers[1],answer});
    expect(answerFeedback).toBeTruthy(answerFeedback);
  });

  it('opponent makes wrong guess', () => {
    gameRound = new GameRound(QUESTIONS[0],mockPlayers[0],[mockPlayers[1],mockPlayers[2]]);
    let godAnswer:Answer={id:'1',body:'be always late'}
    gameRound.setGodAnswer(godAnswer);
    let opponentGuess:Guess = {player:mockPlayers[1],answer:{id:'2',body:'be always early'}};
    let answerFeedback = gameRound.setOpponentGuessAndValidate(opponentGuess);
    expect(answerFeedback).toBeFalsy();
  });

  it('get current player', () => {
    gameRound = new GameRound(QUESTIONS[0],mockPlayers[0],[mockPlayers[1],mockPlayers[2]]);
    expect(gameRound.getCurrentPlayer()).toEqual(gameRound.getGod());
    let godAnswer:Answer={id:'1',body:'be always late'}
    gameRound.setGodAnswer(godAnswer);
    expect(gameRound.getCurrentPlayer()).toEqual(mockPlayers[1]);
    let opponentGuess:Guess = {player:mockPlayers[1],answer:{id:'2',body:'be always early'}};
    let answerFeedback = gameRound.setOpponentGuessAndValidate(opponentGuess);
    expect(gameRound.getCurrentPlayer()).toEqual(mockPlayers[2]);
    // expect(answerFeedback).toBeFalsy();
  });











});