// export class Question {
//   id:string;
//   category:Categories;
//   answer1:string;
//   answer2:string;

//   constructor(id:string,answer1:string,answer2:string){
//     this.id=id;
//     this.answer1=answer1;
//     this.answer2=answer2;
//     this.category = Categories.kids;
//   }

// }


export class Question {
  id:string;
  category:Categories;
  answer1:string;
  answer2:string;

  constructor(id:string,answer1:string,answer2:string,category:Categories){
    this.id=id;
    this.answer1=answer1;
    this.answer2=answer2;
    this.category = category;
  }

}

export enum Categories { kids='kids', couples='couple', normal='normal', savage='savage' }