import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { FakeBackendProvider } from '@backend/api/fake-be';
import { UnsavedChangesDialogModule } from '@lib/components/unsaved-changes-dialog/unsaved-changes-dialog.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterModule } from './home/components/footer/footer.module';
import { ToolbarModule } from './home/components/toolbar/toolbar.module';
import { MonitorInterceptor } from './interceptors/monitor.interceptor';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,

    RouterModule,
    AppRoutingModule,
    HttpClientModule,

    FooterModule,
    ToolbarModule,
    MatSnackBarModule,
    UnsavedChangesDialogModule
  ],
  providers: [
    FakeBackendProvider,
    {
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
      useValue: { appearance: 'outline', floatLabel: 'never' }
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: MonitorInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
