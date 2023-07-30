import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { HomeModule } from './home/home.module';
import { NavbarModule } from './navbar/navbar.module';
import { NotFoundPageComponent } from './not-found-page/not-found-page.component';
import { NotFoundPageModule } from './not-found-page/not-found-page.module';
import { OrdersComponent } from './orders/orders.component';
import { OrdersModule } from './orders/orders.module';
import { ProductsComponent } from './products/products.component';
import { ProductsModule } from './products/products.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ProductsModule,
    HomeModule,
    OrdersModule,
    NotFoundPageModule,
    NavbarModule,
    RouterModule.forRoot([
      {path: '', component: HomeComponent},
      {path: 'products', component: ProductsComponent},
      {path: 'orders', component: OrdersComponent},
      {path: '', redirectTo: '', pathMatch: 'full'},
      {path: '**', component: NotFoundPageComponent}
    ]),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
