import { Component, OnInit } from '@angular/core';
import { Post } from './model/post';
import { PostsService } from './services/posts.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'MdBlog';
  posts: Post[] = [];

  constructor(private postsService: PostsService) {}

  async ngOnInit() {
    this.posts = await this.postsService.posts();
  }
}
