import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { BookstoreService, Book } from 'src/app/services/bookstore.service';
import { books } from './books';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})
export class BooksComponent implements OnInit, OnDestroy {

  books = books;
  constructor(
    private storeServ: BookstoreService,
    private router: Router,
    private route: ActivatedRoute,
  ){
    this.route.queryParams.subscribe(params => {
       this.query = params['title'] || ''; 
    });
  }

  ngOnDestroy(): void {
    this.bookSub.unsubscribe();
  }
  query;
  bookSub = new Subscription();

  
  ngOnInit() {
    // this.storeServ.getBooks();
    // this.bookSub = this.storeServ.BooksChanged.subscribe(res => {
    //   this.books = res;
    //   console.log(this.books);
    // });
  }
  submit(query) {
    this.router.navigate(['books'],
     { queryParams: { title: query } })
     .then(_ => { this.search() });
  }
  search() {
    // if (!this.query) {
    //   return;
    // }
    this.storeServ.serachBooks(this.query);
  }
}
