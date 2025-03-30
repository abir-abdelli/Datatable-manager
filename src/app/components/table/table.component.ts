import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { TableService } from 'src/app/services/table.service';
import { ToastrService } from 'ngx-toastr';
import { EmployeeDto } from 'src/app/DTOs/Employees';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { SelectionModel } from '@angular/cdk/collections';
import { AddEmployeeDialogComponent } from './add-employee-dialog/add-employee-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent implements OnInit {
  pageSize: number = Number(localStorage.getItem('Employees-page-size')) || 10; //TODO  to be dynamic
  pageIndex = 0;
  totalRecords = 0;
  loadingInProgress: boolean = false;

  @ViewChild(MatSort, { static: true }) private sort!: MatSort;

  displayedColumns: string[] = [
    'select',
    'id',
    'firstName',
    'lastName',
    'email',
    'salary',
    'dob',
    'contactNumber',
    'imageUrl',
  ];
  dataSource = new MatTableDataSource<EmployeeDto>();
  selection = new SelectionModel<EmployeeDto>(true, []);
  wrapperStyle = {};
  constructor(
    private toastr: ToastrService,
    private tableService: TableService,
    public dialog: MatDialog
  ) {}
  @Input() tableStyle: any = {};
  @ViewChild(MatPaginator, { static: true }) private paginator!: MatPaginator;
  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.getAllEmployees();
  }

  private getAllEmployees() {
    this.loadingInProgress = true;
    this.tableService.getEmployees().subscribe(
      (response) => {
        this.dataSource.data = response;
        this.dataSource.paginator = this.paginator;
        this.totalRecords = response?.length;
      },
      (error) => {
        this.showErrorMessage(error, 'Error');
      }
    );
    this.loadingInProgress = false;
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLocaleLowerCase();
  }
  pageChangeEvent(event: PageEvent) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    localStorage.setItem('Employees-page-size', this.pageSize.toString());
  }

  deleteSelected() {
    const selectedItems = this.selection.selected;
    if (selectedItems.length > 0) {
      const selectedSet = new Set(selectedItems);

      this.dataSource.data = this.dataSource.data.filter(
        (employee) => !selectedSet.has(employee)
      );

      this.selection.clear();
    } else if (this.isAllSelected()) {
      this.dataSource.data = [];
    }
  }

  addEmployee() {
    const addEmployeeDialogRef = this.dialog.open<
      AddEmployeeDialogComponent,
      any,
      EmployeeDto
    >(AddEmployeeDialogComponent, {
      height: '90%',
      width: '60%',
      disableClose: true,
    });

    addEmployeeDialogRef.afterClosed().subscribe((data) => {
      if (data) {
        this.dataSource.data.push(data);
      }
    });
  }

  /** Selection section */
  /** check if all items are already selected */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    return numSelected === this.totalRecords;
  }
  /** if the button 'Select all' is already selected then clear selection, otherwise select all items */
  OnSelectAllToggle() {
    this.isAllSelected()
      ? this.selection.clear()
      : this.dataSource.data.forEach((row) => this.selection.select(row));
  }

  /** Displayed messages section */
  public showErrorMessage(
    message: string | undefined,
    title: string | undefined
  ) {
    this.toastr.error(message, title, {
      timeOut: 5000,
      positionClass: 'toast-bottom-right',
    });
  }
}
