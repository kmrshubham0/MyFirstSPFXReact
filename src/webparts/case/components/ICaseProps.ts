import { IDataProvider } from '../../../DataProvider/IDataProvider';
import { SPHttpClient, SPHttpClientResponse } from "@microsoft/sp-http";
export interface ICaseProps {
  provider:IDataProvider;  
  spHttpClient:SPHttpClient;
  siteUrl:string;
  currentUser:string;
  documentName:string;
  listName:string;
  
}
