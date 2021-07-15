import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditComponent } from './components/edit/edit.component';
import { PostListComponent } from './components/post-list/post-list.component';
import { PostViewComponent } from './components/post-view/post-view.component';
import { WriteComponent } from './components/write/write.component';

const routes: Routes = [
  { path: '', component: PostListComponent },
  { path: 'post/:postId', component: PostViewComponent },
  { path: 'write', component: WriteComponent },
  { path: 'edit/:postId', component: EditComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
