import { LightningElement, api, wire } from 'lwc';

import { NavigationMixin,CurrentPageReference } from 'lightning/navigation';
import { fireEvent} from 'c/pubsub';

export default class InstanceSearchResultTile extends LightningElement {
    @api keyx;
    @api location;
    @api environment;
    @api isActive;
    @api type;
    @api alias;
    @api instanceKey;
    @api aliasType;
    @api isInstance;

    @wire(CurrentPageReference) pageRef;

    get cardTitle(){
        /*if(typeof aliasType === "undefined"){
            return this.keyx;
        }
        else{
            return (this.alias +' | ' + this.instanceKey);
        }*/
        if (this.isInstance)   {
            return this.keyx;
        }
        else{
            return (this.alias +' | ' + this.instanceKey);
        }
    }

    getStatus(event){
        event.preventDefault();
        var eventData = new Object();
        eventData.instanceKey = event.target.dataset.instancekey;
        eventData.keyType = event.target.dataset.keytype;       
        console.log(event.target.dataset.instancekey+JSON.stringify(eventData));
        fireEvent(this.pageRef,'getStatus',eventData);
    }
}