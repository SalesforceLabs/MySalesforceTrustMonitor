let productLabelMap = new Map();
productLabelMap.set("Sales_Cloud","Sales Cloud");
productLabelMap.set("Service_Cloud","Service Cloud");
productLabelMap.set("LiveAgent_Omni-Channel","LiveAgent / Omni Channel");
productLabelMap.set("Community_Cloud","Community Cloud");
productLabelMap.set("Einstein_Analytics","Einstein Analytics");
productLabelMap.set("B2C_Commerce_Cloud","B2C Commerce Cloud");
productLabelMap.set("Financial_Services_Cloud","Financial Services Cloud");
productLabelMap.set("Health_Cloud","Health Cloud");
productLabelMap.set("Lightning_Platform","Lightning Platform");
productLabelMap.set("Social_Studio","Social Studio");
productLabelMap.set("CPQ_and_Billing","CPQ and Billing");
productLabelMap.set("Marketing_Cloud","Marketing Cloud");
const getProductLabel = (label) => {
    let productName;
    productName = productLabelMap.get(label);
    if (typeof productName === "undefined" ){
        return label;
    }
    else{
        return productName;
    }
};


let serviceLabelMap = new Map();
serviceLabelMap.set("coreService","Core Service");
serviceLabelMap.set("liveAgent","Live Agent");
serviceLabelMap.set("B2CCore","B2C Core");
serviceLabelMap.set("AccountManager","Account Manager");
serviceLabelMap.set("CartService","Cart Service");
serviceLabelMap.set("eCDN","ECDN");
serviceLabelMap.set("search","Search");
serviceLabelMap.set("analytics","Analytics");
serviceLabelMap.set("CommandCenter","Command Center");
serviceLabelMap.set("SocialHub","Social Hub");
serviceLabelMap.set("SocialStudio","Social Studio");
serviceLabelMap.set("CPQandBilling","CPQ and Billing");
serviceLabelMap.set("SocialStudioAPI","Social Studio API");
serviceLabelMap.set("MarketingCloudCoreService","Marketing Cloud Core Service");
serviceLabelMap.set("MarketingCloudLogin","Marketing Cloud Login");
serviceLabelMap.set("MarketingCloudRESTAPI","Marketing Cloud REST API");
serviceLabelMap.set("MarketingCloudSOAPAPI","Marketing Cloud SOAP API");
const getServiceLabel = (label) => {
    let serviceName;
    serviceName = serviceLabelMap.get(label);
    if (typeof serviceName === "undefined" ){
        return label;
    }
    else{
        return serviceName;
    }
};

let statusVariantMap = new Map();
statusVariantMap.set("OK","success");
statusVariantMap.set("MAJOR_INCIDENT_CORE","error");
statusVariantMap.set("MINOR_INCIDENT_CORE","warning");
statusVariantMap.set("MAJOR_INCIDENT_NONCORE","error");
statusVariantMap.set("MINOR_INCIDENT_NONCORE","warning");
statusVariantMap.set("MAINTENANCE_CORE","warning");
statusVariantMap.set("MAINTENANCE_NONCORE","warning");
const getServiceVariant = (label) => {
    let statusVariant;
    statusVariant = statusVariantMap.get(label);
    if (typeof statusVariant === "undefined" ){
        return label;
    }
    else{
        return statusVariant;
    }
};

let statusIconMap = new Map();
statusIconMap.set("OK","utility:success");
statusIconMap.set("MAJOR_INCIDENT_CORE","utility:error");
statusIconMap.set("MINOR_INCIDENT_CORE","utility:warning");
statusIconMap.set("MAJOR_INCIDENT_NONCORE","utility:error");
statusIconMap.set("MINOR_INCIDENT_NONCORE","utility:warning");
statusIconMap.set("MAINTENANCE_CORE","standard:maintenance_plan");
statusIconMap.set("MAINTENANCE_NONCORE","standard:maintenance_plan");
const getStatusIcon = (label) => {
    let statusIcon;
    statusIcon = statusIconMap.get(label);
    if (typeof statusIcon === "undefined" ){
        return label;
    }
    else{
        return statusIcon;
    }
};

export { getProductLabel, getServiceLabel, getServiceVariant, getStatusIcon };
