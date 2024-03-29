
import { BrowserModule } from '@angular/platform-browser';
import { LOCALE_ID, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { AppRoutes } from './app.routing';
import { AppComponent } from './app.component';
import localeEs from '@angular/common/locales/es'
import { registerLocaleData } from '@angular/common';
registerLocaleData(localeEs, 'es');

import { FlexLayoutModule } from '@angular/flex-layout';
import { FullComponent } from './layouts/full/full.component';
import { AppHeaderComponent } from './layouts/full/header/header.component';
import { AppSidebarComponent } from './layouts/full/sidebar/sidebar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DemoMaterialModule } from './demo-material-module';
import { SharedModule } from './shared/shared.module';
import { SpinnerComponent } from './shared/spinner.component';
import { AuthModule } from './pages/auth/auth.module';
import { MatDialogModule } from '@angular/material/dialog';
import { DialogsComponent } from './shared/dialog/dialogs/dialogs.component';
import { MatButtonModule } from '@angular/material/button';
import { DeleteComponent } from './shared/dialog/dialogs/delete/delete.component';


@NgModule({
    declarations: [
        AppComponent,
        FullComponent,
        AppHeaderComponent,
        SpinnerComponent,
        AppSidebarComponent,
        DialogsComponent,
        DeleteComponent,
    ],
    entryComponents:[DialogsComponent],
    imports: [
        CommonModule,
        BrowserModule,
        BrowserAnimationsModule,
        DemoMaterialModule,
        FormsModule,
        FlexLayoutModule,
        HttpClientModule,
        SharedModule,
        AuthModule,
        MatDialogModule,
        MatButtonModule,
        RouterModule.forRoot(AppRoutes)
    ],
    providers: [
        {
            //provide: LocationStrategy,
            useClass: PathLocationStrategy,
            provide: LOCALE_ID, useValue: 'es'
        }
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
