import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  constructor(public http:HttpClient) { 
  }
  public getTopHeadlines (country="us", page=1) {
    let news = "https://newsapi.org/v2/everything?q=games&page=${this.page}&apiKey=4976c948061a491fbb8dd1a2dcf885c0";
    return this.http.get(news);
  }
}
