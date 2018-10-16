import { IDataProvider } from '../../../DataProvider/IDataProvider';
import { SPHttpClient } from "@microsoft/sp-http";
export interface ICaseProps {
    provider?: IDataProvider;
    spHttpClient?: SPHttpClient;
    siteUrl?: string;
    value?: any;
}
