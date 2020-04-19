import { LightningElement, wire } from "lwc";
import getFavoriteInstances from "@salesforce/apex/OrgTrustController.getFavoriteInstances";

export default class FavoriteInstances extends LightningElement {
  get FavoritesExists() {
    return this.sfInstances.length > 0 ? true : false;
  }

  @wire(getFavoriteInstances) sfInstances;
}
