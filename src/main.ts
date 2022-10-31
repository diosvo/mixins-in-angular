import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { enableProdMode, importProvidersFrom } from '@angular/core';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { ReactiveFormsModule } from '@angular/forms';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideRouter } from '@angular/router';
import { environment } from '@env/environment';
import { LoadingService } from '@lib/services/loading/loading.service';
import { APP_ROUTES } from './app/app-routing.module';
import { AppComponent } from './app/app.component';
import { MonitorInterceptor } from './app/interceptors/monitor.interceptor';

if (environment.production) {
  enableProdMode();
}

bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom([
      HttpClientModule,
      AngularFireModule.initializeApp(environment.firebase),
      AngularFirestoreModule,

      MatSnackBarModule,
      ReactiveFormsModule,
    ]),
    provideAnimations(),
    provideRouter(APP_ROUTES),
    {
      provide: HTTP_INTERCEPTORS,
      useClass: MonitorInterceptor,
      multi: true
    },
    {
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
      useValue: { appearance: 'outline', floatLabel: 'never' }
    },
    LoadingService,
  ],
}).catch((err) => console.error(err));
