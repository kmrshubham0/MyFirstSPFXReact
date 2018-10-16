import { SPHttpClient, SPHttpClientResponse } from "@microsoft/sp-http";
export interface ICommonValues{
    listName?:string;
    spHttpClient?:SPHttpClient; 
    siteUrl?:string;
    labelName?:string;
    name:string;
}
export interface IRadio{
    value:string;    
}

export interface IEmployeeDetails{
    Title?:string;
    CaseNo?:string;     
    caseRegisterDate?:string;
    caseType?:string;
    caseStatus?:string;
    employeeName?:string;
    sph?:SPHttpClient;    
}

export interface IDocument{
    filesArray:any;    
}

