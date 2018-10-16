import * as React from 'react';
import {ICommonValues,IRadio,IEmployeeDetails,IDocument} from '../CommonInterface/IElement';
import { SPHttpClient, SPHttpClientResponse } from "@microsoft/sp-http";
import Autocomplete from 'react-autocomplete';

export class DateTime extends React.Component<ICommonValues, {}> {  
    public componentDidMount() {           
        //this.bindData(this.props.listName,this.props.siteUrl,this.props.spHttpClient);  
    }
   
    private bindData(listName,siteUrl,spHttpClient){  
    }
  
    public render() {
      return (
        <div className="form-group">
          <label>{this.props.labelName}
            <input className="form-control" type='Date' required/>
            </label>
        </div>
      );
    }
  }
  
  export  class DropDown extends React.Component<ICommonValues, {}> {
    constructor(prop){
      super(prop);
    }
    public state = {
      dropDownValues: [],
      selectedValue: "",
      validationError: ""
    };
    
    public componentDidMount() { 
        //if(this.props.name === ''){          
        this.bindData(this.props.listName,this.props.siteUrl,this.props.spHttpClient);  
       // }
      //else{
  
      //}
    }
   
    private bindData(listName,siteUrl,spHttpClient){
    spHttpClient.get(`${siteUrl}/_api/web/lists/getbytitle('${listName}')/fields?$filter=EntityPropertyName eq '${this.props.name}'`,
        SPHttpClient.configurations.v1,
        {
          headers: {
            'Accept': 'application/json;odata=nometadata',
            'odata-version': ''
          }
        })
        .then((response: SPHttpClientResponse)=>{     
          return response.json();
        })
        .then((response): void => {debugger;
          let valuesFromList = response.value[0].Choices.map(dropdownValue => { return {value: dropdownValue, display: dropdownValue} ;});
          this.setState({ dropDownValues: [{value: '', display: 'Select'}].concat(valuesFromList) });
        }, (error: any): void => {alert("Error");
          this.setState({
           // status: 'Loading all items failed with error: ' + error,
            //items: []
          });
        });
    }
  
    public render() {
      return (
        <div className="form-group"> <label>{this.props.labelName}
          <select required value={this.state.selectedValue} 
                  onChange={(e) => this.setState({selectedValue: e.target.value, validationError: e.target.value === "" ? "Please select" : ""})}>
            {this.state.dropDownValues.map((dropDownvalue) => <option key={dropDownvalue.value} value={dropDownvalue.value}>{dropDownvalue.display}</option>)}
          </select>
          <div style={{color: 'red', marginTop: '5px'}}>
            {this.state.validationError}
          </div>
          </label>
        </div>
      );
    }
  }
  
  export  class RadioButton extends React.Component<IRadio, {}> {
  
    
    public componentDidMount() {           
        //this.bindData(this.props.listName,this.props.siteUrl,this.props.spHttpClient);  
    }
   
    private bindData(listName,siteUrl,spHttpClient){  
    }
  
    private handleChange(){
  
    }
  
    public render() {
      return (
        <div>
     
      </div>
      );
    }
  }
  

  export class Button extends React.Component<ICommonValues, {}> {  
    
    public componentDidMount() {           
        //this.bindData(this.props.listName,this.props.siteUrl,this.props.spHttpClient);  
    }   
  
   public render() {
      return (
        <div className="form-group">          
            <input className="form-control" type='button' value={this.props.labelName}/>            
        </div>
      );
    }
  }

  export class TextBox extends React.Component<ICommonValues, {}> {  
    
    public componentDidMount() {           
        //this.bindData(this.props.listName,this.props.siteUrl,this.props.spHttpClient);  
    }   
  
   public render() {
      return (
        <div className="form-group">
          <label>{this.props.labelName}
            <input className="form-control" type='text'  required/>
            </label>
        </div>
      );
    }
  }

  export  class ComplainerDetails extends React.Component<IEmployeeDetails,{}> {
    constructor(prop){
      super(prop);
      this.onChange = this.onChange.bind(this);
          this.onSelect = this.onSelect.bind(this);
          this.getItemValue = this.getItemValue.bind(this);
          this.renderItem = this.renderItem.bind(this);
          this.retrieveDataAsynchronously = this.retrieveDataAsynchronously.bind(this);
    } 
   public state = {
        autocompleteData: [],
        value: "", 
        EmpName:''     
    };
  
  
  public  retrieveDataAsynchronously(searchText){debugger; 
          this.props.sph.get(`https://acuvatehyd-portal1.sharepoint.com/sites/DAC/_api/web/lists/getbytitle('Case Details')/items?$select=ID,Title`,
        SPHttpClient.configurations.v1,
        {
          headers: {
            'Accept': 'application/json;odata=nometadata',
            'odata-version': ''
          }
        })
        .then((response: SPHttpClientResponse)=>{     
          return response.json();
        })
        .then((response): void => {debugger;       
          this.setState({ autocompleteData:response.value});
        }, (error: any): void => {alert("Error");
          this.setState({
           // status: 'Loading all items failed with error: ' + error,
            //items: []
          });
        });            
      
  
         // xhr.send();
      }
      
      /**
       * Callback triggered when the user types in the autocomplete field
       * 
       * @param {Event} e JavaScript Event
       * @return {Event} Event of JavaScript can be used as usual.
       */
     public onChange(e){
          this.setState({
              value: e.target.value
          });
  
          /**
           * Handle the remote request with the current text !
           */
          this.retrieveDataAsynchronously(e.target.value);
  
          console.log("The Input Text has changed to ", e.target.value);
      }
  
      /**
       * Callback triggered when the autocomplete input changes.
       * 
       * @param {Object} val Value returned by the getItemValue function.
       * @return {Nothing} No value is returned
       */
     public onSelect(val){
          this.setState({
              value: val,
              EmpName: val
          });
          
          console.log("Option from 'database' selected : ", val);
      }
  
      /**
       * Define the markup of every rendered item of the autocomplete.
       * 
       * @param {Object} item Single object from the data that can be shown inside the autocomplete
       * @param {Boolean} isHighlighted declares wheter the item has been highlighted or not.
       * @return {Markup} Component
       */
     public renderItem(item, isHighlighted){
          return (
              <div style={{ background: isHighlighted ? 'lightgray' : 'white' }}>
                  {item.Title}
              </div>   
          ); 
      }
  
      /**
       * Define which property of the autocomplete source will be show to the user.
       * 
       * @param {Object} item Single object from the data that can be shown inside the autocomplete
       * @return {String} val
       */
     public getItemValue(item){
          // You can obviously only return the Label or the component you need to show
          // In this case we are going to show the value and the label that shows in the input
          // something like "1 - Microsoft"
          return `${item.Title} - ${item.Title}`;
      }
  
  
     public render() {
          return (
        <div>
          Ecode<Autocomplete
                      getItemValue={this.getItemValue}
                      items={this.state.autocompleteData}
                      renderItem={this.renderItem}
                      value={this.state.value}
                      onChange={this.onChange}
                      onSelect={this.onSelect}
                  />
                
          Employee Name<input type="text" name="Ecode" value={this.state.EmpName}/>
          Department<input type="text" name="Ecode"/>
          Branch<input type="text" name="Ecode"/>
          Date of Joining<input type="text" name="Ecode"/>
          Band<input type="text" name="Ecode"/>
          Mobile<input type="text" name="Ecode"/>
          Email<input type="text" name="Ecode"/>
          RM Name<input type="text" name="Ecode"/>
          BH/GBH Name<input type="text" name="Ecode"/>
          Location<input type="text" name="Ecode"/>
        </div>
      );
    }
    }
    export  class EmployeeWitnessGrid extends React.Component<{},{}> {
 
        constructor(){
          super();
          this.addRow = this.addRow.bind(this);
        }  
       public state = {        
                rows: []       
          };
          
         public render () {
            
              return (
                  <div>
                      <table>
                        <th>
                            EmpName
                        </th>
                         <th>
                            Band
                        </th>
                         <th>
                            Designation
                        </th>
                          {this.state.rows.map((r) => (
                            <tr>
                                <td>{r}</td>                         
                            </tr>
                          ))}
                      </table>
                      <button id="addBtn" onClick={this.addRow}>ADD</button>
                  </div>
              );
          }
         public addRow() {debugger;
           
              var column = this.state.rows;
              column.push(<div><td><Autocomplete /></td><td><label>Data</label></td><td><label>Data</label></td></div>);                             
              this.setState({rows: column});
          }
        }

        export  class DocumentUpload extends React.Component<{},{}> {
            constructor(){
                   super();
                   this.showToGrid = this.showToGrid.bind(this);
               }
              public state = {
                   files:[]
               };
              public showToGrid(e){
                   var column = this.state.files;
                   for(let i=0;i<e.target.files.length;i++){
                    column.push(e.target.files[i]);       
                   this.setState({
                       files:column,           
                       });
                   }
               }
              public render() {debugger;
                   return (
                 <div>
                   <input type='file' multiple onChange={this.showToGrid}/>    
                   <DocumentGrid filesArray={this.state.files}/>    
                 </div>
               );
             }
           }
           
           export class DocumentGrid extends React.Component<IDocument,{}>{
               constructor(){
                   super();        
               }    
              public render(){debugger;
                   return (
                       <div>
                           <table>                    
                               <th> Files                       
                               </th>
                               <th>                        
                               </th>
                                {this.props.filesArray.map((r) => (
                                 <tr>
                                     <td>{r.name}</td>   
                                     <td><a href="#">Remove</a></td>                      
                                 </tr>
                               ))}                    
                               </table>
                       </div>
                   );
               }
           }
           