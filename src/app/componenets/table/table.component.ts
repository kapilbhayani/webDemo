import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { CommonService } from 'src/app/service/common.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { UserFormComponent } from 'src/app/dialogs/user-form/user-form.component';
import { EditUserComponent } from 'src/app/dialogs/edit-user/edit-user.component';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {
  getUserData: any;
  displayedColumns: string[] = ['id', 'name', 'email', 'number', 'city', 'position', 'image', 'edit', 'delete'];
  dataSource: MatTableDataSource<any>;
  imageUrl: any;


  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private service: CommonService, public dialog: MatDialog) {
    this.dataSource = new MatTableDataSource();
  }

  ngOnInit() {
    this.service.getUserData().subscribe((res: any) => {
      this.imageUrl = `assets/images/${res.image}`;
      this.dataSource.data = res; // Set data to MatTableDataSource
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  deleteUser(id: any) {
    this.service.deleteUser(id).subscribe((res: any) => {
      this.dataSource.data = res;
    })
  }

  editUser(user: any) {
    console.log(user);
    
    const dialogRef = this.dialog.open(EditUserComponent, {
      width: '1000px',
      height: '400px',
      panelClass: 'custom-dialog',
      data: user // Pass the user data to the dialog
    });

    dialogRef.afterOpened().subscribe(() => {
      history.pushState(null, '', `/userList/EditUser/${user.id}`);

    });

    // After the dialog is closed, you can handle the result or any other action
    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      history.pushState(null, '', `/userList`);

      let x = {
        id: user.id,
        email: result.email,
        name: result.name,
        number: result.number,
        city: result.city,
        position: result.position,
        image: result.image
    }
      
      if (result) {
        this.service.editUser(user.id, x).subscribe((res: any) => {
          this.dataSource.data = res;
        })
      }
    });
  }

  addNewUser() {
    const dialogRef = this.dialog.open(UserFormComponent, {
      width: '1000px',
      height: '400px',
      panelClass: 'custom-dialog',

    });

    dialogRef.afterOpened().subscribe(() => {
      history.pushState(null, '', '/userList/newUser');

    });

    // After the dialog is closed, you can handle the result or any other action
    dialogRef.afterClosed().subscribe(result => {
    history.pushState(null, '', '/userList');

      if (result) {
        this.service.postUserData(result).subscribe((res: any) => {
          this.dataSource.data = res;
        })
      }
    });
  }




}
