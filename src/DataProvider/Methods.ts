import { ICaseDetails } from '../CommonInterface/ICaseDetails';
import { IDataProvider,IListEntityType,IListItem } from '../DataProvider/IDataProvider';
import { IWebPartContext } from '@microsoft/sp-webpart-base';
import { SPHttpClient,SPHttpClientResponse,ISPHttpClientOptions } from '@microsoft/sp-http';


export default class SharepointProvider implements IDataProvider{

    private _webPartContext: IWebPartContext;    
    private _webAbsoluteUrl: string;

    constructor(_context: IWebPartContext){
        this._webPartContext = _context;
        this._webAbsoluteUrl = _context.pageContext.web.absoluteUrl;
    }

    public getAllLists(): Promise<ICaseDetails[]>{   
        let _items: ICaseDetails[];
        
        return this._webPartContext.spHttpClient.get(this._webAbsoluteUrl+"/_api/web/lists",SPHttpClient.configurations.v1).then((response:any)=>{
            //If RESt API returns the value, send the json to then. Otherwise returns to catch
            if(response.status >=200 && response.status<300){                
                return response.json();
            }else{
                return Promise.reject(new Error(JSON.stringify(response)));
            }
        }).then((data:any)=>{
            //Add Each list to _items array from retrived json
            _items =[];            
            if(data){
                for(let i=0; i< data.value.length; i++){
                    let item = data.value[i];
                    var lst: ICaseDetails ={
                        CaseType: item.Title                        
                    };
                    _items.push(lst);
                }
            }

            return _items;
        }).catch((ex)=>{
            console.log("Error in retrieving List from site");
            throw ex;
        });
    }

    public getChoices(choice,listName):any{
        this._webPartContext.spHttpClient.get(this._webAbsoluteUrl+`/_api/web/lists/getbytitle('${listName}')/fields?$filter=EntityPropertyName eq '${choice}'`,
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
          return response.value[0].Choices;          
        }, (error: any): void => {alert("Error");
         
        });
    }

    public postData(data,listName):Promise<IListItem>{
       return this._webPartContext.spHttpClient.post(`${this._webAbsoluteUrl}/_api/web/lists/getbytitle('${listName}')/items`,
        SPHttpClient.configurations.v1,
        {
          headers: {
            'Accept': 'application/json;odata=nometadata',
            'Content-type': 'application/json;odata=verbose',
            'odata-version': '',
         //   'IF-MATCH': etag,
            'X-HTTP-Method': 'POST'
          },
          body: data
        }).then((response:any)=>{
            //If RESt API returns the value, send the json to then. Otherwise returns to catch
            if(response.status >=200 && response.status<300){                
                return response.json();
            }else{
                return Promise.reject(new Error(JSON.stringify(response)));
            }
        }).then((data:any)=>{debugger;
            return data.ID;
            //Add Each list to _items array from retrived json          
            
        }).catch((ex)=>{
            console.log("Error in retrieving List from site");
            throw ex;
        });
    }  
    public UpdateListItem(id,listName,data):Promise<IListItem>{
        return this._webPartContext.spHttpClient.post(`${this._webAbsoluteUrl}/_api/web/lists/getbytitle('${listName}')/items(${id})`,
         SPHttpClient.configurations.v1,
         {
           headers: {
             'Accept': 'application/json;odata=nometadata',
             'Content-type': 'application/json;odata=verbose',
             'odata-version': '',
             'IF-MATCH': '*',
             'X-HTTP-Method': 'MERGE'
           },
           body: data
         }).then((response:any)=>{
             //If RESt API returns the value, send the json to then. Otherwise returns to catch
             if(response.status >=200 && response.status<300){                
                 return response.json();
             }else{
                 return Promise.reject(new Error(JSON.stringify(response)));
             }
         }).then((data:any)=>{debugger;
             return data;
             //Add Each list to _items array from retrived json          
             
         }).catch((ex)=>{
             console.log("Error in retrieving List from site");
             throw ex;
         });
     }  

    public getListItemEntityTypeName(listName): Promise<IListEntityType>{   
        let _item: IListEntityType;        
        return this._webPartContext.spHttpClient.get(`${this._webAbsoluteUrl}/_api/web/lists/getbytitle('${listName}')?$select=ListItemEntityTypeFullName`,
        SPHttpClient.configurations.v1).then((response:any)=>{
            //If RESt API returns the value, send the json to then. Otherwise returns to catch
            if(response.status >=200 && response.status<300){                
                return response.json();
            }else{
                return Promise.reject(new Error(JSON.stringify(response)));
            }
        }).then((data:any)=>{debugger;
            //Add Each list to _items array from retrived json
            _item = data.ListItemEntityTypeFullName;                    
            return _item;
        }).catch((ex)=>{
            console.log("Error in retrieving List from site");
            throw ex;
        });
    }

    public getListItemCount(listName): Promise<IListEntityType>{   
        let _item: IListEntityType;        
        return this._webPartContext.spHttpClient.get(`${this._webAbsoluteUrl}/_api/web/lists/getbytitle('${listName}')/items`,
        SPHttpClient.configurations.v1).then((response:any)=>{
            //If RESt API returns the value, send the json to then. Otherwise returns to catch
            if(response.status >=200 && response.status<300){                
                return response.json();
            }else{
                return Promise.reject(new Error(JSON.stringify(response)));
            }
        }).then((data:any)=>{debugger;
            //Add Each list to _items array from retrived json
            _item = data;                    
            return _item;
        }).catch((ex)=>{
            console.log("Error in retrieving List from site");
            throw ex;
        });
    }

    public getCaseDetails(caseNo,listName): Promise<IListItem>{   
        let _item: IListEntityType;        
        return this._webPartContext.spHttpClient.get(`${this._webAbsoluteUrl}/_api/web/lists/getbytitle('${listName}')/items?$select=*&$filter=CaseNo eq '${caseNo}'`,
        SPHttpClient.configurations.v1).then((response:any)=>{
            //If RESt API returns the value, send the json to then. Otherwise returns to catch
            if(response.status >=200 && response.status<300){                
                return response.json();
            }else{
                return Promise.reject(new Error(JSON.stringify(response)));
            }
        }).then((data:any)=>{debugger;
            //Add Each list to _items array from retrived json
            _item = data;                    
            return _item;
        }).catch((ex)=>{
            console.log("Error in retrieving List from site");
            throw ex;
        });
    }

    public getEmployeeDetails(caseNo,listName): Promise<IListItem>{   
        let _item: IListEntityType;        
        return this._webPartContext.spHttpClient.get(`${this._webAbsoluteUrl}/_api/web/lists/getbytitle('${listName}')/items?$select=*&$filter=CaseNo eq '${caseNo}'`,
        SPHttpClient.configurations.v1).then((response:any)=>{
            //If RESt API returns the value, send the json to then. Otherwise returns to catch
            if(response.status >=200 && response.status<300){                
                return response.json();
            }else{
                return Promise.reject(new Error(JSON.stringify(response)));
            }
        }).then((data:any)=>{debugger;
            //Add Each list to _items array from retrived json
            _item = data;                    
            return _item;
        }).catch((ex)=>{
            console.log("Error in retrieving List from site");
            throw ex;
        });
    }

    public IsFolderExists(libName,FolderName):Promise<any>{
        let isExist = false;
        return this._webPartContext.spHttpClient.get(`${this._webAbsoluteUrl}/_api//web/GetFolderByServerRelativeUrl('${libName+'/'+FolderName}')`,
        SPHttpClient.configurations.v1).then((response:any)=>{
            //If RESt API returns the value, send the json to then. Otherwise returns to catch
            if(response.status >=200 && response.status<300){     
                isExist = true;           
                return response.json();
            }else{
                //return response.json();
                isExist = false;
                return true;
            }
        }).then((data:any)=>{debugger;
            //Add Each list to _items array from retrived json
            //_item = data.ListItemEntityTypeFullName;                    
            return isExist;
        }).catch((ex)=>{
            console.log("Error in retrieving List from site");
            return false;
        });
    }
    public createFolder(libName,FolderName):Promise<any>{        
        return this._webPartContext.spHttpClient.post(`${this._webAbsoluteUrl}/_api/web/GetFolderByServerRelativeUrl('${libName}')/folders/add(url=\'${FolderName}\')`,
        SPHttpClient.configurations.v1,
        {
          headers: {
            'Accept': 'application/json;odata=nometadata',
            'Content-type': 'application/json;odata=verbose',
            'odata-version': '',
         //   'IF-MATCH': etag,
            'X-HTTP-Method': 'POST'
          },
          //body: FolderName
        }).then((response:any)=>{debugger;
            //If RESt API returns the value, send the json to then. Otherwise returns to catch
            if(response.status >=200 && response.status<300){                
                return response.json();
            }else{
                return Promise.reject(new Error(JSON.stringify(response)));
            }
        }).then((data:any)=>{debugger;
            //Add Each list to _items array from retrived json          
            
        }).catch((ex)=>{
            console.log("Error in retrieving List from site");
            throw ex;
        });
    }

    public saveFileToLibrary(url,file):Promise<any>{  
        let spOpts : ISPHttpClientOptions;
        spOpts   = {
            headers: {
              "Accept": "application/json",
              "Content-Type": "application/json"
            },
            body: file    
          };      
        return this._webPartContext.spHttpClient.post(url, SPHttpClient.configurations.v1, spOpts).then((response: SPHttpClientResponse) => {
            console.log(`Status code: ${response.status}`);
            console.log(`Status text: ${response.statusText}`);        
            response.json().then((responseJSON: JSON) => {
              console.log(responseJSON);
            });
          });
    }
}