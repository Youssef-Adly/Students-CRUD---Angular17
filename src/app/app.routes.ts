import { Routes } from '@angular/router';
import { StudentsComponent } from './Components/students/students.component';
import { StudentDetailsComponent } from './Components/student-details/student-details.component';
import { StudentUpdateComponent } from './Components/student-update/student-update.component';
import { StudentAddComponent } from './Components/student-add/student-add.component';
import { ErrorComponent } from './Components/error/error.component';

export const routes: Routes = [
  { path: '', redirectTo: 'students', pathMatch: 'full' },
  { path: 'students', component: StudentsComponent },
  { path: 'students/add', component: StudentAddComponent },
  { path: 'students/update/:id', component: StudentUpdateComponent },
  { path: 'students/:id', component: StudentDetailsComponent },
  { path: '**', component: ErrorComponent },
];
