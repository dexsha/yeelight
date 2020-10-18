import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'devices',
    component: TabsPage,
    children: [
      {
        path: 'index',
        loadChildren: () => import('../pages/devices/devices.module').then(m => m.DevicesPageModule)
      },
      {
        path: '',
        redirectTo: '/devices/index',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/devices/index',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsPageRoutingModule {}
