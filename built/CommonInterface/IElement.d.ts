import { SPHttpClient } from "@microsoft/sp-http";
import { ICaseDetails } from '../CommonInterface/ICaseDetails';
export interface ICommonValues {
    listName?: string;
    spHttpClient?: SPHttpClient;
    siteUrl?: string;
    labelName?: string;
    name: string;
    caseDetails?: ICaseDetails[];
}
export interface IRadio {
    value: string;
}
export interface IDropDown {
    value: string;
    display: string;
}
export interface IEmployeeDetails {
    Title?: string;
    CaseNo?: string;
    caseNo?: string;
    caseRegisterDate?: string;
    caseType?: string;
    caseStatus?: string;
    employeeName?: string;
    sph: SPHttpClient;
}
export interface IDocument {
    filesArray: any;
}
