// Straight Jasmine testing without Angular's testing support
// import {GameRound,Answer,Guess} from './questionsGame';
import {QuestionsGame,Player,Categories,QuestionsService,GameRound} from './questionsGame';
import {mockPlayers} from '../mock-players'
import { Observable, of } from 'rxjs';
import {QUESTIONS} from '../mock-questions';

describe('class: QuestionGame', () => {


  let game: QuestionsGame;
  let players:Player[];
  let categories:Categories[];
  let questionsService:QuestionsService;
  beforeEach(() => { 
    players = [mockPlayers[0],mockPlayers[1],mockPlayers[2],mockPlayers[3]];
    categories = [Categories.normal];
    questionsService = new QuestionsService();
    
    });
 
  it('questions array match the questions returned by questionService', () => {
    let mockGetQuestionsByCategory=()=>{
       return of(QUESTIONS.slice(0,2))
    }
    spyOn(questionsService, "getQuestionsByCategory").and.returnValue( of(QUESTIONS.slice(0,2)));
    players = [mockPlayers[0],mockPlayers[1],mockPlayers[2]];
    game = new QuestionsGame(players,categories,2,questionsService); 
    let mockQuestions = QUESTIONS.slice(0,2);
    expect(JSON.stringify(game.questions)==JSON.stringify(
     [mockQuestions[0],mockQuestions[0],mockQuestions[0],mockQuestions[1],mockQuestions[1],mockQuestions[1]]
    )).toBeTruthy();
    
  });

  it('game should be over when last round is over', () => {
    players = [mockPlayers[0],mockPlayers[1]]
    var lastRound = new GameRound(QUESTIONS[0],mockPlayers[1],3);
    spyOn(lastRound, "isOver").and.returnValue(true);
    game = new QuestionsGame(players,categories,2,questionsService); 
    game.gameRounds=[new GameRound(QUESTIONS[0],mockPlayers[0],3),new GameRound(QUESTIONS[0],mockPlayers[1],3),new GameRound(QUESTIONS[0],mockPlayers[0],3),lastRound];
    expect(game.isOver()).toBeTruthy();
  }); 

  it('game should not be over if last round is not over', () => {
    players = [mockPlayers[0],mockPlayers[1]]
    var lastRound = new GameRound(QUESTIONS[0],mockPlayers[1],3);
    spyOn(lastRound, "isOver").and.returnValue(false);
    game = new QuestionsGame(players,categories,2,questionsService); 
    game.gameRounds=[new GameRound(QUESTIONS[0],mockPlayers[0],3),new GameRound(QUESTIONS[0],mockPlayers[1],3),new GameRound(QUESTIONS[0],mockPlayers[0],3),lastRound];
    expect(game.isOver()).toBeFalsy();
  });

});