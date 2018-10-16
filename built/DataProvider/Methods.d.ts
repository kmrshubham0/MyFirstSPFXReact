import { ICaseDetails } from '../CommonInterface/ICaseDetails';
import { IDataProvider } from '../DataProvider/IDataProvider';
import { IWebPartContext } from '@microsoft/sp-webpart-base';
export default class SharepointProvider implements IDataProvider {
    private _webPartContext;
    private _webAbsoluteUrl;
    constructor(_context: IWebPartContext);
    getAllLists(): Promise<ICaseDetails[]>;
}
