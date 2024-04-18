import { Component, Inject } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { CommonService } from 'src/app/service/common.service';
import { UserFormComponent } from '../user-form/user-form.component';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent {
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
    this.dialogRef.close(this.formData.value);
  }
}
