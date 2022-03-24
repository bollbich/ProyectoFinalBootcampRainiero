import {InputTextModule} from 'primeng/inputtext';
import {InputTextareaModule} from 'primeng/inputtextarea';
import {CalendarModule} from 'primeng/calendar';

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MenubarModule} from 'primeng/menubar';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import {FieldsetModule} from 'primeng/fieldset';
import {DialogModule} from 'primeng/dialog';
import {SplitterModule} from 'primeng/splitter';
import {TableModule} from 'primeng/table';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {DropdownModule} from 'primeng/dropdown';
//División vertical con flex
import {DividerModule} from 'primeng/divider';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import {MultiSelectModule} from 'primeng/multiselect';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ButtonModule,
    MenubarModule,
    FieldsetModule,
    InputTextModule,
    InputTextareaModule,
    CalendarModule,
    DialogModule,
    SplitterModule,
    CardModule,
    TableModule,
    BrowserAnimationsModule,
    DropdownModule,
    DividerModule,
    ScrollPanelModule,
    MultiSelectModule
  ],
  exports:[
    ButtonModule,
    MenubarModule,
    FieldsetModule,
    InputTextModule,
    InputTextareaModule,
    CalendarModule,
    DialogModule,
    SplitterModule,
    CardModule,
    TableModule,
    BrowserAnimationsModule,
    DropdownModule,
    DividerModule,
    ScrollPanelModule,
    MultiSelectModule
  ]
})
export class PrimeNgModule { }
