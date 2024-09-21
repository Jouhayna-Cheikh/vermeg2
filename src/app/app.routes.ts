import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './modules/auth/services/auth.guard';
export const routes: Routes = [
    {
        path: '',
       // canActivate: [AuthGuard],
        loadChildren: () =>
          import('./pages/layout/layout.module').then((m) => m.LayouttModule),
      },
      {
        //canActivate: [AuthGuard],
        path: 'question',
        loadChildren: () =>
          import('./modules/question/question.module').then((m) => m.QuestionModule),
      },
      
];



@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
  export class AppRoutingModule { }