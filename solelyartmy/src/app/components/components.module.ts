import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { SlidesComponent } from './slides/slides.component';
import { StartComponent } from './start/start.component';

@NgModule({
declarations: [SlidesComponent, StartComponent],
exports: [SlidesComponent, StartComponent],
imports: [CommonModule, FormsModule, IonicModule]
})
export class ComponentsModule {}