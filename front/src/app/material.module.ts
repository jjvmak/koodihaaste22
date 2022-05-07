import { NgModule } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';

@NgModule({
  exports: [
    MatFormFieldModule,
    MatInputModule,
    MatExpansionModule,
    MatButtonModule,
    MatDividerModule,
  ],
})
export class MaterialModule {}
