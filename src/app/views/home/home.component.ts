import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTable } from '@angular/material/table';
import { ElementDialogComponent } from 'src/app/shared/element-dialog/element-dialog.component';

export interface Customer {
  firstName: string;
  position: number;
  lastName: string;
  dateOfBirth: string;
  phoneNumber: string;
  email: string;
  bankAccountNumber: number;
}

const CUSTOMER_DATA: Customer[] = [
  {
    position: 1,
    firstName: 'Andrea',
    lastName: 'Pacoal',
    dateOfBirth: '01/02/93',
    phoneNumber: '912734333',
    email: 'a.pascoal@gmail.com',
    bankAccountNumber: 345654123,
  },
  {
    position: 2,
    firstName: 'Augusto',
    lastName: 'Albertino',
    dateOfBirth: '04/05/94',
    phoneNumber: '912734111',
    email: 'a.albertino@gmail.com',
    bankAccountNumber: 245678129,
  },
  {
    position: 3,
    firstName: 'Matilde',
    lastName: 'Santos',
    dateOfBirth: '06/07/95',
    phoneNumber: '912734222',
    email: 'matilde.s@gmail.com',
    bankAccountNumber: 849099125,
  },
];

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  @ViewChild(MatTable)
  table!: MatTable<any>;
  displayedColumns: string[] = [
    'position',
    'firstName',
    'lastName',
    'dateOfBirth',
    'phoneNumber',
    'email',
    'bankAccountNumber',
    'actions',
  ];
  dataSource = CUSTOMER_DATA;

  constructor(public dialog: MatDialog) {}

  openForm(element: Customer | null): void {
    const dialogRef = this.dialog.open(ElementDialogComponent, {
      data:
        element === null
          ? {
              position: null,
              firstName: '',
              lastName: '',
              dateOfBirth: '',
              phoneNumber: '',
              email: '',
              bankAccountNumber: null,
            }
          : {
              position: element.position,
              firstName: element.firstName,
              lastName: element.lastName,
              dateOfBirth: element.dateOfBirth,
              phoneNumber: element.phoneNumber,
              email: element.email,
              bankAccountNumber: element.bankAccountNumber,
            },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result !== undefined) {
        if (this.dataSource.map((p) => p.position).includes(result.position)) {
          this.dataSource[result.position - 1] = result;
          this.table.renderRows();
        } else {
          this.dataSource.push(result);
          this.table.renderRows();
        }
      }
    });
  }

  editCustomer(element: Customer): void {
    this.openForm(element);
  }

  deleteCustomer(position: number): void {
    this.dataSource = this.dataSource.filter((p) => p.position !== position);
  }
}
