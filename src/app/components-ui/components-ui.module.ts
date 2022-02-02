import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSelectModule } from '@angular/material/select';
import { MatTooltipModule } from '@angular/material/tooltip';
import { CardItemModule } from '@home/components/card-item/card-item.component.module';
import { AlertModule } from '@lib/components/alert/alert.module';
import { CustomSelectModule } from '@lib/components/custom-select/custom-select.module';
import { ComponentsUiRoutingModule } from './components-ui-routing.module';
import { ListComponentUiComponent } from './list-component-ui.component';

@NgModule({
  declarations: [
    ListComponentUiComponent
  ],
  imports: [
    CommonModule,
    ComponentsUiRoutingModule,
    ReactiveFormsModule,

    AlertModule,
    CardItemModule,
    CustomSelectModule,

    MatIconModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatTooltipModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatProgressBarModule
  ]
})
export class ComponentsUiModule { }
