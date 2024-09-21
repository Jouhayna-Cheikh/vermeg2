import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {ActivatedRoute} from '@angular/router';
//import {questionService} from 'src/app/modules/question/service/question.service';
import Swal from 'sweetalert2';
import { questionService } from '../../service/question.service';

@Component({
  selector: 'app-question-details',
  templateUrl: './question-details.component.html',
  styleUrls: ['./question-details.component.scss']
})
export class QuestionDetailsComponent implements OnInit {
  answerForm!: FormGroup;
  question: any;
  time: any;
  questionId : any ;
  userName : string | undefined ;
  constructor(private route: ActivatedRoute, private service: questionService) {
    this.questionId = this.route.snapshot.paramMap.get('id');
     this.userName = this.getUserNameFromLocalStorage();

  }

  ngOnInit(): void {
    this.answerForm = new FormGroup({
      content: new FormControl('', [Validators.required]),
    });
    this.service.findById(this.questionId).subscribe(data => {
      this.question = data;
      this.timeAsked(data)
      console.log(this.question);
    })

  }

  timeAsked(quest: any) {
    const givenDate: Date = new Date(quest.dateTime);

    const currentDate: Date = new Date();

    const differenceMs: number = currentDate.getTime() - givenDate.getTime();
    const differenceMinutes: number = Math.floor(differenceMs / (1000 * 60));

    const differenceHours: number = Math.floor(differenceMinutes / 60);
    const remainingMinutes: number = differenceMinutes % 60;

    return `${differenceHours} hours and ${remainingMinutes} minutes ago.`;
  }

  addAnswer(){
    this.service.addAnswer(this.answerForm.value, this.questionId).subscribe((res:any)=>{
      if(res){
        this.service.findById(this.questionId).subscribe(data => {
          Swal.fire({
            title: 'Success',
            text: 'Question submitted successfully!',
            icon: 'success',
            confirmButtonText: 'OK'
          }).then(() => {
            this.question = data;
            this.timeAsked(data)

            // Reset the form
            this.answerForm.reset();
          });

        })
      }
    })
  }
  logout(): void {
    // Clear the user data from localStorage
    localStorage.removeItem('currentUser');
    //this.route.navigate(['/auth/sign-in']);
  }

  getUserNameFromLocalStorage(){
    let currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    return currentUser?.username ;
  }

  getFirstLetter(userName: string): string {
    return userName ? userName.charAt(0).toUpperCase() : '';
  }

}
