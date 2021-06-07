import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from 'src/app/shared/material/material.module';

@NgModule({
  declarations: [],
  imports: [CommonModule, FlexLayoutModule, MaterialModule],
  exports: [CommonModule, FlexLayoutModule, MaterialModule],
})
export class CoreModule {}
