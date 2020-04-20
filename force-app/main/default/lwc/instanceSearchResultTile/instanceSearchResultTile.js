import { LightningElement, api, wire } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { createRecord } from 'lightning/uiRecordApi';
import { deleteRecord } from 'lightning/uiRecordApi';
import { reduceErrors } from 'c/ldsUtils';
import SFINSTANCE_OBJECT from '@salesforce/schema/SFInstance__c';
import NAME_FIELD from '@salesforce/schema/SFInstance__c.Name';
import INSTANCE_KEY_TYPE__c_FIELD from '@salesforce/schema/SFInstance__c.Instance_Key_Type__c';
import OWNERID_FIELD from '@salesforce/schema/SFInstance__c.OwnerId';
import ALIAS__c_FIELD from '@salesforce/schema/SFInstance__c.Alias__c';
import { NavigationMixin,CurrentPageReference } from 'lightning/navigation';
import { fireEvent} from 'c/pubsub';
import Id from '@salesforce/user/Id';

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
    @api sfId;
    sfInstance__cId;

    @wire(CurrentPageReference) pageRef;

    get isFavorite(){
        if(typeof this.sfId === "undefined"){
            return false
        }
        else{
            return true;
        }
    }

    get cardTitle(){
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

    removeFavorite(event){
        event.preventDefault();
        const recordId = event.target.dataset.sfid;
        deleteRecord(recordId)
        .then(()=>{
            this.dispatchEvent(
                new ShowToastEvent({
                    title: 'Success',
                    message: 'Favorite Removed !',
                    variant: 'success'
                })
            );
            this.dispatchEvent(new CustomEvent('refreshlist'));
        })
        .catch((error) => {
            this.dispatchEvent(
                new ShowToastEvent({
                    title: 'Error removing favorite !',
                    message: reduceErrors(error).join(', '),
                    variant: 'error'
                })
            );
        });
    }

    saveFavorite(event){
        event.preventDefault();
        const fields = {};
        fields[OWNERID_FIELD.fieldApiName] = Id;
        fields[NAME_FIELD.fieldApiName] = event.target.dataset.instancekey;
        fields[INSTANCE_KEY_TYPE__c_FIELD.fieldApiName] = event.target.dataset.keytype; 
        fields[ALIAS__c_FIELD.fieldApiName] = event.target.dataset.alias;         
        const recordInput = { apiName: SFINSTANCE_OBJECT.objectApiName, fields };
        createRecord(recordInput)
        .then((SFInstance__c) => {
            this.sfInstance__cId = SFInstance__c.id;
            this.dispatchEvent(
                new ShowToastEvent({
                    title: 'Success',
                    message: 'Marked as Favorite !',
                    variant: 'success'
                })
            );
        })
        .catch((error) => {
            this.dispatchEvent(
                new ShowToastEvent({
                    title: 'Error',
                    message: 'Instance key already exists !',
                    variant: 'error'
                })
            );
        });
    }
}