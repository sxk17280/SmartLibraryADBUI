export class BookVm {
    BookId:string='';
    Title: string = '';
    Description: string = '';
    Image: string = '';
    ISBN: string = '';
    Category: string = '';
    PublishedYear: number = 0;
    Author: string = '';
    isAvailable: boolean = true;
}

export class TransactionVM {
    BookId: string = '';
    UserId: string = '';
    CheckInDateTime: string = '';
    CheckOutDateTime: string = '';
    DueDate: string = '';
    Penalty: number = 0;
    Status: string = '';
}