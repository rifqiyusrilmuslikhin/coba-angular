import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsComponent } from './products.component';
import { ProductsService } from './products.service';
import { HttpClientModule } from '@angular/common/http';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { ImageModule } from 'primeng/image';
import { DialogModule } from 'primeng/dialog';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { InputNumberModule } from 'primeng/inputnumber';
import { ConfirmationService, MessageService } from 'primeng/api';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    ProductsComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    TableModule,
    TagModule,
    InputTextModule,
    ButtonModule,
    ImageModule,
    DialogModule,
    ConfirmDialogModule,
    ToastModule,
    InputNumberModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    ProductsComponent
  ],
  providers: [
    ConfirmationService, MessageService
  ]
})
export class ProductsModule { }
