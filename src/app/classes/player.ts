
import {Color} from './questionsGame';
export class Player {
  id:String;
  name:String;
  color:Color;
  score:number=0;
  static NAMEMAXLENGTH=35;

  

  constructor(id:String,name:String,color:Color) {
    this.id=id;
    this.name=name;
    this.color=color;
    this.score=0;

  }

  incrementScore(){
    this.score++;
  }
}

