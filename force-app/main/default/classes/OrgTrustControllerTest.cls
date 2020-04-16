@isTest
public class OrgTrustControllerTest {
  @isTest
  static void testRetrieveOrgTrustStatusWithDomain() {
    StaticResourceCalloutMock mock = new StaticResourceCalloutMock();
    mock.setStaticResource(OrgTrustStaticMockResponse);
    mock.setStatusCode(200);
    mock.setHeader('Content-Type', 'application/json');

    Test.setMock(HttpCalloutMock.class, mock);
    HttpRsponse res = OrgTrustController.retrieveOrgTrustStatus(
      'LWCHub',
      'DOMAIN'
    );
    System.assetEquals(res.getBody().key(), 'NA109');
  }

  @isTest
  static void testRetrieveOrgTrustStatusWithInstance() {
    StaticResourceCalloutMock mock = new StaticResourceCalloutMock();
    mock.setStaticResource(OrgTrustStaticMockResponse);
    mock.setStatusCode(200);
    mock.setHeader('Content-Type', 'application/json');

    Test.setMock(HttpCalloutMock.class, mock);
    HttpRsponse res = OrgTrustController.retrieveOrgTrustStatus(
      'NA109',
      'Instance'
    );
    System.assetEquals(res.getBody().key(), 'NA109');
  }
}
