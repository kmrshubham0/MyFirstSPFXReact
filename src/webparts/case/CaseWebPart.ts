import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version , Environment, EnvironmentType} from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-webpart-base';

import * as strings from 'CaseWebPartStrings';
import Case from './components/Case';
import { ICaseProps } from './components/ICaseProps';
import { IDataProvider } from '../../DataProvider/IDataProvider';
import  SharePointProvider  from '../../DataProvider/Methods';

export interface ICaseWebPartProps {
  description?: string;
}



export default class CaseWebPart extends BaseClientSideWebPart<ICaseWebPartProps> {

  private _dataProvider: IDataProvider;

  protected onInit(): Promise<void>{    
      this._dataProvider = new SharePointProvider(this.context);    
    return super.onInit();
  }

  public render(): void {
    const element: React.ReactElement<ICaseProps > = React.createElement(
      Case,
      {        
        provider: this._dataProvider,
        spHttpClient: this.context.spHttpClient,
        siteUrl: this.context.pageContext.web.absoluteUrl,
        currentUser:this.context.pageContext.user.displayName,
        documentName:'CaseDocuments',
        listName:'Case Details'
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('description', {
                  label: strings.DescriptionFieldLabel
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
