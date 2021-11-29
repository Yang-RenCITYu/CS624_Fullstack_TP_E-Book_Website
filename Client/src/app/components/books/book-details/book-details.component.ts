import { Component, OnInit } from '@angular/core';
import { BookstoreService, Book } from 'src/app/services/bookstore.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.css']
})
export class BookDetailsComponent implements OnInit {

  id;

  // example data
  book = {
    _id: "01",
    bookTitle: "Halmet",
    authors: [ "William Shakespeare" ],
    imagePath: "../../assets/books/halmet.jpeg",
    bookCategory: "Drama",
    bookSize: 100,
    fileType: "pdf",
    publisher: "CS624 Publisher",
    ISBN: 12345,
    bookDescription: "Hamlet is melancholy, bitter, and cynical, full of hatred for his uncle's scheming and disgust for his mother's sexuality. A reflective and thoughtful young man who has studied at the University of Wittenberg, Hamlet is often indecisive and hesitant, but at other times prone to rash and impulsive acts."
  };
  modelOpen = false;
  isLogin = false;
  constructor(
    private bookStore: BookstoreService,
    private route: ActivatedRoute,
    private router: Router,
    private authServ: AuthService
  ) {
    this.route.params.subscribe(param => { this.id = param['id'] });
  }

  ngOnInit() {
    this.isLogin = this.authServ.isLogin;
  }

}
