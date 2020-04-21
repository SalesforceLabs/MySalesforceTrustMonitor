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

  @isTest
  static void testGetFavoritesList() {
    SFInstance__c sfInstance = new SFInstance__c();
    sfInstance.Name = 'NA111';
    sfInstance.Instance_Key_Type__c = 'Instance';
    sfInstance.Alias__c = 'LWCLearners';
    insert sfInstance;

    List<OrgTrustController.SFDCInstance> sfdcInstances = OrgTrustController.getFavoritesList();

    System.assert(sfdcInstances.size() > 0);
    for (OrgTrustController.SFDCInstance sfdcinstance : sfdcInstances) {
      if (sfInstance.Id == sfdcinstance.sfId) {
        System.assertEquals(sfInstance.Name, sfdcInstance.instanceKey);
      }
    }
  }
}
