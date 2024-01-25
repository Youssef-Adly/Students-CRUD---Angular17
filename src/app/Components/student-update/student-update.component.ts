import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { HttpService } from '../../Services/http.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-student-update',
  standalone: true,
  imports: [ReactiveFormsModule, RouterModule, HttpClientModule, CommonModule],
  providers: [HttpService],
  templateUrl: './student-update.component.html',
  styleUrl: './student-update.component.css',
})
export class StudentUpdateComponent implements OnInit {
  @ViewChild('update') update: any;
  @ViewChild('delete') delete: any;
  constructor(
    private activatedRoute: ActivatedRoute,
    private http: HttpService,
    private router: Router
  ) {}
  // On Init
  student: any;
  id: any;
  ngOnInit() {
    this.id = this.activatedRoute.snapshot.params['id'];
    // console.log('this.id: ', this.id);
    this.http.getAllStudentByID(this.id).subscribe({
      next: (std) => {
        this.student = std;
        this.updateForm.patchValue({
          id: this.id,
          name: this.student.name,
          age: this.student.age,
          email: this.student.email,
          phone: this.student.phone,
        });
      },
      error: (err) => console.log(err),
    });
  }
  /////// Form
  updateForm = new FormGroup({
    id: new FormControl(``, Validators.required),
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

  get idValid() {
    return this.updateForm.controls.id.valid;
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

  updating = false;

  loading =
    '<div class="d-flex justify-content-center align-items-center">  <div class="spinner-grow text-dark spinner-border-lg" role="status">  </div><span class="ms-3">Updating...</span> ';

  updateStudent(event: any) {
    this.updating = true;
    event.target.disabled = true;
    event.target.innerHTML = this.loading;
    event.target.nextElementSibling.disabled = true;
    this.http.updateStudent(this.id, this.formValues);
    setTimeout(() => {
      this.router.navigateByUrl('/students');
    }, 500);
  }
  deleteStudent(event: any) {
    this.updating = true;
    this.http.deleteStudent(this.id);
    event.target.disabled = true;
    event.target.innerHTML = this.loading;
    this.update.nativeElement.disabled = true;
    setTimeout(() => {
      this.router.navigateByUrl('/students');
    }, 500);
  }
}
