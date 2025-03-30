import { Component, Input, OnInit } from '@angular/core';
import { TableService } from 'src/app/services/table.service';
import { ToastrService } from 'ngx-toastr';
import { EmployeeDto } from 'src/app/DTOs/Employees';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent implements OnInit {
  loadingInProgress: boolean = false;
  displayedColumns: string[] = [
    'id',
    'firstName',
    'lastName',
    'email',
    'salary',
    'dob',
    'contactNumber',
  ];
  dataSource: EmployeeDto[] = [];
  wrapperStyle = {};
  constructor(
    private toastr: ToastrService,
    private tableService: TableService
  ) {}

  ngOnInit(): void {
    this.loadingInProgress = true;
    this.getAllEmployees();
    this.loadingInProgress = false;
  }
  @Input() tableStyle: any = {};
  private getAllEmployees() {
    this.tableService.getEmployees().subscribe(
      (res) => {
        this.dataSource = res;
      },
      (err) => {
        this.showErrorMessage(err, 'Error');
      }
    );
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
