import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm, Validators } from '@angular/forms';
import { Post } from 'src/app/model/post';
import { CreateResult, PostsService } from 'src/app/services/posts.service';

@Component({
  selector: 'app-write',
  templateUrl: './write.component.html',
  styleUrls: ['./write.component.css']
})
export class WriteComponent implements OnInit {

  @ViewChild('templateForm') templateForm!: NgForm;

  createResult?: CreateResult;

  show =true;

  constructor(private posts: PostsService) { }

  ngOnInit(): void {
  }

  async onSubmit() {
    const post = this.templateForm.value;
    
    this.createResult = await this.posts.create(post.title, post.contents);
  }

}
