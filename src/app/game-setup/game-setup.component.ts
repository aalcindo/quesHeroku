import { Component, OnInit } from '@angular/core';

import { FormBuilder } from '@angular/forms';
import { Validators, FormControl } from '@angular/forms';
import { FormArray } from '@angular/forms';

import {Player,Color,Categories,QuestionsGame,Question} from '../classes/questionsGame'
import {QuestionsService} from '../services/questions.service';
import { QuestionGameInstanceService } from '../services/question-game-instance.service';
import {COLORS} from '../mock-colors';

import {Http,Response} from '@angular/http';



// import {MatSnackBar} from '@angular/material';

// import {coerceNumberProperty} from '@angular/cdk/coercion'; //for md-slider but everything is working without it



@Component({
  selector: 'game-setup',
  templateUrl: './game-setup.component.html',
  styleUrls: ['./game-setup.component.css']
})
export class QuestionsGameComponent implements OnInit {

  fetchingQuestion:boolean=false;
  categoryOptions: String[];
  avilableColor:Color[]; 
  
  settings={
    MAXNUMOFPLAYERS:4,
    MAXNUMBEROFQUESTIONS:5,
    MIMNUMBEROFQUESTIONS:1,
    DEFAULTNUMBEROFQUESTIONS:1,
    DEFAULTSHUFFLEQUESTION:true
  }

  
  
  

  colorsUsersCanPick:Color[];
  
  numOfQuestionSliderOption={  autoTicks : false,
    disabled : false,
    invert : false,
    max : this.settings.MAXNUMBEROFQUESTIONS,
    min : this.settings.MIMNUMBEROFQUESTIONS,
    tickInterval: 1,
    step : 1,
    thumbLabel : true,
    value : this.settings.DEFAULTNUMBEROFQUESTIONS,
    vertical : false
  }
    
  setUpForm = this.fb.group({
    selectedCategories:[[Categories.normal],[Validators.required]],
    numberOfQuestions:[this.settings.DEFAULTNUMBEROFQUESTIONS],
    players: this.fb.array([
    ]),
    shuffleQUestions:[this.settings.DEFAULTSHUFFLEQUESTION]

  });

  get playersFormArray() {
  // Typecast, because: reasons
  // https://github.com/angular/angular-cli/issues/6099
  //console.log("players form array",<FormArray>this.setUpForm.get('players'));
  return <FormArray>this.setUpForm.get('players');
}

  get players() {
    return this.setUpForm.get('players') as FormArray;
  }

  get shuffleQuestions(){
    return this.setUpForm.get('shuffleQUestions').value
  }

  log = (x)=>{
    console.log(x);
  }

  getPlayerError(index) {//todo
    return "fix this player error"/*this.players.controls[0].controls.name.hasError('required') ? 'You must enter a value' :
        this.players.controls[0].controls.name.errors ? 
        `Length of ${this.players.controls[0].controls.name.errors.maxlength.actualLength} exceeds max of ${this.players.controls[0].controls.name.errors.maxlength.requiredLength}` :
            '';*/

  }


  addPlayer() {
    let color = this.colorsUsersCanPick.splice(0,1)[0];
    this.players.push(this.fb.group({
        id:[this.players.length+1+""],
        name: ['name'+(this.players.length+1),[Validators.required,Validators.maxLength(Player.NAMEMAXLENGTH)]],
        color: [color],
        score:[0]
       }));
  }

  constructor(private fb: FormBuilder,private questionsService: QuestionsService,private questionGameInstanceService:QuestionGameInstanceService) {

  }

  private initCategoryOptions() {
    const categoryKeys = Object.keys(Categories);
    this.categoryOptions = categoryKeys.map(k => Categories[k as any]);
  }

  
  startGame(){
    this.questionGameInstanceService.game=null;
    let players:Player[]=this.players.controls.map( /*p => p.value as Player*/
     function(item, index, array){
       return new Player(item.value.id,item.value.name,item.value.color);
      //return item.value as Player;
     }
    );
    let selectCategories: Categories[] = [this.setUpForm.value.selectedCategories];
    let numberOfQuestions: number = this.setUpForm.value.numberOfQuestions;
    this.fetchingQuestion=true;
    this.questionsService.getQuestionsByCategory(numberOfQuestions, selectCategories).subscribe(questions => {console.log("qqq",questions);
    this.questionGameInstanceService.game = new QuestionsGame(players,selectCategories,numberOfQuestions,this.questionGameInstanceService,questions,this.shuffleQuestions);
    /*questionsFromServer = questions*/
  console.log("GAME",this.questionGameInstanceService.game)
   this.fetchingQuestion=false;
   });
    
    
  }



  updateColorUsersCanPick(){
    let selectedColors:Color[] = (this.players.controls.map(control=>control.get('color').value as Color));
    this.colorsUsersCanPick = COLORS.slice(0,this.settings.MAXNUMOFPLAYERS).filter((color)=>{
      if(!selectedColors.includes(color))
          return color;
    });
  }

  initColorsUsersCanPick(){
      this.colorsUsersCanPick=COLORS.slice(0,this.settings.MAXNUMOFPLAYERS);
  }

  deletePlayer(playerFormArrayIndex){
    this.players.removeAt(playerFormArrayIndex);
    this.updateColorUsersCanPick();
  }

  ngOnInit() {
    this.initCategoryOptions();
    this.initColorsUsersCanPick();
    this.addPlayer();
    this.addPlayer();
  }

  

  

  

}