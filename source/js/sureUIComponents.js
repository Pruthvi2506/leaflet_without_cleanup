/**
 * Sure UI Components
 *
 * @namespace sureUI
 */


import React from 'react';
import reactDom from 'react-dom';
import '../styles/sureUIComponents.css'
import '@nokia-csf-uxr/csfWidgets/csfWidgets.css'
import EquipmentMap from './components/equipmentMap.jsx';
import StatusPanel from './components/statusPanel.jsx';
import DataGridList from './components/dataGrid.jsx';
import GeoMap from './components/geoMap.jsx';
import TopologyMap from './components/topologyMap.jsx';
import DetailsPanel from './components/detailsPanel.jsx';
import Search from './components/search.jsx';
import ModalWindow from './components/modalWindow.jsx';
import TenantScreen from './components/tenantScreen.jsx';
import CreateUser from './components/createUser.jsx';
import UserGroup from './components/userGroup.jsx';
import AddProfiles from './components/addProfiles.jsx';
import TenantMgmt from './components/tenantMgmt.jsx';
import TopologyModal from "./components/topologyModal.jsx"
import Settings from "./components/settings.jsx";
import EquipmentView from './components/equipmentView.jsx';
import EmailSetting from './components/emailSettings.jsx';
import EquipmentViewModal from './components/equipmentViewModal.jsx';
import AssociationView from './components/associationView.jsx';
import GlobalSearch from './components/globalSearch.jsx';
import OpenPopup from './components/openPopup.jsx';
import TreeView from './components/treeView.jsx';
import Topology from './components/Topology.jsx';


const SUREUI = {
    components: {
        EquipmentMap: EquipmentMap,
     	DataGridList : DataGridList,
        StatusPanel: StatusPanel,
		GeoMap : GeoMap,
        TopologyMap : TopologyMap,
        DetailsPanel : DetailsPanel,
        Search : Search,
        OpenPopup:OpenPopup,
        TreeView:TreeView,
        ModalWindow : ModalWindow,
        TenantScreen : TenantScreen,
        UserGroup : UserGroup,
        AddProfiles : AddProfiles,
        CreateUser :CreateUser,
        TenantMgmt:TenantMgmt,
        TopologyModal: TopologyModal,
        Settings: Settings,
        EquipmentView: EquipmentView,
        EmailSetting:EmailSetting,
        EquipmentViewModal: EquipmentViewModal,
        AssociationView: AssociationView,
        GlobalSearch:GlobalSearch,
        Topology:Topology
    }
}
/**
 *3rd party libraries
 *@namespace sureUI.external
 */
SUREUI.external = {
    csfWidgets: require('@nokia-csf-uxr/csfWidgets')
} 

export {
    SUREUI,
    EquipmentMap, 
    StatusPanel,
	DataGridList,
	GeoMap,
    TopologyMap,
    DetailsPanel,
    Search,
    OpenPopup,
    TreeView,
    ModalWindow,
    TenantScreen,
    CreateUser,
    UserGroup,
    AddProfiles,
    TenantMgmt,
    TopologyModal,
    Settings,
    EquipmentView,
    EmailSetting,
    EquipmentViewModal,
    AssociationView,
    GlobalSearch,
	Topology
}

window.SUREUI = SUREUI



