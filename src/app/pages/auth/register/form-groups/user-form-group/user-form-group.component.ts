import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
    selector: 'app-user-form-group',
    templateUrl: './user-form-group.component.html',
    styleUrls: ['./user-form-group.component.scss']
})
export class UserFormGroupComponent implements OnInit {

    @Input() public formGroup: FormGroup;
    @Input() public emailLabel: string;
    @Input() public emailPlaceholder: string;
    public hide = true;

    constructor() { }

    public get userFormGroup(): FormGroup {
        return (this.formGroup.controls.user as FormGroup);
    }

    public ngOnInit() {
        setTimeout(()=> console.log(this.userFormGroup.controls), 3000);

        setTimeout(()=> console.log(this.formGroup.get('user.name')), 5000);
    }


}
