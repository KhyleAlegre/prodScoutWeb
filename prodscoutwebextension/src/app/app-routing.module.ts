import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

//Landing
import { ChromelandingComponent } from './chromelanding/chromelanding.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { MyprofileComponent } from './library/myprofile/myprofile.component';
import { WatcherComponent } from './core/watcher/watcher.component';
import { EventwatcherComponent } from './core/watcher/eventwatcher/eventwatcher.component';
import { LgosComponent } from './library/lgos/lgos.component';
import { ManageprofilesComponent } from './library/manageprofiles/manageprofiles.component';
import { BlacklistComponent } from './library/blacklist/blacklist.component';
import { AdminComponent } from './authentication/admin/admin.component';
import { AdmindashboardComponent } from './core/admindashboard/admindashboard.component';
import { GalleryComponent } from './library/gallery/gallery.component';
import { AdminLogsComponent } from './core/admin-logs/admin-logs.component';
import { WatchlistComponent } from './library/watchlist/watchlist.component';
import { ProductsComponent } from './chromelanding/Sublinks/products/products.component';
import { FamiliesComponent } from './chromelanding/Sublinks/families/families.component';
import { SchoolsComponent } from './chromelanding/Sublinks/schools/schools.component';
//Dashboard - Parent

// Parent Routes / Main Routes
const routes: Routes = [
  // Set global redirection to default route
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  { path: 'home', component: ChromelandingComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'myprofile', component: MyprofileComponent },
  { path: 'watcher', component: WatcherComponent },
  { path: 'blocked', component: EventwatcherComponent },
  { path: 'profiles', component: ManageprofilesComponent },
  { path: 'blacklist', component: BlacklistComponent },
  { path: 'logs', component: LgosComponent },
  { path: 'rabbithole', component: AdminComponent },
  { path: 'admin', component: AdmindashboardComponent },
  { path: 'gallery', component: GalleryComponent },
  { path: 'adminLogs', component: AdminLogsComponent },
  { path: 'watchlist', component: WatchlistComponent },
  { path: 'products', component: ProductsComponent },
  { path: 'families', component: FamiliesComponent },
  { path: 'schools', component: SchoolsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
