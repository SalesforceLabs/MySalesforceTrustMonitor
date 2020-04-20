import { LightningElement, api, track } from 'lwc';

export default class ActivityTimeLineItem extends LightningElement {
    @api maintenance;
    @track expanded;

    connectedCallback(){
        this.expanded = false;
    } 

    toggleDetailSection(){
        this.expanded = !this.expanded;
    }
}