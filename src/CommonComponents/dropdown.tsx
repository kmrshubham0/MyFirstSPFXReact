import * as React from 'react';


export  class DropDown extends React.Component<IIDropDown,{}> {
	constructor(props){
		super(props);
	}
	public render() {
		return (
		  <div className="form-group">		
						  
		  </div>
		);
	  }
}
//dropdown




export interface IIDropDown{
	title?:string;
	func?:Function;
}

