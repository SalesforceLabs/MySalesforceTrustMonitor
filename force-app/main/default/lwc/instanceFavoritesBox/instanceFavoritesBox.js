import { LightningElement, api, track, wire } from 'lwc';
import getFavoritesList from "@salesforce/apex/OrgTrustController.getFavoritesList";
import { CurrentPageReference } from "lightning/navigation";
import { registerListener, unregisterAllListeners } from "c/pubsub";

export default class InstanceFavoritesBox extends LightningElement {   
    @api title;
    @track instances;
    @track domains;
    @track sfdcfavinstances;
    @track error;
    @wire(CurrentPageReference) pageRef;

    get showFavorites(){
        if (typeof this.sfdcfavinstances === "undefined" || this.sfdcfavinstances === null){
            return false;
        }
        else{
            return true;
        }
    }

    connectedCallback() {
        this.handleFavorites();
        registerListener("refreshFavoriteListEvent", this.handleFavorites, this);
    }

    disconnectedCallback() {
      // unsubscribe from bearListUpdate event
      unregisterAllListeners(this);
    }

    handleFavorites() {
        getFavoritesList()
        .then(result => {
            this.sfdcfavinstances = result;
            this.populateResults();
        })
        .catch(error => {
            this.error = error;
        });       
    }
    
    refreshFavInstanceList(){
        this.handleFavorites();
    }

    populateResults() {
        var instanceArray = new Array();
        var domainArray = new Array();
        
        if (typeof this.sfdcfavinstances !== "undefined") {
          this.sfdcfavinstances.forEach(function(item) {
            if (typeof item.aliasType === "undefined") {
              var instance = new Object();
              instance.id = item.id;
              instance.keyx = item.key;
              // changing the variable name location to instanceloc for checkmarx report
              instance.instanceloc = item.instanceloc;
              instance.environment = item.environment;
              instance.isActive = item.isActive;
              instance.type = item.type;
              instance.isInstance = true;
              if (typeof item.sfId !== "undefined") {
                instance.sfId = item.sfId;
                instance.id = item.sfId;
              }
              instanceArray.push(instance);
            } else {
              var domain = new Object();
              domain.id = item.id;
              domain.alias = item.alias;
              domain.instanceKey = item.instanceKey;
              domain.type = item.type;
              domain.aliasType = item.aliasType;
              domain.isInstance = false;
              if (typeof item.sfId !== "undefined") {
                domain.sfId = item.sfId;
                domain.id = item.sfId;
              }
              domainArray.push(domain);
            }
          });
        }

        if (instanceArray.length > 0) {
        this.instances = instanceArray;
        } else {
        this.instances = null;
        }
        if (domainArray.length > 0) {
        this.domains = domainArray;
        } else {
        this.domains = null;
        }       
    }
}