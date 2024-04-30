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
  isUser: boolean = false;
}
export class bookBasicDetail {
  BookId: string = '';
  Title: string = '';
}
export class loginVm {
  UserName: string = '';
  Password: string = '';
}
