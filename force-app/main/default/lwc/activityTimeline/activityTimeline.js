import { LightningElement, api } from 'lwc';

export default class ActivityTimeline extends LightningElement {
    @api maintenances;
    @api incidents;
    @api showMaintenances;
    @api showIncidents;

    get incidentExists(){
        if(typeof this.incidents === "undefined"){
            return false;
        }
        else if(this.incidents.length > 0){
            return true;
        }
        else if (this.incidents.length === 0) {
            return false;
        }
    }
    get maintenanceExists(){
        if(typeof this.maintenances === "undefined"){
            return false;
        }
        else if(this.maintenances.length > 0){
            return true;
        }
        else if (this.maintenances.length === 0) {
            return false;
        }
    }
}