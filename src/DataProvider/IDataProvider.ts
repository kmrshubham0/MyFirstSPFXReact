import {ICaseDetails} from '../CommonInterface/ICaseDetails';
import { IEmployeeDetails } from '../CommonInterface/IElement';
export interface IDataProvider {
    getAllLists(): Promise<ICaseDetails[]>;
    getChoices(choice,listName):Promise<any>;
    postData(data,listName):Promise<any>;
    getListItemEntityTypeName(listName):Promise<any>;
    createFolder(libName,FolderName):Promise<any>;
    IsFolderExists(libName,FolderName):Promise<any>;
    getListItemCount(listName):Promise<any>;
    UpdateListItem(Id,listName,data):Promise<IListItem>;
    saveFileToLibrary(url,file):Promise<any>;
    getCaseDetails(caseNo,listName);
    getEmployeeDetails(caseNo,listName);
}
export interface IState{
    CaseType?:string;
    Source?:string;
    CaseNo?:string;
    TATCategory?:string;
    IncidentDate?:Date;
    ComplaintDate?:Date;
    CaseRegisteredDate?:Date;
    ComplaintDetails?:string;
    ECode?:string;
    CaseCreatedBy?:string;
    AmountInvolvedINR?:string;
    DescriptionofMisconduct?:string; 
    EmpDetails?:any;
    isAnonymous:boolean;
    CaseTypeOption?:any;
    SourceOption?:any;    
    TATCategoryOption?:any;
    autocompleteData:any;
    value: string;
    EmpName:string;
    rows:any;
    validationErrorCaseType?:string;
    validationErrorSource?:string;
    validationErrorTATCategory?:string;
    validationError?:string;
    validationErrorIncidentDate?:string;
    validationErrorCompliantDate?:string;
    validationErrorOther?:string;
    validationErrorEmployee?:string;
    validationErrorAmountInvolved?:string;
    validationErrorDescMisconduct?:string;
    validationErrorDocument?:string;
    CaseDetails:any;
    files:any;
    Status?:string;
    IsExistingCase?:boolean;
}

export interface IListEntityType{
    listType:string;
}

export interface IIsExists{
    isExists:boolean;
}

export interface IListItem {
    Title?: string;
    Id?: number;
  }