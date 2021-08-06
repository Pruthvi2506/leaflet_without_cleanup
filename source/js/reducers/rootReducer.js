import { combineReducers } from 'redux';
import equipmentMapReducer from './equipmentMapReducer';
import gridColumnReducer from './gridColumnReducer';
import geoMapReducer from './geoMapReducer';
import topologyMapReducer from './topologyMapReducer';
import searchReducer from './searchReducer';
import crudReducer from "./crudReducer";
import userGroupReducer from "./userGroupReducer";
import addProfilesReducer from "./addProfilesReducer";
import tenantMgmtReducer from "./tenantMgmtReducer";
import equipmentViewReducer from './equipmentViewReducer';
import associationViewReducer from './associationViewReducer';
import globalSearchReducer from './globalSearchReducer';
import openPopupReducer from './openPopupReducer';
import treeViewReducer from './treeViewReducer';
import topologyReducer from './topologyReducer';
/*
 * We combine all reducers into a single object before updated data is dispatched (sent) to store
 * Your entire applications state (store) is just whatever gets returned from all your reducers
 * */

const allReducers = combineReducers({
        equipmentMap: equipmentMapReducer,		
        dataGrid : gridColumnReducer,
		geoMap:geoMapReducer,
		topologyMap: topologyMapReducer,
        search: searchReducer,
        createUser:crudReducer,
        userGroup:userGroupReducer,
        addProfiles:addProfilesReducer,
        tenantCreate:tenantMgmtReducer,
        equipmentView:equipmentViewReducer,
    	associationViewReducer: associationViewReducer,
        globalSearch:globalSearchReducer,
        popupSearch:openPopupReducer,
        treeView:treeViewReducer,
        topology:topologyReducer
});

export default allReducers
