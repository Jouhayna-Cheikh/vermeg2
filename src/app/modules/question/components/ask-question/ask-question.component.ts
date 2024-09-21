import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { questionService } from '../../service/question.service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-ask-question',
  templateUrl: './ask-question.component.html',
  styleUrls: ['./ask-question.component.scss']
})
export class AskQuestionComponent implements OnInit {
  askQuestionForm!: FormGroup;
  userName : string | undefined ;
  constructor(private router: Router ,private route: ActivatedRoute, private service: questionService) {
    this.userName = this.getUserNameFromLocalStorage();
   }

  ngOnInit(): void {
    this.askQuestionForm = new FormGroup({
      content: new FormControl('', [Validators.required]),
      titre: new FormControl('', [Validators.required]),
      keywords: new FormControl('', [Validators.required]),
    });
  }

  addQuestion() {
    const keywordString = this.askQuestionForm.value.keywords;
    const keywords = this.extractKeywords(keywordString);

    // Call your service and pass the keywords
    this.service.askQuestion({ ...this.askQuestionForm.value, keywords }).subscribe((res: any) => {
      console.log(res);

      Swal.fire({
        title: 'Success',
        text: 'Question submitted successfully!',
        icon: 'success',
        confirmButtonText: 'OK'
      }).then(() => {
        // Navigate to the desired URL
        this.router.navigate(['/question/all-questions']);

        // Reset the form
        this.askQuestionForm.reset();
      });
    });
  }

  extractKeywords(keywordString: string): string[] {
    // Remove leading and trailing whitespaces
    keywordString = keywordString.trim();

    // Split the string into an array of keywords using comma as the separator
    const keywords = keywordString.split(",");

    // Remove any leading or trailing whitespaces from individual keywords
    const trimmedKeywords = keywords.map(keyword => keyword.trim());

    return trimmedKeywords;
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
