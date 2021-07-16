import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PostsService } from 'src/app/services/posts.service';
import { Post } from '../../model/post';

@Component({
  selector: 'app-post-view',
  templateUrl: './post-view.component.html',
  styleUrls: ['./post-view.component.css']
})
export class PostViewComponent implements OnInit {

  @Input() public post: Post | undefined | null;

  @Input() public editable: boolean = true;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private posts: PostsService
  ) {}

  async ngOnInit() {
    // First get the product id from the current route.
    const routeParams = this.route.snapshot.paramMap;
    const postIdFromRoute = routeParams.get('postId');

    if (postIdFromRoute) {
      this.post = await this.posts.post(postIdFromRoute);
    }
  }

  edit() {
    if (this.post) {
      this.router.navigate(['/', 'edit', this.post.id]);
    }
  }

}
