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
//import {DateTime,Span,TextBox,DropDown,Button, ComplainerDetails,EmployeeWitnessGrid,DocumentUpload} from '../../../CommonComponents/commonElements';
import DropDown from '../../../CommonComponents/dropdown';
var Case = (function (_super) {
    __extends(Case, _super);
    function Case(props) {
        var _this = _super.call(this, props) || this;
        _this.handleRadio = _this.handleRadio.bind(_this);
        _this.handleChange = _this.handleChange.bind(_this);
        _this.state = {
            // lists: [],
            isAnonymous: true,
        };
        return _this;
    }
    Case.prototype.componentDidMount = function () {
        var _this = this;
        this.props.provider.getAllLists().then(function (_lists) {
            _this.setState({});
        });
    };
    Case.prototype.render = function () {
        return (React.createElement("div", null,
            React.createElement(DropDown, { className: "form-input", name: '{props.name}', type: '{props.inputType}', value: '{props.content}', onChange: '{props.controlFunc}', placeholder: '{props.placeholder} ' })));
    };
    Case.prototype.handleRadio = function (e) {
        if (e.target.value === "Other") {
            this.setState({
                isAnonymous: false
            });
        }
        else {
            this.setState({
                isAnonymous: true
            });
        }
        debugger;
    };
    Case.prototype.handleChange = function (e) {
        this.setState({});
    };
    return Case;
}(React.Component));
export default Case;
//# sourceMappingURL=Case.js.map