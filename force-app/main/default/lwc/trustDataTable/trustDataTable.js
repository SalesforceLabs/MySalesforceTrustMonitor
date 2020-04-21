import { LightningElement, api, track } from "lwc";

export default class TrustDataTable extends LightningElement {
  @api records;
  @api ismaintenance;
  @track recordCols;

  maintenanceCols = [
    {
      label: "Name",
      fieldName: "name",
      type: "String"
    },
    {
      label: "Start Time",
      fieldName: "plannedStartTime",
      type: "date",
      typeAttributes: {
        year: "2-digit",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit"
      }
    },
    {
      label: "End Time",
      fieldName: "plannedEndTime",
      type: "date",
      typeAttributes: {
        year: "2-digit",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit"
      }
    }
  ];

  incidentCols = [
    {
      label: "Start Time",
      fieldName: "createdAt",
      type: "date",
      typeAttributes: {
        year: "2-digit",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit"
      }
    },
    {
      label: "IsCore",
      fieldName: "isCore",
      type: "boolean"
    },
    {
      label: "Affects All",
      fieldName: "affectsAll",
      type: "boolean"
    }
  ];
  connectedCallback() {
    this.recordCols =
      this.ismaintenance === "true" ? this.maintenanceCols : this.incidentCols;
  }
}
