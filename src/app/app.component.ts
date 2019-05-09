import { Component, OnInit} from '@angular/core';
import { HttpClient } from '@angular/common/http'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  pages=[]

  constructor (private http:HttpClient){}

  ngOnInit(): void{
    /*this.http.get<any[]>('http://192.168.64.2/wp-json/wp/v2/pages/').subscribe(data=>{
      for(let key in data){
        if(data.hasOwnProperty(key)){
          this.pages.push(data[key]);
      }
    }
    console.log(this.pages);
    })*/
  }
}