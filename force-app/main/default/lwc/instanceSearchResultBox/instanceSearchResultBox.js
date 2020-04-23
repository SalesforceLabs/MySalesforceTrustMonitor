import { LightningElement , api, wire} from 'lwc';

export default class InstanceSearchResultBox extends LightningElement {
    @api sfdcinstances;
    @api title;
    @api instances;
    @api domains;

    get showApiResults(){
        if(typeof this.sfdcinstances === "undefined" || this.sfdcinstances === null)  {
          return false;
        }
        else if (this.sfdcinstances.length === 0){
          return true;
        }
        else if (this.sfdcinstances.length > 0){
          return true;
        }
    }

}