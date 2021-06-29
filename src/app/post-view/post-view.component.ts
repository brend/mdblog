import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Post } from '../model/post';
import { PostsService } from '../services/posts.service';

@Component({
  selector: 'app-post-view',
  templateUrl: './post-view.component.html',
  styleUrls: ['./post-view.component.css']
})
export class PostViewComponent {

  public post: Observable<Post | undefined>;

  constructor(postsService: PostsService) { 
    this.post = postsService.selectedPost;
  }

}
