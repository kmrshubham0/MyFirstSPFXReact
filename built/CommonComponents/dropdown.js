import * as React from 'react';
//dropdown
var DropDown = function (props) { return (React.createElement("div", { className: "form-group" },
    React.createElement("label", { className: "form-label" }, props.title),
    React.createElement("input", { className: "form-input", name: props.name, type: props.inputType, value: props.content, onChange: props.controlFunc, placeholder: props.placeholder }))); };
DropDown.propTypes = {
    inputType: React.PropTypes.oneOf(['text', 'number']).isRequired,
    title: React.PropTypes.string.isRequired,
    name: React.PropTypes.string.isRequired,
    controlFunc: React.PropTypes.func.isRequired,
    content: React.PropTypes.oneOfType([
        React.PropTypes.string,
        React.PropTypes.number,
    ]).isRequired,
    placeholder: React.PropTypes.string,
};
export default DropDown;
//# sourceMappingURL=dropdown.js.map