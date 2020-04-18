/* eslint-disable no-console */
import { LightningElement, api, track, wire } from "lwc";
import retrieveOrgTrustStatus from "@salesforce/apex/OrgTrustController.retrieveOrgTrustStatus";
import { CurrentPageReference } from "lightning/navigation";
import { registerListener, unregisterAllListeners } from "c/pubsub";
import {
  getProductLabel,
  getServiceLabel,
  getServiceVariant,
  getStatusIcon
} from "./truststatusutility";

import getCurrentOrg from "@salesforce/apex/OrgTrustController.getCurrentOrg";

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
    this.status = getStatusIcon(status);
    this.statusVariant = getServiceVariant(status);
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
    updatedAt,
    instanceKeys,
    serviceKeys,
    impacts
  ) {
    this.id = id;
    this.message = message;
    this.externalId = externalId;
    this.affectsAll = affectsAll;
    this.isCore = isCore;
    this.additionalInfo = additionalInfo;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.instanceKeys = instanceKeys;
    this.serviceKeys = serviceKeys;
    this.impacts = impacts;
  }
  get hasMessage() {
    return this.message.length > 0 ? true : false;
  }

  get hasImpacts() {
    return this.impacts.length > 0 ? true : false;
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
    this.status = getStatusIcon(status);
    this.statusVariant = getServiceVariant(status);
    this.isActive = isActive;
  }
}

class Maintenance {
  constructor(
    id,
    name,
    plannedStartTime,
    plannedEndTime,
    type,
    instanceKeys,
    serviceKeys
  ) {
    this.id = id;
    this.name = name;
    this.plannedStartTime = plannedStartTime;
    this.plannedEndTime = plannedEndTime;
    this.type = type;
    this.instanceKeys = instanceKeys;
    this.serviceKeys = serviceKeys;
  }
}

export default class Truststatus extends LightningElement {
  /*maintenanceCols = [
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
  */

  @wire(CurrentPageReference) pageRef;
  @api instanceKey;
  @api keyType;
  @track instanceStatus;
  @track instanceStatusString;
  @track accountId;
  @track maintenances = [];
  @track instanceInfo = {};
  @track products = [];
  @track services = [];
  @track incidents = [];
  @track instance;
  @track error;

  connectedCallback() {
    this.keyType = "INSTANCE";
    // subscribe to bearListUpdate event
    registerListener("getStatus", this.handleGetStatus, this);
  }

  disconnectedCallback() {
    // unsubscribe from bearListUpdate event
    unregisterAllListeners(this);
  }

  handleGetStatus(eventData) {
    this.maintenances = [];
    this.products = [];
    this.incidents = [];
    this.services = [];
    this.instanceInfo = {};

    this.instanceKey = eventData.instanceKey;
    this.keyType = eventData.keyType;
  }

  @wire(getCurrentOrg, {})
  wiredGetCurrentOrg({ error, data }) {
    if (data) {
      this.instanceKey = data;
    } else if (error) {
      this.error = error;
    }
  }

  @wire(retrieveOrgTrustStatus, {
    instanceKey: "$instanceKey",
    keyType: "$keyType"
  })
  wiredRetrieveOrgTrustStatus({ error, data }) {
    console.debug("Data => " + JSON.stringify(data));
    if (data) {
      console.debug(JSON.stringify(data));
      this.processMaintenances(data);
      this.processProducts(data);
      this.processIncidents(data);
      this.processInstanceInfo(data);
      this.processServices(data);
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
        this.processMaintenances(jsonResponse);
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

  processMaintenances(results) {
    let maintenanceList = [];
    let mRes;
    // eslint-disable-next-line guard-for-in
    for (let mCnt in results.Maintenances) {
      mRes = results.Maintenances[mCnt];
      maintenanceList.push(
        new Maintenance(
          mRes.id,
          mRes.name,
          mRes.plannedStartTime,
          mRes.plannedEndTime,
          mRes.message.maintenanceType,
          mRes.instanceKeys,
          mRes.serviceKeys
        )
      );
    }
    this.maintenances = this.maintenances.concat(maintenanceList);
    //  console.debug("maintenances" + JSON.stringify(this.maintenances));
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
      product = new Product(
        getProductLabel(prod.key),
        prod.order,
        prod.isActive
      );
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
      service = new Service(
        getServiceLabel(serv.key),
        serv.order,
        serv.isCore,
        results.status
      );
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
      incident = new Incident(
        inc.id,
        inc.message,
        inc.externalId,
        inc.affectsAll,
        inc.isCore,
        inc.additionalInformation,
        inc.createdAt,
        inc.updatedAt,
        inc.instanceKeys,
        inc.serviceKeys,
        inc.IncidentImpacts
      );
      if (incident) {
        incidentList.push(incident);
      }
    }
    this.incidents = this.incidents.concat(incidentList);
  }
}
