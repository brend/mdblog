import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PostListComponent } from './components/post-list/post-list.component';
import { PostViewComponent } from './components/post-view/post-view.component';

const routes: Routes = [
  { path: '', component: PostListComponent },
  { path: 'post/:postId', component: PostViewComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
