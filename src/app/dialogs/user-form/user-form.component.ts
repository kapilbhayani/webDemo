import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { CommonService } from 'src/app/service/common.service';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnInit {
  formData !: FormGroup
  selectedFileName: string = '';
  
  // private dialogRef!: MatDialogRef<UserFormComponent>
  constructor(private fb: FormBuilder, private service: CommonService, private route: Router, 
    public dialogRef: MatDialogRef<UserFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }


  ngOnInit(): void {
    this.formData = this.fb.group({
      name: [''],
      email: [''],
      number: [''],
      city: [''],
      position: [''],
      image: [''] // For file input
    });
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      this.selectedFileName = file.name;
      this.formData.get('image')?.setValue(this.selectedFileName);
    }
  }

  submitData() {
    // let userInfo = {
    //   Name: this.formData.value.name,
    //   Email: this.formData.value.email,
    //   Number: this.formData.value.number,
    //   City: this.formData.value.city,
    //   Position: this.formData.value.position,
    //   Image: this.selectedFileName

    // }
    console.log(this.formData.value);
    
    this.dialogRef.close(this.formData.value);
  }


}
