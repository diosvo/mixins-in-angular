import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { CardItemModule } from '@home/components/card-item/card-item.component.module';
import { AlertModule } from '@lib/components/alert/alert.module';
import { CustomButtonModule } from '@lib/components/custom-button/custom-button.module';
import { CustomInputModule } from '@lib/components/custom-input/custom-input.module';
import { CustomSelectModule } from '@lib/components/custom-select/custom-select.module';
import { ComponentsUiRoutingModule } from './components-ui-routing.module';
import { ListComponentUiComponent } from './list-component-ui.component';

@NgModule({
  declarations: [
    ListComponentUiComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ComponentsUiRoutingModule,

    AlertModule,
    CardItemModule,
    CustomInputModule,
    CustomButtonModule,
    CustomSelectModule,

    MatTooltipModule,
    MatExpansionModule,
    MatProgressBarModule
  ]
})
export class ComponentsUiModule { }
