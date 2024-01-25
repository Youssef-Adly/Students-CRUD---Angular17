import { Component, OnInit, ViewChild } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { HttpService } from '../../Services/http.service';
import { HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-student-add',
  standalone: true,
  imports: [ReactiveFormsModule, HttpClientModule, CommonModule],
  providers: [HttpService],
  templateUrl: './student-add.component.html',
  styleUrl: './student-add.component.css',
})
export class StudentAddComponent implements OnInit {
  constructor(private http: HttpService, private router: Router) {}
  @ViewChild('submit') submit: any;
  id: number = 0;
  ngOnInit() {
    this.http.getAllStudents().subscribe({
      next: (data: any) => {
        this.id = data.length;
      },
    });
  }
  updateForm = new FormGroup({
    id: new FormControl(`${this.id}`, Validators.required),
    name: new FormControl('', [
      Validators.required,
      Validators.pattern('^[a-zA-Z]{3,} ?[a-zA-Z]*$'),
    ]),
    age: new FormControl('', [
      Validators.required,
      Validators.min(20),
      Validators.max(40),
      Validators.pattern('^[0-9]*$'),
    ]),
    email: new FormControl('', [Validators.required, Validators.email]),
    phone: new FormControl('', [
      Validators.required,
      Validators.pattern('[0-9]{6,}'),
    ]),
  });

  get formValid() {
    return this.updateForm.valid;
  }

  get formValues() {
    return this.updateForm.value;
  }

  get name() {
    return this.updateForm.controls.name;
  }
  get age() {
    return this.updateForm.controls.age;
  }
  get email() {
    return this.updateForm.controls.email;
  }
  get phone() {
    return this.updateForm.controls.phone;
  }

  posting = false;

  addStudent() {
    if (this.formValid) {
      this.submit.nativeElement.disable = true;
      this.submit.nativeElement.innerHTML =
        '<div class="d-flex justify-content-center align-items-center">  <div class="spinner-grow text-dark spinner-border-lg" role="status">  </div><span class="ms-3">Adding...</span> ';
      ////////////////////
      // submiting form and adding student
      this.updateForm.value.id = `${++this.id}`;
      this.http.addNewStudent(this.formValues);
      /////////////////////
      // disable form
      this.posting = true;
      /////////////////////
      setTimeout(() => {
        this.router.navigateByUrl('students');
        this.posting = false;
      }, 500);
    }
  }
}
