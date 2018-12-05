/**
 * @name:         MET CS 701 - Term Project
 * @author:       Ritesh Gandhi        
 * @description:  Bootstrap UI Module
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { LayoutComponent } from './layout/layout.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { SearchComponent } from './search/search.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  declarations: [LayoutComponent, HeaderComponent, FooterComponent, SearchComponent],
  exports: [LayoutComponent]
})
export class AppuiModule { }
