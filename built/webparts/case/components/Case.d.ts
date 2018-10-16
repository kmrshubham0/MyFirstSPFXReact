/// <reference types="react" />
import * as React from 'react';
import { ICaseProps } from './ICaseProps';
import { IState } from '../../../DataProvider/IDataProvider';
export default class Case extends React.Component<ICaseProps, IState> {
    constructor(props: ICaseProps);
    componentDidMount(): void;
    render(): React.ReactElement<ICaseProps>;
    handleRadio(e: any): void;
    handleChange(e: any): void;
}
