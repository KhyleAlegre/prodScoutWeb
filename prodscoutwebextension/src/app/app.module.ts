import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';

//AngularFire
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { environment } from 'src/environments/environment';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';

//Components
import { ChromelandingComponent } from './chromelanding/chromelanding.component';
import { MegaMenuModule } from 'primeng/megamenu';
import { TopnavComponent } from './library/topnav/topnav.component';
//PrimeNG related
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { DividerModule } from 'primeng/divider';
import { RadioButtonModule } from 'primeng/radiobutton';
import { SlideMenuModule } from 'primeng/slidemenu';
import { CardModule } from 'primeng/card';
import { CalendarModule } from 'primeng/calendar';
import { MenubarModule } from 'primeng/menubar';
import { AccordionModule } from 'primeng/accordion';
import { PanelModule } from 'primeng/panel';
import { FieldsetModule } from 'primeng/fieldset';
import { SpeedDialModule } from 'primeng/speeddial';
import { SplitterModule } from 'primeng/splitter';
import { ImageModule } from 'primeng/image';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { FileUploadModule } from 'primeng/fileupload';
import { DropdownModule } from 'primeng/dropdown';
import { InputSwitchModule } from 'primeng/inputswitch';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { ProgressBarModule } from 'primeng/progressbar';

import { UppersectionComponent } from './chromelanding/Sections/uppersection/uppersection.component';
import { MidsectionComponent } from './chromelanding/Sections/midsection/midsection.component';
import { LowersectionComponent } from './chromelanding/Sections/lowersection/lowersection.component';
import { FooterComponent } from './chromelanding/Sections/footer/footer.component';
import { LoginComponent } from './authentication/login/login.component';
import { RegisterComponent } from './authentication/register/register.component';
import { AdminComponent } from './authentication/admin/admin.component';
import { MobilemenuComponent } from './components/mobilemenu/mobilemenu.component';
import { DemoformComponent } from './library/demoform/demoform.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { SidebarComponent } from './library/sidebar/sidebar.component';
import { DashtoolsComponent } from './library/dashtools/dashtools.component';
import { MobiletoolsComponent } from './library/mobiletools/mobiletools.component';
import { NewprofileComponent } from './library/newprofile/newprofile.component';
import { MyprofileComponent } from './library/myprofile/myprofile.component';
import { WatcherComponent } from './core/watcher/watcher.component';
import { EventwatcherComponent } from './core/watcher/eventwatcher/eventwatcher.component';
import { ProfilelogsComponent } from './library/profilelogs/profilelogs.component';

import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { BlacklistComponent } from './library/blacklist/blacklist.component';
import { LgosComponent } from './library/lgos/lgos.component';
import { ManageprofilesComponent } from './library/manageprofiles/manageprofiles.component';
import { AdmindashboardComponent } from './core/admindashboard/admindashboard.component';
import { ChangepwComponent } from './library/changepw/changepw.component';
import { GalleryComponent } from './library/gallery/gallery.component';
import { AdminLogsComponent } from './core/admin-logs/admin-logs.component';
import { WatchlistComponent } from './library/watchlist/watchlist.component';
import { ProductsComponent } from './chromelanding/Sublinks/products/products.component';
import { FamiliesComponent } from './chromelanding/Sublinks/families/families.component';
import { SchoolsComponent } from './chromelanding/Sublinks/schools/schools.component';

@NgModule({
  declarations: [
    AppComponent,
    ChromelandingComponent,
    TopnavComponent,
    UppersectionComponent,
    MidsectionComponent,
    LowersectionComponent,
    FooterComponent,
    LoginComponent,
    RegisterComponent,
    AdminComponent,
    MobilemenuComponent,
    DemoformComponent,
    DashboardComponent,
    SidebarComponent,
    DashtoolsComponent,
    MobiletoolsComponent,
    NewprofileComponent,
    MyprofileComponent,
    WatcherComponent,
    EventwatcherComponent,
    ProfilelogsComponent,
    BlacklistComponent,
    LgosComponent,
    ManageprofilesComponent,
    AdmindashboardComponent,
    ChangepwComponent,
    GalleryComponent,
    AdminLogsComponent,
    WatchlistComponent,
    ProductsComponent,
    FamiliesComponent,
    SchoolsComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ButtonModule,
    MegaMenuModule,
    DialogModule,
    InputTextModule,
    FormsModule,
    DividerModule,
    RadioButtonModule,
    SlideMenuModule,
    CardModule,
    CalendarModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    AngularFireAuthModule,
    MenubarModule,
    AccordionModule,
    PanelModule,
    FieldsetModule,
    SpeedDialModule,
    SplitterModule,
    ImageModule,
    OverlayPanelModule,
    AngularFireStorageModule,
    FileUploadModule,
    Ng2SearchPipeModule,
    DropdownModule,
    InputSwitchModule,
    ProgressSpinnerModule,
    ProgressBarModule,
  ],
  providers: [{ provide: LocationStrategy, useClass: HashLocationStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
