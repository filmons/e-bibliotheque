//  export class Books {
//     public id: string;
//     public title: string;
//     public editing: boolean;
//     public newTitle: string;
//     public isAvailable: boolean;    
//     public userId?: string;  // The ID of the user the task is assigned to
//     public userName?: string; // The name of the user the task is assigned to, for display purposes
//     public showAttachField?: boolean; // Whether to show the attach field in the UI
  
//     constructor(id: string, title: string, editing: boolean = false, isAvailable: boolean = false, newTitle: string = '', userId?: string, userName?: string) {
//       this.id = id;
//       this.title = title;
//       this.editing = editing;
//       this.newTitle = newTitle;
//       this.userId = userId;
//       this.userName = userName;
//       this.showAttachField = false; 
//       this.isAvailable = isAvailable;
//     }
//   }
  
  export class Books {
    public id: string;
    public title: string;
    public editing: boolean;
    public newTitle: string;
    public isAvailable: boolean;    
    public userId?: string;  // The ID of the user the task is assigned to
    public userName?: string; // The name of the user the task is assigned to, for display purposes
    public showAttachField?: boolean; // Whether to show the attach field in the UI
  
    constructor(id: string, title: string, editing: boolean = false, isAvailable: boolean = false, newTitle: string = '', userId?: string, userName?: string) {
      this.id = id;
      this.title = title;
      this.editing = editing;
      this.newTitle = newTitle;
      this.userId = userId;
      this.userName = userName;
      this.showAttachField = false; 
      this.isAvailable = isAvailable;
    }
  }