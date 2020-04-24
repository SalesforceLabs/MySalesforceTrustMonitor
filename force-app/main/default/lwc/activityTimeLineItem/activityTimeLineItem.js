import { LightningElement, api, track } from 'lwc';

export default class ActivityTimeLineItem extends LightningElement {
    @api theRecord;
    @api title;
    @api dateValue;
    @track expanded;
    @api isMaintenance;
    @api isIncident;

    connectedCallback(){
        this.expanded = false;
    } 

    toggleDetailSection(){
        this.expanded = !this.expanded;
    }

    get serviceKeys(){
        return this.theRecord.serviceKeys.join(", ");
    }
}