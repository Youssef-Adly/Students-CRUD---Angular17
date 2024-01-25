import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { StudentsComponent } from '../students/students.component';
import { IStudent } from '../../Models/istudent';

@Component({
  selector: 'app-student',
  standalone: true,
  imports: [RouterModule, StudentsComponent],
  templateUrl: './student.component.html',
  styleUrl: './student.component.css',
})
export class StudentComponent {
  @Input() student: IStudent | undefined;
}
