import 'hammerjs';  // to fix console working when using md-slider: common-module.ts:114 Could not find HammerJS. made md-slider work

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http'; 

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
/*import {NoopAnimationsModule} from '@angular/platform-browser/animations';*/
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatSliderModule} from '@angular/material/slider';
import {MatCardModule} from '@angular/material/card';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatTableModule} from '@angular/material/table';
import {MatSidenavModule} from '@angular/material/sidenav';





import { AppComponent } from './app.component';
import { HelloComponent } from './hello.component';
import { QuestionsGameComponent } from './game-setup/game-setup.component';
import { BodyLogoComponent } from './body-logo/body-logo/body-logo.component';
import { BodyContentComponent } from './body-content/body-content.component';
import { QuestionsService } from './services/questions.service';
import { QuestionGameInstanceService } from './services/question-game-instance.service';
import { MessagesComponent } from './messages/messages.component';
import { MessagesService } from './services/messages.service';
import { GamePlayComponent } from './game-play/game-play.component';
import { GameResultsComponent } from './game-results/game-results.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatListModule} from '@angular/material/list';
import {MatMenuModule} from '@angular/material/menu';


@NgModule({
  imports:      [ BrowserModule, FormsModule,ReactiveFormsModule,HttpClientModule,
  BrowserAnimationsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule,
    MatSliderModule,
    MatCardModule,
    MatSlideToggleModule,
    MatExpansionModule,
    MatTableModule,
    MatSidenavModule,
    MatToolbarModule,
    MatListModule,
    MatMenuModule
    
    ],
  declarations: [ AppComponent, HelloComponent, QuestionsGameComponent, MessagesComponent, GamePlayComponent, GameResultsComponent, BodyLogoComponent, BodyContentComponent ],
  bootstrap:    [ AppComponent ],
  providers: [QuestionGameInstanceService,QuestionsService, MessagesService]
})
export class AppModule { }













