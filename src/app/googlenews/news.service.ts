import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  //private key = "4976c948061a491fbb8dd1a2dcf885c0";
  //private caminhoPadrao:string = "https://newsapi.org/v2";

  constructor(public http:HttpClient) { 
  }
  public getTopHeadlines (country="us") {
    let news = "https://newsapi.org/v2/top-headlines?country=us&category=science&apiKey=4976c948061a491fbb8dd1a2dcf885c0";
    return this.http.get(news);
  }
}
