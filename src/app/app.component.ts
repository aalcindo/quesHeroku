
import {MediaMatcher} from '@angular/cdk/layout';
import {ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {OverlayContainer} from "@angular/cdk/overlay"

interface SideNavSelection{
  name:string;
  items:SideNavItem[];
}
interface SideNavItem{
  name:string
  description:string;
  icon:string;
}

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent implements OnDestroy,OnInit{
  name = 'Would You Rather Game'; 
  
  SIDENAVSELECTIONS:SideNavSelection[]=[
    {name:"Game Modes",items:[
      {name:"Local Multiplayer",description:"2-8 players",icon:"people"},
      {name:"Online",description:"create party",icon:"transfer_within_a_station"}
    ]},

    {name:"Settings",items:[
      {name:"Change Name",description:"pick something cool",icon:"note"}
    ]}
  ]
  
  readonly DEFAULTTHEME="my-light-theme";
  themeClass:string;
  mobileQuery: MediaQueryList;
  private _mobileQueryListener: () => void;


  constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher,private overlayContainer:OverlayContainer){
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngOnInit(): void {
    this.themeClass = this.DEFAULTTHEME;
    this.updateThemeForOverlays(this.themeClass);
    
  }

  updateThemeForOverlays(theme:string){//such as the one from select
    // remove old theme class and add new theme class
    // we're removing any css class that contains '-theme' string but your theme classes can follow any pattern
    const overlayContainerClasses = this.overlayContainer.getContainerElement().classList;
    /* it looks like i don't need to remove old classes because adding a class only keeps one
    const themeClassesToRemove = Array.from(overlayContainerClasses).filter((item: string) => item.includes('-theme'));
    if (themeClassesToRemove.length>0) {
       overlayContainerClasses.remove(...themeClassesToRemove);
    }*/
    overlayContainerClasses.add(theme);
  }
  

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  onChangeTheme(theme:string):void{
    this.themeClass=theme;
    this.updateThemeForOverlays(theme);

    
  }
}

  



