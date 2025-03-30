export class EmployeeDto {
  constructor(
    public id: number = 0,
    public age: number = 0,
    public dob: string = '',
    public email: string = '',
    public salary: number = 0,
    public address: string = '',
    public lastName: string = '',
    public firstName: string = '',
    public contactNumber: number = 0,
    public imageUrl: string = ''
  ) {}
}
