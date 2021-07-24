import { Component, OnInit } from '@angular/core';
import { Post, PostHeader } from '../../model/post';
import { PostsService } from '../../services/posts.service';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss']
})
export class PostListComponent implements OnInit {

  public posts: Post[] = [];

  constructor(public postsService: PostsService) {}

  async ngOnInit() {
    const headers = await this.postsService.posts();

    this.posts = await Promise.all(
      headers.map(async header => await this.postsService.post(header.id))
        .filter(post => post)
    ) as Post[];

    console.log('mah posts', this.posts);
  }

  async fetchPost(header: PostHeader): Promise<Post | undefined> {
    return this.postsService.post(header.id);
  }

}
