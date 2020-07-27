import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http'; 
import { AuthenticationService, TokenPayload } from '../authentication.service';

@Component({
  selector: 'papers',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers:[AuthenticationService]
})
export class HomeComponent implements OnInit {
  paperTitle: string = ''
  li:any; 
  papers=[];
  startDate: Date;
  endingDate: Date;

  constructor(public auth: AuthenticationService,private http : HttpClient) { }

  ngOnInit(): void {
    let token = this.auth.getToken()
    console.log(token)
    if(this.auth.isLoggedIn){
      this.http.get('http://localhost:3000/v1/datasets',{ headers: { Authorization: `Bearer ${token}`}}) 
      .subscribe(Response => { 
        // console.log(Response) 
        this.li = Response
        this.papers = this.li.data
        
        console.log(this.papers);

      }); 
    }
  }
  paperSearch() {
    let token = this.auth.getToken()
    console.log(this.paperTitle);
    
    if(this.auth.isLoggedIn && this.paperTitle){
      this.http.get(`http://localhost:3000/v1/datasets/${this.paperTitle}`,{ headers: { Authorization: `Bearer ${token}`}}) 
      .subscribe(Response => { 
        // console.log(Response) 
        this.li = Response
        this.papers = this.li.data
        console.log(this.papers);
      }); 
    }
    if(this.auth.isLoggedIn && this.startDate && this.endingDate){
      console.log(this.startDate);
      console.log(this.endingDate)
      this.http.get(`http://localhost:3000/v1/datasets/${this.startDate}/${this.endingDate}`,{ headers: { Authorization: `Bearer ${token}`}}) 
      .subscribe(Response => { 
        // console.log(Response) 
        this.li = Response
        this.papers = this.li.data
        console.log(this.papers);
      }); 
    }
  }
  
}
