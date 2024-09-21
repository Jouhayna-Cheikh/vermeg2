import {HttpClient, HttpBackend} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {of} from 'rxjs';
import {catchError} from 'rxjs/operators';
//import {environment} from 'src/environments/environment';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class questionService {

  constructor(private http: HttpClient, private handler: HttpBackend) {

  }

  getAllQuestions() {
    return this.http.get(environment.apiUrl + '/question/AllQuestions')
      .pipe(catchError((err) => of(err)));
  }

  getQuestionsByDomain() {
    return this.http.get(`${environment.apiUrl}/question/by-domain`);
  }

  findById(id: any) {
    return this.http.get(`${environment.apiUrl}/question/${id}`);
  }

  addAnswer(content:any , id :any) {
    return this.http.post<any>(`${environment.apiUrl}/Response/AffectResponseToQuestion?questionId=${id}`, content).pipe(catchError((err)=>of(err)))
  }

  askQuestion(form:any){
    return this.http.post<any>(`${environment.apiUrl}/question/createQuestion`, form).pipe(catchError((err)=>of(err)))
  }

}
