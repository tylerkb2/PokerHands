import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HandEvaluationService } from './services/hand-evaluation.service';
import { StraightHandEvaluationStrategy } from './strategies/straight-hand-evaluation.strategy';
import { XPairHandEvaluationStrategy } from './strategies/x-pair-hand-evaluation.strategy';
import { FlushHandEvaluationStrategy } from './strategies/flush-hand-evaluation.strategy';
import { StraightFlushHandEvaluationStrategy } from './strategies/straight-flush-hand-evaluation.strategy';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [
    HandEvaluationService,
    { provide: 'IHandEvaluationStrategy', useClass: StraightHandEvaluationStrategy, multi: true },
    { provide: 'IHandEvaluationStrategy', useClass: StraightFlushHandEvaluationStrategy, multi: true },
    { provide: 'IHandEvaluationStrategy', useClass: FlushHandEvaluationStrategy, multi: true },
    { provide: 'IHandEvaluationStrategy', useClass: XPairHandEvaluationStrategy, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
