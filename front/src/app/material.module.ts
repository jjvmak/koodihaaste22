import { NgModule } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  exports: [
    MatFormFieldModule,
    MatInputModule,
    MatExpansionModule,
    MatButtonModule,
  ],
})
export class MaterialModule {}
