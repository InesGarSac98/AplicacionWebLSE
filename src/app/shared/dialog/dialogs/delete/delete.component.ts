import { Component, Inject, Input, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ClassroomListComponent, IClassroomList } from 'src/app/pages/teachers/classroom-list/classroom-list.component';

@Component({
    selector: 'app-delete',
    templateUrl: './delete.component.html',
    styleUrls: ['./delete.component.scss']
})
export class DeleteComponent implements OnInit {
    constructor(private router: Router,
        public dialogRef: MatDialogRef<DeleteComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any
    ) { }

    public ngOnInit() {
    }

    public accept() {
        this.dialogRef.close(true);
    }

    public close() {
        this.dialogRef.close(false);
    }
}
