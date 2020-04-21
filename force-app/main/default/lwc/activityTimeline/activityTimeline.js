import { LightningElement, api } from 'lwc';

export default class ActivityTimeline extends LightningElement {
    @api maintenances;
    @api incidents;

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
}