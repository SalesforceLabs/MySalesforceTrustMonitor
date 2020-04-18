@isTest
public class OrgTrustControllerTest {
  @isTest
  static void testRetrieveOrgTrustStatusWithDomain() {
    StaticResourceCalloutMock mock = new StaticResourceCalloutMock();
    mock.setStaticResource('OrgTrustStaticMockResponse');
    mock.setStatusCode(200);
    mock.setHeader('Content-Type', 'application/json');

    Test.setMock(HttpCalloutMock.class, mock);
    Map<String, Object> results = OrgTrustController.retrieveOrgTrustStatus(
      'LWCHub',
      'DOMAIN'
    );
    System.assertEquals(results.get('key').toString(), 'NA109');
  }

  @isTest
  static void testRetrieveOrgTrustStatusWithInstance() {
    StaticResourceCalloutMock mock = new StaticResourceCalloutMock();
    mock.setStaticResource('OrgTrustStaticMockResponse');
    mock.setStatusCode(200);
    mock.setHeader('Content-Type', 'application/json');

    Test.setMock(HttpCalloutMock.class, mock);
    Map<String, Object> results = OrgTrustController.retrieveOrgTrustStatus(
      'NA109',
      'INSTANCE'
    );
    System.assertEquals(results.get('key').toString(), 'NA109');
  }

  @isTest
  static void testGetInstanceList() {
    StaticResourceCalloutMock mock = new StaticResourceCalloutMock();
    mock.setStaticResource('OrgTrustInstancesStaticMockResponse');
    mock.setStatusCode(200);
    mock.setHeader('Content-Type', 'application/json');

    Test.setMock(HttpCalloutMock.class, mock);
    List<OrgTrustController.SFDCInstance> results = OrgTrustController.getInstanceList(
      'NA109'
    );
    if (results != null && !results.isempty()) {
      System.debug('results => ' + results);
      //   OrgTrustController.SFDCInstance org = new OrgTrustController().SFDCInstance;
      //  OrgTrustController.SFDCInstance instance = results[0];
      System.assertEquals(results[0].key, 'NA109');
    }
  }

  @isTest
  static void testGetCurrentOrg() {
    String orgName = [SELECT instanceName FROM Organization].instanceName;
    String currentOrgName = OrgTrustController.getCurrentOrg();
    System.assertEquals(orgName, currentOrgName);
  }
}
