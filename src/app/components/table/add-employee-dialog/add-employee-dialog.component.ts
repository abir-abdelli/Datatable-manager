import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { EmployeeDto } from 'src/app/DTOs/Employees';

@Component({
  selector: 'app-add-employee-dialog',
  templateUrl: './add-employee-dialog.component.html',
  styleUrls: ['./add-employee-dialog.component.scss'],
})
export class AddEmployeeDialogComponent implements OnInit {
  EmployeeForm: FormGroup = new FormGroup({});
  employee = new EmployeeDto();
  constructor(
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<AddEmployeeDialogComponent, EmployeeDto>
  ) {
    this.initializeForm();
  }

  ngOnInit(): void {}

  initializeForm() {
    this.EmployeeForm = this.formBuilder.group({
      id: [''],
      age: [''],
      dob: [''],
      email: [''],
      salary: [''],
      address: [''],
      lastName: [''],
      firstName: [''],
      contactNumber: [''],
      imageUrl: [''],
    });
  }
  onSubmit() {
    let id = Math.round(Math.random() * 10000);
    this.dialogRef.close({
      id: id,
      age: this.EmployeeForm.get('age')?.value,
      dob: this.EmployeeForm.get('dob')?.value,
      email: this.EmployeeForm.get('email')?.value,
      salary: this.EmployeeForm.get('salary')?.value,
      address: this.EmployeeForm.get('address')?.value,
      lastName: this.EmployeeForm.get('lastName')?.value,
      firstName: this.EmployeeForm.get('firstName')?.value,
      contactNumber: this.EmployeeForm.get('contactNumber')?.value,
      imageUrl: this.EmployeeForm.get('imageUrl')?.value,
    });
  }
}
