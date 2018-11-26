import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TestsService {

  constructor(public http:HttpClient) { }

  getAllTestsCategories(){
    return this.http.get('https://mycare123.herokuapp.com/api/tests_categories')
  }
  getTestItems(id){
    return this.http.get(`https://mycare123.herokuapp.com/api/tests/${id}`)
  }
  submitTestItemResult(id,results){
    return this.http.patch(`https://mycare123.herokuapp.com/api/tests/${id}`,results)
  }
}
