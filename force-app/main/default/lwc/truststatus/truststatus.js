import { LightningElement } from "lwc";
import { api, track, wire } from "lwc";

const QUERY_URL = "https://api.status.salesforce.com/v1/instanceAliases/";
const STATUS = "/status";

export default class Truststatus extends LightningElement {
  columns = [
    {
      label: "Maintnance Id",
      fieldName: "id",
      type: "Number"
    },
    {
      label: "Planned Maintenance Start",
      fieldName: "plannedStartTime"
    },
    {
      label: "Planned Maintenance End",
      fieldName: "plannedEndTime"
    }
  ];

  @api instanceId;
  @track instanceStatus;
  @track instanceStatusString;
  @track accountId;
  @track maintenanceList = [
    // { id: 123, plannedStartTime: 2 / 22 / 2020, plannedEndTime: "2/23/2020" }
  ];

  connectedCallback() {
    this.retrieveInstanceStatus();
  }

  retrieveInstanceStatus() {
    fetch(
      QUERY_URL + (this.instanceId != null ? this.instanceId : "NWNA") + STATUS
    )
      .then(response => {
        if (!response.ok) {
          this.error = response;
          console.log("Error occured while fetching the instane");
        }
        return response.json();
      })
      .then(jsonResponse => {
        console.log(jsonResponse);
        this.instanceStatus = jsonResponse;
        this.instanceStatusString = JSON.stringify(this.instanceStatus);
        this.processResponse(jsonResponse);
      })
      .catch(error => {
        this.error = error;
        console.log("Error" + this.error);
      });
  }

  processResponse(results) {
    // alert("Process" + results.Maintenances.length);
    let maintenances = [];
    for (let mCnt = 0; mCnt < results.Maintenances.length; mCnt++) {
      let mRes = results.Maintenances[mCnt];
      maintenances.push({
        id: mRes.id.toString(),
        plannedStartTime: mRes.plannedStartTime,
        plannedEndTime: mRes.plannedEndTime
      });
    }
    this.maintenanceList = this.maintenanceList.concat(maintenances);
    console.log("maintenanceList" + JSON.stringify(this.maintenancesList));
  }
}
