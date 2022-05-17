import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';

import { HomeComponent } from './home.component';
import { MatListModule } from '@angular/material/list';
import { CardStudentsComponent } from './components/card-students/card-students.component';
import { CardClassComponent } from './components/card-class/card-class.component';
import { MatCardModule } from '@angular/material/card';

@NgModule({
  declarations: [HomeComponent, CardStudentsComponent, CardClassComponent],
  imports: [
    CommonModule,
    RouterModule,
    MatSidenavModule,
    MatIconModule,
    MatCardModule,
    MatListModule,
  ],
})
export class HomeModule {}
