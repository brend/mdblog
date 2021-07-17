import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClient, HttpClientModule } from '@angular/common/http';

import { MarkdownModule } from 'ngx-markdown';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PostsService } from './services/posts.service';
import { PostListComponent } from './components/post-list/post-list.component';
import { PostViewComponent } from './components/post-view/post-view.component';
import { WriteComponent } from './components/write/write.component';
import { FormsModule } from '@angular/forms';
import { EditComponent } from './components/edit/edit.component';
import { FilenamevalidatorDirective } from './validators/filenamevalidator.directive';

@NgModule({
  declarations: [
    AppComponent,
    PostListComponent,
    PostViewComponent,
    WriteComponent,
    EditComponent,
    FilenamevalidatorDirective,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule,
    MarkdownModule.forRoot({loader: HttpClient}),
  ],
  providers: [PostsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
