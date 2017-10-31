import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AngularFireModule } from 'angularfire2';
import { RouterModule } from '@angular/router';
import { SharedModule } from './shared/shared.module';
import { AdminModule } from './admin/admin.module';
import { ShoppingModule } from './shopping/shopping.module';
import { CoreModule } from './core/core.module';

import { environment } from '../environments/environment';

import { AppComponent } from './app.component';
import { ProductsComponent } from './shopping/components/products/products.component';


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    SharedModule,
    AdminModule,
    CoreModule,
    ShoppingModule,
    RouterModule.forRoot([
      {path: '', component: ProductsComponent},
    ]),
    AngularFireModule.initializeApp(environment.firebase),

  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
