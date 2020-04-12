/* eslint-disable no-console */
import { LightningElement, api, track, wire } from "lwc";
import retrieveOrgTrustStatus from "@salesforce/apex/OrgTrustController.retrieveOrgTrustStatus";

const QUERY_URL = "https://api.status.salesforce.com/v1/instanceAliases/";
const STATUS = "/status";

class Product {
  constructor(name, order, isActive) {
    this.name = name;
    this.order = order;
    this.isActive = isActive;
    this.status = this.isActive ? "utility:success" : "utility:error";
    this.statusVariant = this.isActive ? "success" : "error";
  }
}

class Service {
  constructor(name, order, isCore, status) {
    this.name = name;
    this.order = order;
    this.isCore = isCore;
    // eslint-disable-next-line eqeqeq
    this.status = status == "OK" ? "utility:success" : "utility:error";
    // eslint-disable-next-line eqeqeq
    this.statusVariant = status == "OK" ? "success" : "error";
  }
}

class Incident {
  constructor(
    id,
    message,
    externalId,
    affectsAll,
    isCore,
    additionalInfo,
    createdAt,
    updatedAt
  ) {
    this.id = id;
    this.message = message;
    this.externalId = externalId;
    this.affectsAll = affectsAll;
    this.isCore = isCore;
    this.additionalInfo = additionalInfo;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}

class Instance {
  constructor(
    instanceName,
    location,
    environment,
    releaseVersion,
    releaseNumber,
    status,
    isActive
  ) {
    this.name = instanceName;
    this.location = location;
    this.environment = environment;
    this.releaseVersion = releaseVersion;
    this.releaseNumber = releaseNumber;
    // eslint-disable-next-line eqeqeq
    this.status = status == "OK" ? "utility:success" : "utility:error";
    // eslint-disable-next-line eqeqeq
    this.statusVariant = status == "OK" ? "success" : "error";
    this.isActive = isActive;
  }
}

class Maintenance {
  constructor(id, name, plannedStartTime, plannedEndTime, type) {
    this.id = id;
    this.name = name;
    this.plannedStartTime = plannedStartTime;
    this.plannedEndTime = plannedEndTime;
    this.type = type;
  }
}

export default class Truststatus extends LightningElement {
  maintenanceCols = [
    {
      label: "Name",
      fieldName: "name",
      type: "String"
    },
    {
      label: "Type",
      fieldName: "type"
    },
    {
      label: "Start Time",
      fieldName: "plannedStartTime"
    },
    {
      label: "End Time",
      fieldName: "plannedEndTime"
    }
  ];

  @api instanceKey = "NWNA";
  @api keyType = "DOMAIN";
  @track instanceStatus;
  @track instanceStatusString;
  @track accountId;
  @track maintenanceList = [];
  @track instanceInfo = {};

  @track products = [];
  @track services = [];
  @track incidents = [];
  @track instance;
  @track error;

  /*
  connectedCallback() {
    //  this.retrieveInstanceStatus();
  }
*/
  @wire(retrieveOrgTrustStatus, {
    instanceKey: "$instanceKey",
    keyType: "$keyType"
  })
  wiredRetrieveOrgTrustStatus({ error, Data }) {
    if (Data) {
      console.debug(JSON.stringify(Data));
      this.processResponse(Data);
      this.processProducts(Data);
      this.processIncidents(Data);
      this.processInstanceInfo(Data);
      this.processServices(Data);
    } else if (error) {
      this.error = error;
    }
  }

  retrieveInstanceStatus() {
    fetch(
      QUERY_URL +
        (this.instanceKey != null ? this.instanceKey : "NWNA") +
        STATUS
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
        this.processProducts(jsonResponse);
        this.processIncidents(jsonResponse);
        this.processInstanceInfo(jsonResponse);
        this.processServices(jsonResponse);
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
      maintenances.push(
        new Maintenance(
          mRes.id,
          mRes.name,
          mRes.plannedStartTime,
          mRes.plannedEndTime,
          mRes.message.maintenanceType
        )
      );
      /*  {
        id: mRes.id.toString(),
        name: mRes.name,
        plannedStartTime: mRes.plannedStartTime,
        plannedEndTime: mRes.plannedEndTime
      });*/
    }
    this.maintenanceList = this.maintenanceList.concat(maintenances);
    console.debug("maintenanceList" + JSON.stringify(this.maintenanceList));
  }
  processInstanceInfo(results) {
    this.instance = new Instance(
      results.key,
      results.location,
      results.environment,
      results.releaseVersion,
      results.releaseNumber,
      results.status,
      results.isActive
    );
  }

  processProducts(results) {
    let product;
    let productList = [];
    let prod;
    // eslint-disable-next-line guard-for-in
    for (let pCnt in results.Products) {
      prod = results.Products[pCnt];
      product = new Product(prod.key, prod.order, prod.isActive);
      if (product) {
        productList.push(product);
      }
    }
    this.products = this.products.concat(productList);
  }

  processServices(results) {
    let service;
    let serviceList = [];
    let serv;
    // eslint-disable-next-line guard-for-in
    for (let sCnt in results.Services) {
      serv = results.Services[sCnt];
      service = new Service(serv.key, serv.order, serv.isCore, results.status);
      if (service) {
        serviceList.push(service);
      }
    }
    this.services = this.services.concat(serviceList);
    console.debug("Services => " + this.services);
  }

  processIncidents(results) {
    let incident;
    let incidentList = [];
    let inc;
    // eslint-disable-next-line guard-for-in
    for (let iCnt in results.Incidents) {
      inc = results.Incidents[iCnt];
      incident = new Incident(inc.key, inc.order, inc.isActive);
      if (incident) {
        incidentList.push(incident);
      }
    }
    this.incidents = this.incidents.concat(incidentList);
  }
}
