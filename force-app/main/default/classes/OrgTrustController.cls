public with sharing class OrgTrustController {
  public OrgTrustController() {
  }

  private enum OrgKeyType {
    DOMAIN,
    INSTANCE,
    POD,
    MID
  }

  @AuraEnabled(cacheable=true)
  public static string retrieveOrgTrustStatus(
    String instanceKey,
    String keyType
  ) {
    String URL_BASE = 'https://api.status.salesforce.com/v1/';
    String URL_STATUS = '/status';
    String URL_ENDPOINT;

    System.debug('KeyType => ' + keyType + ' InstanceKey => ' + instanceKey);

    if (OrgKeyType.DOMAIN.name().equals(keyType)) {
      URL_ENDPOINT = URL_BASE + 'instanceAliases/' + instanceKey + URL_STATUS;
    } else if (OrgKeyType.INSTANCE.name().equals(keyType)) {
      URL_ENDPOINT =
        URL_BASE +
        'instances/' +
        instanceKey +
        URL_STATUS +
        '?childProducts=true';
    }

    Http http = new HTTP();
    HttpRequest request = new HttpRequest();
    request.setEndpoint(URL_ENDPOINT);
    request.setMethod('GET');
    String results;
    HttpResponse response = http.send(request);
    if (response.getStatusCode() == 200) {
      System.debug('Response Body => ' + response.getBody());
      results = response.getBody();
    }
    return results;
  }
}
