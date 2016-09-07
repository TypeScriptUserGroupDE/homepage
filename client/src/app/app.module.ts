import {NgModule, provide, enableProdMode} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
import {Http, HttpModule} from '@angular/http';
import {AuthConfig, AuthHttp} from 'angular2-jwt';
import {provideLazyMapsAPILoaderConfig, AgmCoreModule} from 'angular2-google-maps/core';
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
import {JwtHelper} from 'angular2-jwt';

enableProdMode();

@NgModule({
  imports: [
    BrowserModule,
    routing,
    FormsModule,
    HttpModule,
    AgmCoreModule.forRoot()
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
    TecPipe,
    KeysPipe,
    SearchPipe
  ],
  providers: [
    AuthService,
    DataService,
    SingleUserResolver,
    UserAddResolver,
    JwtHelper,
    provideLazyMapsAPILoaderConfig({apiKey: AppConfig.google_maps_api_key}),
    provide(AuthHttp, {
      useFactory: (http: Http) => {
        return new AuthHttp(new AuthConfig({
          headerName: 'x-access-token',
          headerPrefix: '',
          noTokenScheme: true,
          tokenName: 'token'
        }), http);
      },
      deps: [Http]
    })],
  bootstrap: [AppComponent]
})

export class AppModule {
}
