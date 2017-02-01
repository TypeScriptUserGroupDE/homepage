import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpModule, Http, RequestOptions} from '@angular/http';
import {JwtHelper, AuthHttp, AuthConfig} from 'angular2-jwt';
import {AgmCoreModule} from 'angular2-google-maps/core';
import {AlertModule, ModalModule, TypeaheadModule} from 'ng2-bootstrap';
import {FileUploadModule} from 'ng2-file-upload';
import {Ng2PaginationModule} from 'ng2-pagination';
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
import {
  UserAddResolver, SingleUserResolver, SearchResolver,
  SingleTrainingResolver, TrainingAddResolver
} from "./services/resolver/resolver.service";
import {AuthService} from "./services/auth/auth.service";
import {SearchComponent} from "./routes/search/search.component";
import {DistancePipe} from "./pipes/distance.pipe";
import {UserService} from "./services/user/user.service";
import {TrainingsListComponent} from './routes/trainings/list/list.trainings.component';
import {TrainingsAddComponent} from './routes/trainings/add/add.component';
import {TrainingsService} from "./services/trainings/trainings.service";
import {TrainingsSingleComponent} from './routes/trainings/single/single.component';
import {filterTrainingsByTec} from "./pipes/filterTraining.pipe";
import {TrainingsMapComponent} from "./routes/trainings/map/map.component";
import {DeleteTrainingModalComponent} from "./routes/trainings/delete-trainings-modal/delete-training-modal.component";
import {SeoService} from "./services/seo/seo.service";

export function authHttpServiceFactory(http: Http, options: RequestOptions) {
  return new AuthHttp(new AuthConfig({
    tokenName: 'token',
    headerName: 'x-access-token',
    headerPrefix: '',
    noTokenScheme: true,
    tokenGetter: (() => localStorage.getItem('token')),
    globalHeaders: [{'Content-Type': 'application/json'}],
  }), http, options);
}

@NgModule({
  imports: [
    BrowserModule,
    routing,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    AlertModule.forRoot(),
    AgmCoreModule.forRoot({apiKey: AppConfig.google_maps_api_key}),
    ModalModule,
    FileUploadModule,
    Ng2PaginationModule,
    ModalModule.forRoot(),
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
    DeleteTrainingModalComponent,
    UserMessageComponent,
    CallbackComponent,
    TecPipe,
    KeysPipe,
    filterTecPipe,
    filterTrainingsByTec,
    DistancePipe,
    LinkyPipe,
    TrainingsListComponent,
    TrainingsAddComponent,
    TrainingsMapComponent,
    TrainingsSingleComponent
  ],
  providers: [
    AuthService,
    UserService,
    TrainingsService,
    SeoService,
    SingleUserResolver,
    UserAddResolver,
    SingleTrainingResolver,
    TrainingAddResolver,
    SearchResolver,
    JwtHelper,
    {
      provide: AuthHttp,
      useFactory: authHttpServiceFactory,
      deps: [Http, RequestOptions]
    },
  ],
  bootstrap: [AppComponent]
})

export class AppModule {
}
