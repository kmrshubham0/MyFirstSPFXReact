import { ICaseDetails } from '../CommonInterface/ICaseDetails';
import { IDropDown } from '../CommonInterface/IElement';
export interface IDataProvider {
    getAllLists(): Promise<ICaseDetails[]>;
}
export interface IState {
    caseDetails?: ICaseDetails[];
    isAnonymous?: boolean;
    value?: any;
    dropDownValues?: IDropDown[];
    selectedValue?: string;
    validationError?: string;
    autocompleteData?: any;
    Empvalue?: string;
    EmpName?: string;
    rows?: any;
    files?: any;
}
