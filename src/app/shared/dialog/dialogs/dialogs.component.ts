import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dialogs',
  templateUrl: './dialogs.component.html',
  styleUrls: ['./dialogs.component.scss']
})
export class DialogsComponent implements OnInit {

  constructor(private router: Router,
                public dialogRef: MatDialogRef<DialogsComponent>,
                @Inject (MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
  }

  public aceppt(){
      this.dialogRef.close();
      localStorage.removeItem('token');
      this.router.navigate(['/login']);
  }

  public close(){
    this.dialogRef.close();
}
}
