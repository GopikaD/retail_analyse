import { FilterPipe } from './filter.pipe';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DisplayTableComponent } from './display-table/display-table.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { PieChartComponent } from './pie-chart/pie-chart.component';
import { HigherChartService } from './higher-chart.service';
import { ShelfBarGraphComponent } from './shelf-bar-graph/shelf-bar-graph.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  declarations: [
    AppComponent,
    DisplayTableComponent,
    PieChartComponent,
    ShelfBarGraphComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    Ng2SearchPipeModule,
    NgxChartsModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    NgbModule.forRoot()
  ],
  exports: [
  ],
  providers: [HigherChartService],
  bootstrap: [AppComponent]
})
export class AppModule { }
