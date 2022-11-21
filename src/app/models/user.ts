export class user {
    Id: string = '';
    UserId: string = '';
    FirstName: string = '';
    LastName: string = '';
    Address: string = '';
    City: string = '';
    Phone: string = '';
    Email: string = '';
    Password: string = '';
    isAdmin: boolean = true;
    fine:number=0;
    booksIssued:Array<bookBasicDetail>=[];
    renewals:Array<bookBasicDetail>=[];
}
export class bookBasicDetail {
    BookId: string = '';
    Title: string = '';
}
export class loginVm{
    UserName :string='';
   Password :string='';
}
  