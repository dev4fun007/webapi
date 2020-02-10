import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PlaybackComponent } from './playback/playback.component';


const routes: Routes = [
  {
    path: "",
    component: PlaybackComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
