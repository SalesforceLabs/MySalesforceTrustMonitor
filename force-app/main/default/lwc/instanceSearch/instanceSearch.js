import { LightningElement,api,track,wire} from 'lwc';
import getInstanceList from '@salesforce/apex/OrgTrustController.getInstanceList';
import getFavoritesList from '@salesforce/apex/OrgTrustController.getFavoritesList';

export default class InstanceSearch extends LightningElement {
    @track title = 'Salesforce Trust Monitoring!';
    
    @track sfdcinstances;
    @track error;
    inputString = '';
    @track instances;
    @track domains;
    @track searchBoxTitle;

    connectedCallback() {
        console.log('loaded'+ this.inputString);
        this.handleFavorites();
    }

    handleKeyUp(event){       
        const isEnterKey = event.keyCode === 13;
        if (isEnterKey) {
            this.inputString = event.target.value;
            if (this.inputString !== ""){
                this.handleSearch ();               
            }
            else if (this.inputString === ""){
                this.handleFavorites();               
            }
        }
    }

    handleKeyChange(event) {
        this.inputString = event.target.value;
    }

    
    handleSearch (){
        this.sfdcinstances = null;
        this.instances = null;
        this.domains = null;
        if (this.inputString !== ""){
            this.handleSearchResults ();
        }
        else if (this.inputString === ""){
            this.handleFavorites();
        }
    };

    handleSearchResults(){
        this.searchBoxTitle = 'Search Results';
        console.log('called search'+ this.inputString);
        this.sfdcinstances = null;
        this.instances = null;
        this.domains = null;
        if (this.inputString !== ""){
            getInstanceList({inputString : this.inputString})
            .then(result => {
                this.sfdcinstances = result;
                this.populateResults();
            })
            .catch(error => {
                this.error = error;
            })
        }
    }

    handleFavorites(){
        this.searchBoxTitle = 'My Favorites';
        console.log('called favorites'+ this.inputString);
        this.sfdcinstances = null;
        this.instances = null;
        this.domains = null;
        if (this.inputString === ""){
            getFavoritesList()
            .then(result =>{
                this.sfdcinstances = result;
                this.populateResults();
            })
            .catch(error => {
                this.error = error;
            })
        }
    }

    populateResults(){
        var instanceArray = new Array();
        var domainArray = new Array();
        if (typeof this.sfdcinstances !== 'undefined')   {                          
            this.sfdcinstances.forEach(function(item) {
                if(typeof item.aliasType === "undefined"){
                    var instance = new Object();
                    instance.id = item.id;
                    instance.keyx = item.key;
                    instance.location = item.location;
                    instance.environment = item.environment;
                    instance.isActive = item.isActive;
                    instance.type = item.type;
                    instance.isInstance = true;
                    if (typeof item.sfId !== "undefined"){
                        instance.sfId = item.sfId;
                    }
                    instanceArray.push(instance);
                }
                else{
                    var domain = new Object();
                    domain.id = item.id;
                    domain.alias = item.alias;
                    domain.instanceKey = item.instanceKey;
                    domain.type = item.type;
                    domain.aliasType = item.aliasType;
                    domain.isInstance = false;
                    if (typeof item.sfId !== "undefined"){
                        domain.sfId = item.sfId;
                    }
                    domainArray.push(domain);
                }
            });
        }
        if (instanceArray.length>0)   {
            this.instances = instanceArray;
        }
        else{
            this.instances = null;
        }
        if (domainArray.length>0){
            this.domains = domainArray;
        }
        else{
            this.domains = null;
        }
    }
}