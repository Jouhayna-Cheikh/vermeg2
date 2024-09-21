import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { questionService } from '../../service/question.service';

@Component({
  selector: 'app-all-questions',
  templateUrl: './all-questions.component.html',
  styleUrls: ['./all-questions.component.scss']
})
export class AllQuestionsComponent implements OnInit {
    allquestion : any[]=[] ;
    userName : string | undefined ;
    questions: any = new Array<any>();
  constructor(private router: Router, private service: questionService) {
    this.userName = this.getUserNameFromLocalStorage();

  }

  ngOnInit(): void {
    // this.getAllQuestions();
    this.loadQuestionsByDomain();
  }

  getAllQuestions(){
    this.service.getAllQuestions().subscribe((res:any)=>{
      console.log(res);
      this.allquestion = res ;
    })
  }

  loadQuestionsByDomain() {
    this.service.getQuestionsByDomain().subscribe(data => {
      console.log(data);
      this.questions = data;
    })
  }

  timeSinceAsked(questionTime: any) {
    const givenDate: Date = new Date(questionTime);

    const currentDate: Date = new Date();

    const differenceMs: number = currentDate.getTime() - givenDate.getTime();
    const differenceMinutes: number = Math.floor(differenceMs / (1000 * 60));

    const differenceHours: number = Math.floor(differenceMinutes / 60);
    const remainingMinutes: number = differenceMinutes % 60;

    return `${differenceHours} hours and ${remainingMinutes} minutes ago.`;
  }

  logout(): void {
    // Clear the user data from localStorage
    localStorage.removeItem('currentUser');
    this.router.navigate(['/auth/sign-in']);
  }

  getUserNameFromLocalStorage(){
    let currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    return currentUser?.username ;
  }

  getFirstLetter(userName: string): string {
    return userName ? userName.charAt(0).toUpperCase() : '';
  }

}
