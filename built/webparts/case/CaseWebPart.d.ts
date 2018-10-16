import { Version } from '@microsoft/sp-core-library';
import { BaseClientSideWebPart, IPropertyPaneConfiguration } from '@microsoft/sp-webpart-base';
export interface ICaseWebPartProps {
    description?: string;
}
export default class CaseWebPart extends BaseClientSideWebPart<ICaseWebPartProps> {
    private _dataProvider;
    protected onInit(): Promise<void>;
    render(): void;
    protected onDispose(): void;
    protected readonly dataVersion: Version;
    protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration;
}
