import * as React from 'react';
//import styles from './Case.module.scss';
import { ICaseProps } from './ICaseProps';
import { escape } from '@microsoft/sp-lodash-subset';
import {ICaseDetails} from '../../../CommonInterface/ICaseDetails';
import {IDataProvider,IState,IListEntityType, IIsExists, IListItem} from '../../../DataProvider/IDataProvider';
import {DateTime,RadioButton,TextBox,DropDown,Button, ComplainerDetails,EmployeeWitnessGrid,DocumentUpload} from '../../../CommonComponents/commonElements';
import { SPHttpClient,SPHttpClientResponse,ISPHttpClientOptions } from '@microsoft/sp-http';
import Autocomplete from 'react-autocomplete';
//import DatePicker from 'react-datepicker';
import Moment from 'react-moment';

export default class Case extends React.Component<ICaseProps, IState> {
  constructor(props: ICaseProps) {

    super(props);     
    this.addRow = this.addRow.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
    this.handleRadio = this.handleRadio.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleDraft = this.handleDraft.bind(this);
    this.handleDocument = this.handleDocument.bind(this);
    this.showToGrid = this.showToGrid.bind(this);
    this.onChangeofComplainer = this.onChangeofComplainer.bind(this);
    this.onChangeofEmployees = this.onChangeofEmployees.bind(this);
    this.onSelectofComplainer = this.onSelectofComplainer.bind(this);
    this.getItemValue = this.getItemValue.bind(this);
    this.onSelectofEmployees = this.onSelectofEmployees.bind(this);
    this.renderItem = this.renderItem.bind(this);
    this.retrieveDataAsynchronously = this.retrieveDataAsynchronously.bind(this);
    this.state = {    
    CaseDetails:[],  
    isAnonymous:true,
    CaseTypeOption:[],
    SourceOption:[],
    TATCategoryOption:[],
    autocompleteData: [],
    value: "", 
    EmpName:'',
    rows:[],
    EmpDetails:[],
    ECode:"",
    files:[],
    IsExistingCase:false
    };     
    }
    
    public componentDidMount() {  
         this.bindDropdown('CaseType','Case Details');
         this.bindDropdown('Source','Case Details');
         this.bindDropdown('TATCategory','Case Details');
        let caseNo = "";
         if(this.state.IsExistingCase){
            this.props.provider.getCaseDetails(caseNo,this.props.listName);
            this.props.provider.getEmployeeDetails(caseNo,this.props.listName);
         }
         //var CaseType =  this.props.provider.getChoices('CaseType','Case Details').then(console.log());
        // debugger;
        // console.log(CaseType);
    /*
    this.props.provider.getAllLists().then((_lists: ICaseDetails[]) => {     
    this.setState({     
    lists: _lists    
    });     
    }); 
    */    
    } 

    public showToGrid(e){
      var column = this.state.files;
      for(let i=0;i<e.target.files.length;i++){
       column.push(e.target.files[i]);       
      this.setState({
          files:column,           
          });
      }
  }

    public render(): React.ReactElement<ICaseProps> { 
    return (     
      
    <div > 
           <div hidden={this.state.IsExistingCase} className="form-group"> <label>Case No</label> 
        <label>{this.state.CaseNo}</label>
        </div>  
      <div className="form-group"> <label>Case Type
      <select required value={this.state.CaseType} 
      onChange={(e) => this.setState({CaseType: e.target.value, validationErrorCaseType: e.target.value === "" ? "Please select" : ""})}
      name="CaseType">
            {this.state.CaseTypeOption.map((dropDownvalue) => <option key={dropDownvalue.value} value={dropDownvalue.value}>{dropDownvalue.display}</option>)}
          </select>
          </label>   
          <div style={{color: 'red', marginTop: '5px'}}>
            {this.state.validationErrorCaseType}
          </div>       
        </div>     
        <div className="form-group"> <label>Source
          <select required name="Source" value={this.state.Source} 
          onChange={(e) => this.setState({Source: e.target.value, validationErrorSource: e.target.value === "" ? "Please select" : ""})}>
            {this.state.SourceOption.map((dropDownvalue) => <option key={dropDownvalue.value} value={dropDownvalue.value}>{dropDownvalue.display}</option>)}
          </select>          
          </label>
          <div style={{color: 'red', marginTop: '5px'}}>
            {this.state.validationErrorSource}
          </div>  
        </div>     
        <div className="form-group"> <label>TATCategory
          <select required name="TATCategory" className="formC"  value={this.state.TATCategory} 
          onChange={(e) => this.setState({TATCategory: e.target.value, validationErrorTATCategory: e.target.value === "" ? "Please select" : ""})}>
            {this.state.TATCategoryOption.map((dropDownvalue) => <option key={dropDownvalue.value} value={dropDownvalue.value}>{dropDownvalue.display}</option>)}
          </select>          
          </label>
        </div>  
        <div style={{color: 'red', marginTop: '5px'}}>
            {this.state.validationErrorTATCategory}
          </div> 
          <div className="form-group"> <label>Incident Date</label>          
    
          <input type="date" onChange={(e) => this.setState({IncidentDate: new Date(e.target.value), validationErrorIncidentDate: e.target.value === "" ? "Please select" : ""})}/>                 
          <div style={{color: 'red', marginTop: '5px'}}>
            {this.state.validationErrorIncidentDate}
          </div> 
        </div>   
        <div className="form-group"> <label>Complaint Date</label> 
          <input type="date"  onChange={(e) => this.setState({ComplaintDate: new Date(e.target.value), validationErrorCompliantDate: e.target.value === "" ? "Please select" : ""})}/>                 
          <div style={{color: 'red', marginTop: '5px'}}>
            {this.state.validationErrorCompliantDate}
          </div>
        </div>    
        <div className="form-group"> <label>Registered Date</label> 
    <label>{<Moment format="DD/MM/YYYY" date={Date().toString()}></Moment>}</label>
        </div>          
        <div>
           <input type="radio" required name="complainerDetails" value="Anonymous" checked={this.state.isAnonymous} onChange={this.handleRadio}/>Anonymous
           <input type="radio" required name="complainerDetails" value="Other" checked={!this.state.isAnonymous} onChange={this.handleRadio}/>Other
         </div>
         <div className="form-group"> <label>Case Created By</label> 
        <label>{this.props.currentUser}</label>
        </div>
       <div hidden={this.state.isAnonymous}>        
         Ecode<Autocomplete
                      getItemValue={this.getItemValue}
                      items={this.state.autocompleteData}
                      renderItem={this.renderItem}
                      value={this.state.value}
                      onChange={this.onChangeofComplainer}
                      onSelect={this.onSelectofComplainer}
                      name="ECode"
                  />  
                  <div className="form-group"> <label>
                  Employee Name<input type="text" name="Ecode" value={this.state.ECode}/></label>           
                  </div>               
                  <div className="form-group"> <label>
                  Department<input type="text" name="Ecode"/>
                  </label>           
                  </div> 
                  <div className="form-group"> <label>
                  Branch<input type="text" name="Ecode"/>
                  </label>           
                  </div> 
                  <div className="form-group"> <label>
                  Date of Joining<input type="text" name="Ecode"/>
                  </label>           
                  </div> 
                  <div className="form-group"> <label>
                  Band<input type="text" name="Ecode"/>
                  </label>           
                  </div> 
                  <div className="form-group"> <label>
                  Mobile<input type="text" name="Ecode"/>
                  </label>           
                  </div> 
                  <div className="form-group"> <label>
                  Email<input type="text" name="Ecode"/>
                  </label>           
                  </div> 
                  <div className="form-group"> <label>
                  RM Name<input type="text" name="Ecode"/>
                  </label>           
                  </div> 
                  <div className="form-group"> <label>
                  BH/GBH Name<input type="text" name="Ecode"/>
                  </label>           
                  </div> 
                  <div className="form-group"> <label>
                  Location<input type="text" name="Ecode"/>
                  </label>           
                  </div>    
                  <div style={{color: 'red', marginTop: '5px'}}>
            {this.state.validationErrorTATCategory}
          </div>    
          </div>
          <div>
          <td><Autocomplete 
                  getItemValue={this.getItemValue}
                  items={this.state.autocompleteData}
                  renderItem={this.renderItem}
                  value={this.state.value}
                  onChange={this.onChangeofEmployees}
                  onSelect={this.onSelectofEmployees}
                /></td><td><label>Data</label></td><td><label>Data</label></td>
          </div>
          <div><table>
                   <th>EmpName</th>
                         <th>Band</th>
                         <th>Designation</th>
                          {this.state.EmpDetails.map((r) => (
                            <tr>
                                <td>{r}</td>                         
                            </tr>
                          ))}
                      </table>                      
                  </div>
                  <div className="form-group"> <label>
                  Amount Involved INR<input type="text" value={this.state.AmountInvolvedINR} 
                   onChange={(e) => this.setState({AmountInvolvedINR: e.target.value, validationErrorAmountInvolved: e.target.value === "" ? "Please Enter" : ""})}
                  />
                  </label>  
                  <div style={{color: 'red', marginTop: '5px'}}>
                     {this.state.validationErrorAmountInvolved}
                   </div>
                  </div>    
                  <div className="form-group"> <label>
                  Description of Misconduct<input required type="text" value={this.state.DescriptionofMisconduct}
                  onChange={(e) => this.setState({DescriptionofMisconduct: e.target.value, validationErrorDescMisconduct: e.target.value === "" ? "Please enter" : ""})}
                  />
                  </label>  
                  <div style={{color: 'red', marginTop: '5px'}}>
                     {this.state.validationErrorDescMisconduct}
                   </div>         
                  </div>    
                  <div className="form-group"> <label>
                  Attach Compliant Document<input type="file" multiple onChange={this.showToGrid}/>
                  </label> 
                  <div style={{color: 'red', marginTop: '5px'}}>
                     {this.state.validationErrorDocument}
                   </div>           
                  </div>  
                  <div>
                           <table>                    
                               <th> Files                       
                               </th>
                               <th>                        
                               </th>
                                {this.state.files.map((r) => (
                                 <tr>
                                     <td>{r.name}</td>   
                                     <td><a href="#">Remove</a></td>                      
                                 </tr>
                               ))}                    
                               </table>
                       </div>                 
                  <div className="form-group"> <label>
                  <input type="button" value="Save As Draft" onClick={()=>this.handleSubmit(this.setState({Status:"Draft"}))}/>
                  <input type="button" value="Register" onClick={()=>this.handleSubmit(this.setState({Status:"On GoingInvestigation"}))}/>
                  <input type="button" value="Cancel"/>
                  </label>           
                  </div>  
                  
    </div>     
    );     
    } 

public formatDate(){

}

  public handleDraft(){

  }
   public handleRadio(e){
      if(e.target.value=== "Other"){
         this.setState({
           isAnonymous:false,
           ComplaintDetails:e.target.value
         });
      }
       else{
          this.setState({
           isAnonymous:true,
           ComplaintDetails:e.target.value,
           ECode:""
         });
       }   
    }

    public addRow() {debugger;
           
      var column = this.state.rows;
      column.push(<div><td><Autocomplete 
        getItemValue={this.getItemValue}
        items={this.state.autocompleteData}
        renderItem={this.renderItem}
        value={this.state.value}
        onChange={this.onChangeofEmployees}
        onSelect={this.onSelectofEmployees}
      /></td><td><label>Data</label></td><td><label>Data</label></td></div>);                             
      this.setState({rows: column});
  }

    public bindDropdown(Choice,listName){debugger;
      this.props.spHttpClient.get(`${this.props.siteUrl}/_api/web/lists/getbytitle('${listName}')/fields?$filter=EntityPropertyName eq '${Choice}'`,
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
        if(Choice==='CaseType'){
        this.setState({
          CaseTypeOption: [{value: '', display: 'Select'}].concat(valuesFromList) 
        });
      }
      else if(Choice==='Source'){
        this.setState({
          SourceOption: [{value: '', display: 'Select'}].concat(valuesFromList) 
        });
      }else{
        this.setState({
          TATCategoryOption: [{value: '', display: 'Select'}].concat(valuesFromList) 
        });
      }
      }, (error: any): void => {alert("Error");        
      });
    }
    public  retrieveDataAsynchronously(searchText){debugger; 
      this.props.spHttpClient.get(`https://acuvatehyd-portal1.sharepoint.com/sites/DAC/_api/web/lists/getbytitle('Case Details')/items?$select=ID,Title`,
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
      
    });            
  

     // xhr.send();
  }
  
  /**
   * Callback triggered when the user types in the autocomplete field
   * 
   * @param {Event} e JavaScript Event
   * @return {Event} Event of JavaScript can be used as usual.
   */
 public onChangeofComplainer(e){
      this.setState({
          value: e.target.value
      });

      /**
       * Handle the remote request with the current text !
       */
      this.retrieveDataAsynchronously(e.target.value);

      console.log("The Input Text has changed to ", e.target.value);
  }

  public onChangeofEmployees(e){
    this.setState({
        //value: e.target.value
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
 public onSelectofComplainer(val){      
      this.setState({
          value: val,          
          ECode:val
      });
      if(val === ""){
          this.setState({
            validationErrorOther:"Please enter the value"
          })
      }
      
      console.log("Option from 'database' selected : ", val);
  }

  public onSelectofEmployees(val){      
    this.setState({
        //value: val,
        //EmpName: val,
        EmpDetails:this.state.EmpDetails.concat([{Title:val}])
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


  public handleSelect(e){debugger;
    let field = e.target.name;  
        if(field==='CaseType'){
          this.setState({
            CaseType:e.target.value,
            //caseDetails:[{CaseType:e.target.value}]
          });
        }
        else if(field==='Source'){
          this.setState({
            Source:e.target.value
          });
        }else{
          this.setState({
            TATCategory:e.target.value
          });
        }
  }

public handleDocument(){
         
  
}

 public handleSubmit(prefix){debugger;      
      if(this.validateForm()){
      let caseNo:string;
      this.props.provider.getListItemCount('Case Details').then((result:any)=>{
       let currentDate = new Date();       
        let caseNo = "HR-DAC-"+ currentDate.getFullYear()+"-"+currentDate.getMonth()+ "-"+(result.value.length + 1);
         this.saveDetails(caseNo);
     });
    }
    else{

    }
            
  }

  public validateForm():boolean{
      let result:boolean;
      if(this.state.CaseType === ""){
          result = false;
          this.setState({
            validationErrorCaseType:"Please Select"            
          });
      }
      if(this.state.Source === ""){
        this.setState({
          validationErrorSource:"Please Select"
        })
        result = false;
      }
      if(this.state.TATCategory === ""){
        this.setState({
          validationErrorTATCategory:"Please Select"
        })
        result = false;
      }
    //  if(this.state.IncidentDate === ""){
          
    //  }
    //  if(this.state.ComplaintDate === ""){

    //  }
      if(this.state.ECode === "" && this.state.isAnonymous != true){
        this.setState({
          validationErrorOther:"Please enter"
        })
        result = false;
      }
      if(this.state.EmpDetails.length === 0){
        this.setState({
          validationErrorEmployee:"Please select atleast one Employee"
        })
        result = false;
      }
      if(this.state.AmountInvolvedINR === ""){
        this.setState({
          validationErrorAmountInvolved:"Please enter"
        })
        result = false;
      }
      if(this.state.DescriptionofMisconduct === ""){
        this.setState({
          validationErrorDescMisconduct:"Please enter"
        })
        result = false;
      }
      if(this.state.files.length === 0){
        this.setState({
          validationErrorDocument:"Please choose atleast one file"
        })
        result = false;
      }     
      return result;
  }

  public setValue(){
    return "Please select";
  }
public saveDetails(caseNo){debugger;   
  let url : string;
  let listItemEntityTypeName : any;
  this.props.provider.getListItemEntityTypeName(this.props.listName).then((_lists: IListEntityType[]) => {    
     listItemEntityTypeName = _lists ;  
     debugger;
     const body: string = JSON.stringify({
       '__metadata': {
         'type': listItemEntityTypeName
       },      
       'CaseType':this.state.CaseType,
       'Source':this.state.Source,
       'TATCategory':this.state.TATCategory,
       'IncidentDate':this.state.IncidentDate,
       'ComplaintDate':this.state.ComplaintDate,
       'Anonymous':this.state.isAnonymous,
       //'CaseRegisteredDate':new Date(),
       //'ComplaintDetails':this.state.ComplaintDetails,
       'ECode':this.state.ECode,
       //'CaseCreatedBy':this.props.currentUser,
       'Status':this.state.Status,
       'AmountInvolvedINR':this.state.AmountInvolvedINR,
       'DescriptionofMisconduct':this.state.DescriptionofMisconduct
     });   
     this.props.provider.postData(body,'Case Details').then((newItem:IListItem[])=>{ debugger;      
       const bodyUpdate: string = JSON.stringify({
        '__metadata': {
          'type': listItemEntityTypeName
        },
        'CaseNo':caseNo,
        'Title' :caseNo
      });
       this.props.provider.UpdateListItem(newItem,'Case Details',bodyUpdate).then(()=>{
        this.props.provider.IsFolderExists(this.props.documentName,caseNo).then((result: any) => {  debugger;
          if(result == false){                   
              this.props.provider.createFolder(this.props.documentName,caseNo).then((docResult:any) => {                       
                     this.saveFile(caseNo);                   
              });                
          }  
          else{           
            this.saveFile(caseNo);           
          }          
      });
       });     
     });     
 });   
}

public saveFile(caseNo){debugger;    
  let files = this.state.files;      
  let url:string;               
  for(let i=0; i<files.length;i++){
   url = this.props.siteUrl+"/_api/Web/Lists/getByTitle('"+this.props.documentName+"')/RootFolder/folders('"+caseNo+"')/folders('ComplaintDocuments')/Files/Add(url='"+files[i].name+"', overwrite=true)";
  this.props.provider.saveFileToLibrary(url,files[0]);
  }
}
}
