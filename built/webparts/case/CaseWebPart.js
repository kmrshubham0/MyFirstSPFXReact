var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import { BaseClientSideWebPart, PropertyPaneTextField } from '@microsoft/sp-webpart-base';
import * as strings from 'CaseWebPartStrings';
import Case from './components/Case';
import SharePointProvider from '../../DataProvider/Methods';
var CaseWebPart = (function (_super) {
    __extends(CaseWebPart, _super);
    function CaseWebPart() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CaseWebPart.prototype.onInit = function () {
        this._dataProvider = new SharePointProvider(this.context);
        return _super.prototype.onInit.call(this);
    };
    CaseWebPart.prototype.render = function () {
        var element = React.createElement(Case, {
            provider: this._dataProvider,
            spHttpClient: this.context.spHttpClient,
            siteUrl: this.context.pageContext.web.absoluteUrl,
        });
        ReactDom.render(element, this.domElement);
    };
    CaseWebPart.prototype.onDispose = function () {
        ReactDom.unmountComponentAtNode(this.domElement);
    };
    Object.defineProperty(CaseWebPart.prototype, "dataVersion", {
        get: function () {
            return Version.parse('1.0');
        },
        enumerable: true,
        configurable: true
    });
    CaseWebPart.prototype.getPropertyPaneConfiguration = function () {
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
    };
    return CaseWebPart;
}(BaseClientSideWebPart));
export default CaseWebPart;
//# sourceMappingURL=CaseWebPart.js.map