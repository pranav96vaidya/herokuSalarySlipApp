import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { INRCurrencyPipe } from './inrcurrency.pipe';
import { DataNotFoundComponent } from './data-not-found/data-not-found.component';
import { PageHeaderComponent } from './page-header/page-header.component';

@NgModule({
  declarations: [INRCurrencyPipe, DataNotFoundComponent, PageHeaderComponent],
  imports: [
    CommonModule
  ],
  exports: [INRCurrencyPipe, DataNotFoundComponent, PageHeaderComponent]
})
export class SharedModule { }
