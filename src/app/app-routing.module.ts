import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdduserComponent } from './components/adduser/adduser.component';
import { BooksComponent } from './components/books/books.component';
import { HomepageComponent } from './components/homepage/homepage.component';
import { LoginpageComponent } from './components/loginpage/loginpage.component';

const routes: Routes = [{ path: '', component: LoginpageComponent, pathMatch: 'full' },
{ path: 'login', component: LoginpageComponent },
{ path: 'homepage', component: HomepageComponent },
{ path: 'books', component: BooksComponent },
{ path: 'addUser', component: AdduserComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
