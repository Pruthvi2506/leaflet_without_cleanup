/**
 *  
 * Container: equipmentViewContainer.js
 *
 * @version 1.0
 * @author Anil
 *
 */
'use strict';

import React, {
    Component
} from 'react';
import ReactDOM from 'react-dom';
import {
    bindActionCreators
} from 'redux';
import {
    connect,
    Provider
} from 'react-redux';
import {
    DataGrid,
    SvgIcon,
    SearchwChips,
    Snackbar,
    ProgressIndicatorCircular,
    ExpansionPanel,
    AppToolbarNew,
    List,
    Dialog,
    StatusBar
} from '@nokia-csf-uxr/csfWidgets';
import axios from 'axios';

import {
    gridViewData,
    
    associationData
} from '../actions/associationViewAction.js';

//import gridOptions2 from "@nokia-csf-uxr/csfWidgets/stories/GridOptions";

//Style
import style from '../../styles/dataGrid.css';
let gridApi;
let gridColumnApi;
var entityType;
let traversalData;
var hierarchyArray;
var globalparams=[];
var defaultOpenCount=0;
var gridOptionsOriginal ;
/**
 * 
 * @class EquipmentList
 * @description Container Class
 * @memberof sureUI.components
 **/

class AssociationViewContainer extends Component {

    constructor(props) {
        //console.log("@nokia-csf-uxr"+@nokia-csf-uxr);
        super(props);
        
        //this.columnStatechanges = this.columnStatechanges.bind(this);
        
        this.state = {
            data: '',
            loading: true,
            historyBaseFlag: false,
            selectedRow: '',
            selectedMethod: '',
            initialColumnData: [],
   count0: 0,
            count1:0,
   date: new Date(),
   switchOnOff: false
        };
        this.ajaxWaiting = true;
        
    }
    /*  static get defaultProps() {
        return {
          sureEntities : ['location','network','equipment','endpoint','fcp','path','service']
        }
      }*/
    static get defaultProps() {
        return {
            sureEntities: ['location', 'network', 'equipment', 'endpoint', 'fcp', 'path', 'service'],
            userMessage: "",
            
            onClose: function onClose(e, closeVar) {
        console.log(closeVar);
        if(closeVar){
            try{
            
    console.log("inside onclose defaultprops.."+close);
console.log(this.gridApi);
            for(let i=0; i<globalparams.length; i++){
                globalparams[i].value.api.setColumnDefs(gridOptionsOriginal.columnDefs);//this.gridApi.gridCore.gridOptions.columnApi.setColumnDefs();
     }
                defaultOpenCount=0;
       setTimeout(function () { ReactDOM.unmountComponentAtNode(document.getElementById("associationViewWrapper")); }, 500);
            }
            
            catch(err){
                defaultOpenCount=0;
                 setTimeout(function () { ReactDOM.unmountComponentAtNode(document.getElementById("associationViewWrapper")); }, 500);
    
            }
            }
        
    }
            
            




        }
    }

    columnStatechanges() {
        var state = this.gridApi.gridCore.gridOptions.columnApi.getColumnState();
       // this.props.gridData.columnPreference(state);
        //this.setState({ columnAdd: state });
    }

    componentWillMount() {
        console.log("this.props inside willmount:::");
        console.log(this.props);
        const {
            gridData
        } = this.props;
        console.log(gridData);
        const {
            gridViewData
        } = this.props;
        
        const {
            associationData
        } = this.props;
        ///*  
        if (gridData.historyBaseFlag) {
            
        }
        //*/
        //Action Creators to retrive rowdata for the selected uuid:
        if (gridData.selectedUUID && gridData.selectedEntityType) {

            let EVsearchPayload;
if(gridData.selectedEntityType=='Equipment'){
    console.log('equipment');
            EVsearchPayload={"request":{"origin":{"@class":gridData.selectedEntityType,"UUID":gridData.selectedUUID},"inclusion":{"gInclude":[gridData.selectedEntityType]},"gDirection":"BOTH"},"response":{"responseType":"SubTree","entity":["RootEquipment", "Equipment", "Location"]},"expand":["Equipment.State"]}}
   else if(gridData.selectedEntityType=='Endpoint'){
       console.log('endpoint');
            EVsearchPayload={"request":{"origin":{"@class":gridData.selectedEntityType,"UUID":gridData.selectedUUID},"inclusion":{"gInclude":[gridData.selectedEntityType, "Equipment","FCP"]},"gDirection":"OUTGOING"},"response":{"responseType":"SubTree","entity":["RootEquipment", "Endpoint"]},"expand":["Equipment.State", "Endpoint.State"]}
   }
   
   
            else if(gridData.selectedEntityType=='FCP'){
                console.log('fcp');
                    EVsearchPayload={"request":{"origin":{"@class":gridData.selectedEntityType,"UUID":gridData.selectedUUID},"inclusion":{"gInclude":[gridData.selectedEntityType, "Equipment","Endpoint"]},"gDirection":"OUTGOING"},"response":{"responseType":"SubTree","entity":["RootEquipment", "FCP"]},"expand":["Equipment.State", "FCP.State"]}
            }
    else{
        console.log(gridData.selectedEntityType);
    //throw error..
    }
            associationData({
                searchUrl: gridData.domain,
                requestHeaders: gridData.requestHeaders ? gridData.requestHeaders : {},
                columnurl: gridData.metadataUrl + gridData.columnurl,
                selectedEntity: gridData.selectedEntity,
                selectedEntityType: gridData.selectedEntityType,
                selectedUUID: gridData.selectedUUID,
                imageIconurl: gridData.imageIconurl,
                externalIconURL: gridData.externalIconURL,
                traversalEntity: gridData.traversalEntity,
                searchPayload: EVsearchPayload,
                nameIcon: gridData.nameIcon,
                columnResponse: gridData.columnResponse,
                clientSideEnabled: gridData.clientSideEnabled
            })
        } else {
            
        }



    }


    onGridReady(i, params) {

globalparams.push(params);
        
        console.log("params inside ongridready: ");
        console.log(globalparams);
        //this.gridApi = params.value.api;
        //this.gridApi = globalparams[i].value.api;
        //console.log("this.gridApi: ");
        //console.log(JSON.stringify(hierarchyArray));
        //var gridObject=this.gridApi;
        //console.log(gridData);
        
        //globalparams[i].value.api
        for(let i=0; i<globalparams.length;i++){
            this.gridApi = globalparams[i].value.api;
 console.log(globalparams[i].value.api.getDisplayedRowCount());
    }
        
        
        
        // this.gridColumnApi = params.columnApi;
        this.gridApi.sizeColumnsToFit();
       
        

var newObjDatachecked = [];
    var newObjDataUnchecked = [];
    var newArrayObj = [];
    newArrayObj = this.columnPreferenceUpdate(newObjDatachecked, newObjDataUnchecked);
        console.log(newArrayObj);
        for(let i=0;i<globalparams.length;i++){
       // this.gridApi=globalparams[i].value.api;
            console.log(globalparams[i]);
        globalparams[i].value.api.gridOptionsWrapper.gridOptions.columnDefs=newArrayObj;
        }
    //this.props.gridData.columnPreference(newArrayObj); //this.gridApi=globalparams[e].value.api;
    }
    //   columnStatechanges(state){
    //  this.props.gridData.columnPreference(state);
    // }

    checkColumnSize() {
        if (!this.columnsResized) {
            this.gridApi.sizeColumnsToFit();
            this.columnsResized = true;
        }
    }
    
    columnResize(gridApi, props) {
        if (props.gridData.selectedEntity === "users") {
            document.getElementById("errors") && ReactDOM.unmountComponentAtNode(document.getElementById("errors"));
            //columnApi.resetColumnState();
            //gridApi.sizeColumnsToFit();
        }
    }



    componentWillReceiveProps(nextProps) {
    }




    onSelectionChanged(e, i) {
        console.log(e);
        console.log(i);//nativeEvent.node.selected==true?
        const {
            gridData
        } = this.props;
        console.log(this.props);
        this.gridApi=globalparams[e].value.api;
        //var this2= JSON.parse(JSON.stringify(this));
        //var selectedRows = this.gridApi.getSelectedRows(); //gridOptions.api
        var selectedRows=[];selectedRows[0] = i.nativeEvent.data;
        //  var selectedRows=gridOptions.api.getSelectedRows();
        /*if (gridData.passRowData) {
            gridData.passRowData(selectedRows);
        }*/
        console.log("getSelectedRows: ");
        console.log(selectedRows);


        if (selectedRows && selectedRows[0] && i.nativeEvent.node.selected==true) {

            console.log(selectedRows[0]);
            var inputObj = selectedRows[0];
            var result = [];
            Object.keys(inputObj)
                .forEach(function eachKey(key) {
                    //console.log(key); // alerts key
                    //console.log(this.state.selectedRowData[key]); // alerts value
                    result.push({
                        'label': key,
                        'value': inputObj[key]
                    });
                });
            console.log(result);
            var detailsTitle;
            if(selectedRows[0].SourceName){
            detailsTitle = selectedRows[0].SourceName
            }
            else if(selectedRows[0].TargetName){
            detailsTitle = selectedRows[0].TargetName        
            }
            
            
            var html = '';
            html = html + "<div class='header'><div class='title'>" + detailsTitle + "</div></div>"
            for (let i = 0; i < result.length; i++) {
                if (result[i].label != 'parentNode' && typeof (result[i].value) != 'object') {
                    html = html + "<div class='container'><div class='panelLabel'>" + result[i].label + "</div><div class='propValue'>" + result[i].value + "</div></div>";
                }

            }

            document.getElementById("detailsDiv").innerHTML = html;
            // var result=[{label: 'a',value:'1'},{label: 'a',value:'1'}];
            /*var html;
            result.forEach(
                
        
            )*/

           
        }



        //this.state.selectedRowData=selectedRows;


    }

   
    traversalEntityFn(currentEntity) {
        var traversalSelectedEntity = this.props;
        traversalSelectedEntity.traversalEntity(currentEntity);
    }
    parentTraversalEntity(entity) {
        var parentEntity = this.props;
        parentEntity.gridData.parentTraversal(entity);
    }

   

    
    renderAssociationPanels(expansionParams, i, hierarchyArrayItem) {
        console.log(hierarchyArrayItem);
        if (!hierarchyArrayItem) {
            hierarchyArrayItem = {
                SureName: '',
                UUID: ''
            };

        }
        var defaultOpenFlag=false;
        console.log(this.props);//.EV.selectedUUIDData
        // if (hierarchyArrayItem.UUID == this.props.EV.selectedUUIDData) {
        //     console.log("defaultopen.."+hierarchyArrayItem.UUID);
        //     defaultOpenFlag = true;

        // }
        /*if(expansionParams[0].defaultOpen==true && defaultOpenCount==0){
            console.log('defaultOpen:'+expansionParams[0].UUID);
            
            
            defaultOpenCount=defaultOpenCount+1;
        }*/
       
        console.log("inside renderAssociationPanels");

        
        let gridOptions2;
        console.log(gridOptionsOriginal);
        if(i==0){
            //incoming columndefs..
            gridOptions2 = {
            columnDefs: this.props.AV.columnDataIN,
            rowData: expansionParams,
            rowSelection: 'single'
               
        };
           }
           else{
             gridOptions2 = {
            columnDefs: this.props.AV.columnDataOUT,
            rowData: expansionParams,
            rowSelection: 'single'
                
        };
           }
        
        
        
       
        //gridOptions2.alignedGrids.push(gridOptions2)
            
        var datagridid = 'datagrid' + i;
        var titleContent=hierarchyArrayItem.SureName;
        if(hierarchyArrayItem.DisplayName){
            console.log("display name found..");
            titleContent=hierarchyArrayItem.DisplayName;}
    
    
        
        if(i==0){
        return <div class = 'AVexpansionItem' style = {{height: '40%'}} defaultOpen = {defaultOpenFlag} >
            <div class='titleDiv'>{
                titleContent
            } < /div >
            
            < DataGrid id = {datagridid} gridOptions = {gridOptions2} onGridReady = {this.onGridReady.bind(this, i)} onRowSelected={this.onSelectionChanged.bind(this, i)}>
            </DataGrid>
<div>
          
         </div>
            </div>;
    }
    else {
     return <div class = 'AVexpansionItem' style = {{height: '40%'}} defaultOpen = {defaultOpenFlag} >
            <div class='titleDiv'>{
                titleContent
            } < /div >
            
            < DataGrid id = {datagridid} gridOptions = {gridOptions2} onGridReady = {this.onGridReady.bind(this, i)} onRowSelected={this.onSelectionChanged.bind(this, i)}>
            </DataGrid>
<div>
           
         </div>
            </div>;
    
    }
        

    }



    toggle(event) {
        console.log("toggle called..(expand/collapse called)");
        console.log(event);
        //    /this.viewOpenState = event.type === 'onExpand';
        //this.setState({ viewOpenState: this.viewOpenState });
    };
    onExpand(e) {

        console.log("expanding.." + e.value);
    }

    onCollapse(e) {
        console.log("collapsing.." + e.value);
    }

    onClose(e, closeVar) {
    
        if(closeVar){
               
   try{            
    console.log("inside onclose.."+close);
            console.log(this.gridApi);
            this.gridApi.setColumnDefs(gridOptionsOriginal.columnDefs);
           /* for(let i=0; i<globalparams.length; i++){
                //globalparams[i].value.api.setColumnDefs(gridOptionsOriginal.columnDefs);
                
     }*/
       defaultOpenCount=0;
    setTimeout(function () { ReactDOM.unmountComponentAtNode(document.getElementById("associationViewWrapper")); }, 500);
   }
catch(err) {
            defaultOpenCount=0;
            setTimeout(function () { ReactDOM.unmountComponentAtNode(document.getElementById("associationViewWrapper")); }, 500);
            
}
       
        
        }
        
    }


 columnPreferenceUpdate(columnCheckedArray, columnUnCheckedArray) {
    console.log(this.state.initialColumnData);
    var columnDataArray = this.state.initialColumnData;
    var visibleColumnArray = [];
    var hiddenColumnArray = [];
    var visibleColumnMainArray = [];
    var availableColumnMainArray = [];
    var changedColumnPreferenceArray = [];
    columnDataArray.map(function (value) {
      for (var i = 0; i < columnCheckedArray.length; i++) {
        for (var k = 0; k < value.length; k++) {
          if (value[k]['field'] == columnCheckedArray[i]) {
            var newObj = {};
            newObj['field'] = columnCheckedArray[i];
            newObj['hide'] = false;
            newObj['displayName'] = value[k]['displayName'];
            visibleColumnArray.push(newObj);
          }
        }
      }
      for (var j = 0; j < columnUnCheckedArray.length; j++) {
        for (var k = 0; k < value.length; k++) {
          if (value[k]['field'] == columnUnCheckedArray[j]) {
            var newObj = {};
            newObj['field'] = columnUnCheckedArray[j];
            newObj['hide'] = true;
            newObj['displayName'] = value[k]['displayName'];
            hiddenColumnArray.push(newObj);
          }
        }
      }
    });
    changedColumnPreferenceArray = visibleColumnArray.concat(hiddenColumnArray);
    return changedColumnPreferenceArray
  }
  onColumnChange(value) {
      console.log("column change..");
    columnSelected = [];
    var columnArraySelected = value.value.checkedColumns;
    var columnArrayUnselected = value.value.unCheckedColumns;
    var finalColumnArray = [];
    finalColumnArray = this.columnPreferenceUpdate(columnArraySelected, columnArrayUnselected);
    if (columnSelected && columnSelected.length == 0) {
      columnSelected.push(finalColumnArray);
    }
    this.props.gridData.columnPreference(finalColumnArray);
  }

    render() {

            console.log("inside AV render function this.props:"+defaultOpenCount);
console.log(this.props);
        
            if (this.props.AV.columnDataIN && this.props.AV.columnDataOUT && this.props.AV.rowData) {

                // function rowOptions() {
                //   if (passData.gridData.selectedEntity.toLowerCase() === 'network') {
                //     return false;
                //   }
                //   else {
                //     return true;
                //   }
                // }
                //this.props.rowData
                let w = window.width;
                let h = window.height;
                let closeVar=true;
                let dataGrids = [];
                
                let rowModel = 'infinite';
                let passData = this.props;
                
                var uam = false;
                
                dataGrids.push(this.renderAssociationPanels(this.props.AV.rowData[0], 0, {SureName:'Incoming'}));
                                //console.log(this.props);
                
               dataGrids.push(this.renderAssociationPanels(this.props.AV.rowData[1], 1, {SureName:'Outgoing'}));
           if(this.props.AV.selectedUUIDData.DisplayName){
                var titleToShow=this.props.AV.selectedUUIDData.DisplayName;
              }
              else{
               var titleToShow=this.props.AV.selectedUUIDData.SureName;
              }

                return (

                    <div id = "associationViewComponent" >
                    
    
<div class='av_backspace' title='Back' onClick = {
                                (e) => {
                                    this.onClose(e, closeVar);
                                }
                            }></div>
                    <AppToolbarNew id = "wTitleOverlayPanelEV" title = {{
                            pageTitle: 'Associations',
                            subTitle: titleToShow}}
                    overlayPanel = {{ content: < div id = "detailsDiv" > < /div> }} / >
                                
                            {
                                dataGrids
                            }


                            <
                            /div>

                        )
                    }
                    else {

                        /*
        
        <div style={{ height: '400px' }} defaultOpen>
        {this.props.rowData[1][0].SureName}
        <DataGrid gridOptions={gridOptions2} id="my-datagrid-id" />
      </div>
        <Snackbar id="snackbarID" dataList={[{message: "ExpansionPanel loaded successfully.."}]} />*/
                        /*{this.ajaxWaiting && this.props.gridData.selectedEntity =='users' && waiting(this.state) }*/
                        return waiting(this.state, this.props.onClose);
                    }

                    // <ProgressIndicatorCircular name="testtt" height='90' defaultOpen={true} onExpand={onExpand()} />

                    function waiting(stateObj, onClose) {
                        console.log(stateObj);
                        return ( <div id="snackbarID"></div> );
                    }


                }

            }


            function mapStateToProps(state) {
                let AVobj = {AV:{}};
                console.log("inside mapstatetoprops:");
                console.log(state);
                
                if (state.associationViewReducer.columnDataAVIN && state.associationViewReducer.columnDataAVOUT && state.associationViewReducer.rowDataAV) {
if(state.associationViewReducer.selectedEntityData=="EquipmentHierarchy"){
                   
                    AVobj.AV.columnDataIN = state.associationViewReducer.columnDataAVIN;
                      AVobj.AV.columnDataOUT = state.associationViewReducer.columnDataAVOUT;
                    AVobj.AV.rowData = state.associationViewReducer.rowDataAV;
                    AVobj.AV.traversalEntity = state.associationViewReducer.traversalEntity;
                    AVobj.AV.selectedEntityData = state.associationViewReducer.selectedEntityData;

                    AVobj.AV.selectedUUIDData = state.associationViewReducer.selectedUUIDData;
                    
                    
                }
                }
                console.log(AVobj);
                return AVobj;
            }

            

            function mapDispatchToProps(dispatch) {

                return bindActionCreators({
                   
                    
                    associationData: associationData


                }, dispatch);
            }

// CustomCellRenderer for Severity Column
function colorComparator(hexValue1, hexValue2) {
  let hexValueA = hexValue1.substring(1, 7);
  let hexValueB = hexValue2.substring(1, 7);
  hexValueA = parseInt(hexValueA, 16);
  hexValueB = parseInt(hexValueB, 16);

  return hexValueB - hexValueA;
}

function CustomCellRenderer(params) {
  let image;
    
    /*PLANNED
RESERVED
TERMINATED
INSTALLED
RETIRED*/
  if (params.value === 'CRITICAL') {
    image = 'ic_critical_kpi';
  } else if (params.value === 'MINOR') {
    image = 'ic_minor_kpi';
  } else if (params.value === 'MAJOR') {
    image = 'ic_major_kpi';
  } else if (params.value === 'CLEARED') {
    image = 'ic_cleared_kpi';
  }
    else if (params.value === 'WARNING') {
    image = 'ic_warning_kpi';
  }
    else if (params.value === 'INDETERMINATE') {
    image = 'ic_indeterminate_kpi';
  }
    else if (params.value === 'INFORMATION') {
    image = 'ic_info_kpi';
  }
     else if (params.value === 'CONDITION') {
    image = 'ic_condition_kpi';
  }
  return (
    <div
      style={{
        backgroundColor: params.value,
        width: '8px',
        height: '40px',
        marginTop: '-14px',
      }}
    >
      <div title={params.value}
        style={{
          marginLeft: '28px',
          marginTop: '1px'
        }}
      >
        <SvgIcon
          id={'icon-${params.rowIndex}'}
          icon={image}
          retainIconColor
          iconWidth={37}
          iconHeight={37}
        />
      </div>
    </div>
  );
}




            export default connect(mapStateToProps, mapDispatchToProps)(AssociationViewContainer);
