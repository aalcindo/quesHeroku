import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import {QUESTIONS} from '../mock-questions';
import {Player,Color,QuestionsGame} from '../classes/questionsGame';
import { Categories, Question } from '../classes/question';
import { HttpClient, HttpHeaders } from '@angular/common/http';




@Injectable()
export class QuestionsService {

  game:QuestionsGame;
  // players:Player[];
  // categories:Categories[];
  // numOfQuestions:number;
  // setupComplete:boolean;
  // questions: Question[];
  // isGameOver:boolean;
  // allGameRounds:GameRound[];


  constructor(private http: HttpClient) { }


  getQuestionsByCategory(numOfQuestions:number,categories:Categories[]): Observable<Question[]> {
    
     let headers = new HttpHeaders().set('Authorization', 'Bearer 00D0b000000uQ4B!AQcAQKaUizOHJ.3GwM9xP7u2GXytr6coHlinja_6nm9CA7fzzC.oL5_iIUPzjZlGZxqfkTMEgvwDZso77hPIFKC35tA3quHG');
    let link = "https://my-json-server.typicode.com/aalcindo/demo/questions";

    return this.http.get<Question[]>(link,{headers}).pipe(map(data => {console.log("aaaaaaaaaaaa",data);return data.map(item=>new Question(item.Id,item.Body1__c,item.Body2__c,Categories[item.Category__c.toLocaleLowerCase()]))} ))
    ;
    //.subscribe(questions => {console.log("testing",questions); tempQ=questions});
    // console.log("temp",temp);


    
    // let allQuestions: Question[]=QUESTIONS.filter(question =>{
    //     return (Object.values(categories)[0].includes(question.category))
    // }
    // );
    
    // if(numOfQuestions>=allQuestions.length)          
    //   return of (allQuestions/*(<any>Object).values(Categories).includes(question.category) for es2016*/);
    // else
    //    return of(allQuestions.slice(0,numOfQuestions))



  }
  

}

