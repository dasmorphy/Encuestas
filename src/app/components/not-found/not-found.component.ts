import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.css']
})
export class NotFoundComponent {

  constructor (private activedRoute: ActivatedRoute, private router: Router){}


  backHome(){
    this.router.navigate(['inicio']);
  }

}
