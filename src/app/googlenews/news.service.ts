import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  private key = "4976c948061a491fbb8dd1a2dcf885c0";
  private caminhoPadrao:string = "https://newsapi.org/v2";

  constructor(public http:HttpClient) { 
  }
  public getTopHeadlines (country="us", category="science", page = 1, resultsPerPage=20 ) {
    let news = `${this.caminhoPadrao}/top-headlines?country=${country}&category=${category}&pageSize=${resultsPerPage}&page=${page}&apiKey=${this.key}`;
    return this.http.get(news);
  }
}
