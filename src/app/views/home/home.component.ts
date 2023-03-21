import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTable } from '@angular/material/table';
import { ElementDialogComponent } from 'src/app/shared/element-dialog/element-dialog.component';

export interface PeriodicElement {
  firstName: string;
  position: number;
  lastName: string;
  dateOfBirth: string;
  phoneNumber: string;
  email: string;
  bankAccountNumber: number;
}

const ELEMENT_DATA: PeriodicElement[] = [
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
  dataSource = ELEMENT_DATA;

  constructor(public dialog: MatDialog) {}

  openForm(element: PeriodicElement | null): void {
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
          : element,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result !== undefined) {
        this.dataSource.push(result);
        this.table.renderRows();
      }
    });
  }
}
