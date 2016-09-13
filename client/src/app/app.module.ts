import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {JwtHelper, provideAuth, AuthHttp} from 'angular2-jwt';
import {provideLazyMapsAPILoaderConfig, AgmCoreModule} from 'angular2-google-maps/core';
import {AlertComponent, ModalModule} from 'ng2-bootstrap/ng2-bootstrap';
import {LinkyPipe} from 'angular2-linky';
import {AppConfig} from './config/app.config';
import {routing} from './app.routes';
import {AppComponent} from './app.component';
import {HomeComponent} from './routes/home/home.component';
import {HeaderComponent} from './routes/header/header.component';
import {ImprintComponent} from './routes/imprint/imprint.component';
import {ListComponent} from './routes/list/list.component';
import {LoginComponent} from './routes/login/login.component';
import {MapComponent} from './routes/map/map.component';
import {NavigationComponent} from './routes/navigation/navigation.component';
import {SingleComponent} from './routes/single/single.component';
import {UserAddComponent} from './routes/user/add/add.component';
import {DeleteUserModalComponent} from './routes/user/delete-user-modal/delete-user-modal.component';
import {UserMessageComponent} from './routes/user/message/message.component';
import {CallbackComponent} from './routes/callback/callback.component';
import {TecPipe} from './pipes/tec.pipe';
import {KeysPipe} from './pipes/keys.pipe';
import {SearchPipe} from './pipes/search.pipe';
import {UserAddResolver, SingleUserResolver} from "./services/resolver/resolver.service";
import {AuthService} from "./services/auth/auth.service";
import {DataService} from "./services/data/data.service";
// import {Observable}     from 'rxjs/Observable';
// import {throw}     from 'rxjs/Observable/throw';
// import {catch}     from 'rxjs/Operator/catch';



@NgModule({
  imports: [
    BrowserModule,
    routing,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    AgmCoreModule.forRoot(),
    ModalModule
  ],
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    ImprintComponent,
    ListComponent,
    LoginComponent,
    MapComponent,
    NavigationComponent,
    SingleComponent,
    UserAddComponent,
    DeleteUserModalComponent,
    UserMessageComponent,
    CallbackComponent,
    DeleteUserModalComponent,
    AlertComponent,
    TecPipe,
    KeysPipe,
    SearchPipe,
    LinkyPipe
  ],
  providers: [
    AuthService,
    DataService,
    SingleUserResolver,
    UserAddResolver,
    JwtHelper,
    provideLazyMapsAPILoaderConfig({apiKey: AppConfig.google_maps_api_key}),
    AuthHttp,
    provideAuth({
      headerName: 'x-access-token',
      headerPrefix: '',
      noTokenScheme: true,
      tokenName: 'token'
    })
  ],
  bootstrap: [AppComponent]
})

export class AppModule {
}
