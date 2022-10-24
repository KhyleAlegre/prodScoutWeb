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
//Dashboard - Parent

// Parent Routes / Main Routes
const routes: Routes = [
  // Set global redirection to default route
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  { path: 'home', component: ChromelandingComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'myprofile', component: MyprofileComponent },
  { path: 'watcher', component: WatcherComponent },
  { path: 'event-watcher', component: EventwatcherComponent },
  { path: 'profiles', component: ManageprofilesComponent },
  { path: 'blacklist', component: BlacklistComponent },
  { path: 'logs', component: LgosComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
