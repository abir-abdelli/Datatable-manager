import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { TableService } from 'src/app/services/table.service';
import { ToastrService } from 'ngx-toastr';
import { EmployeeDto } from 'src/app/DTOs/Employees';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';

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
    'id',
    'firstName',
    'lastName',
    'email',
    'salary',
    'dob',
    'contactNumber',
  ];
  dataSource = new MatTableDataSource<EmployeeDto>();
  wrapperStyle = {};
  constructor(
    private toastr: ToastrService,
    private tableService: TableService
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
