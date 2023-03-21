import { Component, Inject, OnInit } from '@angular/core';
import { Customer } from 'src/app/views/home/home.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-customer-dialog',
  templateUrl: './customer-dialog.component.html',
  styleUrls: ['./customer-dialog.component.scss'],
})
export class CustomerDialogComponent {
  customer!: Customer;
  isChange!: boolean;

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: Customer,
    public dialogRef: MatDialogRef<CustomerDialogComponent>
  ) {}

  ngOnInit(): void {
    if (this.data.position != null) {
      this.isChange = true;
    } else {
      this.isChange = false;
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
