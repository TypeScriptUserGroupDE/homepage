import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {JwtHelper, provideAuth, AuthHttp} from 'angular2-jwt';
import {provideLazyMapsAPILoaderConfig, AgmCoreModule} from 'angular2-google-maps/core';
import {AlertComponent, ModalModule, TypeaheadModule} from 'ng2-bootstrap/ng2-bootstrap';
import {MetaModule, MetaConfig, MetaService} from 'ng2-meta';
import {LinkyPipe} from 'angular2-linky';
import {AppConfig} from './config/app.config';
import {routing} from './app.routes';
import {AppComponent} from './app.component';
import {HomeComponent} from './routes/home/home.component';
import {HeaderComponent} from './partials/header/header.component';
import {ImprintComponent} from './routes/imprint/imprint.component';
import {ListComponent} from './routes/user/list/list.component';
import {LoginComponent} from './routes/login/login.component';
import {MapComponent} from './routes/user/map/map.component';
import {NavigationComponent} from './partials/navigation/navigation.component';
import {SingleComponent} from './routes/user/single/single.component';
import {UserAddComponent} from './routes/user/add/add.component';
import {DeleteUserModalComponent} from './routes/user/delete-user-modal/delete-user-modal.component';
import {UserMessageComponent} from './routes/user/message/message.component';
import {CallbackComponent} from './routes/callback/callback.component';
import {TecPipe} from './pipes/tec.pipe';
import {KeysPipe} from './pipes/keys.pipe';
import {filterTecPipe} from './pipes/search.pipe';
import {UserAddResolver, SingleUserResolver, SearchResolver} from "./services/resolver/resolver.service";
import {AuthService} from "./services/auth/auth.service";
import {SearchComponent} from "./routes/search/search.component";
import {DistancePipe} from "./pipes/distance.pipe";
import {UserService} from "./services/user/user.service";
import {TrainingsComponent} from './routes/trainings/trainings.component';
import {TrainingsAddComponent} from './routes/trainings/add/add.component';
import {TrainingsService} from "./services/trainings/trainings.service";
import {TrainingsSingleComponent} from './routes/trainings/single/single.component';

// global meta tag configuration, see https://github.com/vinaygopinath/ng2-meta
const metaConfig: MetaConfig = {
  useTitleSuffix: true,
  defaults: {
    title: 'TypeScript Entwickler-Verzeichnis',
    keywords: 'TypeScript Entwickler,TypeScript, Entwickler,JavaScript,AngularJS,Angular2,node.Js,Ionic,NativeScript,Entwicklerverzeichnis,User Group,Deutschland,Schweiz,Österreich',
    description: 'TypeScript UsersDE ist ein offenes Verzeichnis von TypeScript-Entwicklern in Deutschland. Unser Ziel ist es TypeScript-Entwickler untereinander zu vernetzen',
    titleSuffix: ' - TypeScript UsersDE',
  }
};

@NgModule({
  imports: [
    BrowserModule,
    routing,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    AgmCoreModule.forRoot(),
    MetaModule.forRoot(metaConfig),
    ModalModule,
    TypeaheadModule
  ],
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    ImprintComponent,
    ListComponent,
    SearchComponent,
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
    filterTecPipe,
    DistancePipe,
    LinkyPipe,
    TrainingsComponent,
    TrainingsAddComponent,
    TrainingsSingleComponent
  ],
  providers: [
    AuthService,
    UserService,
    TrainingsService,
    SingleUserResolver,
    UserAddResolver,
    SearchResolver,
    JwtHelper,
    MetaService,
    provideLazyMapsAPILoaderConfig({apiKey: AppConfig.google_maps_api_key}),
    AuthHttp,
    provideAuth({
      headerName: 'x-access-token',
      headerPrefix: '',
      noTokenScheme: true,
      tokenName: 'token',
      tokenGetter: () => localStorage.getItem('token')
    })
  ],
  bootstrap: [AppComponent]
})

export class AppModule {
}
