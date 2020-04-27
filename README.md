
# Introducing the My Salesforce Trust Monitor

An essential tool for Admins for monitoring trust.salesforce.com for personalized list of Salesforce instances and mydomains 
As Salesforce customers continue to use Salesforce at enterprise scale, customers are inevitably setting up many Salesforce instances across the enterprise for various lines of business, business units or some other logical areas. As the implementation and release timelines progress, it becomes harder for Salesforce Admin users to keep track of all the maintenances, alerts and notifications that are being updated on trust.salesforce.com website to plan their own timelines and communicate with their own users - internal or community users.
We have seen Salesforce Admins struggle with keeping up to all the activity happening for their own Salesforce instances and it is laborious to go to trust.salesforce.com type in every instance name every time and navigate to all the tabs that contain the information the admin is looking for and make sense of it so they can digest and apply that information for their own subset of Salesforce Orgs. There is a feature on trust.salesforce.com that Admin user can use to subscribe to the trust.salesforce.com notifications via emails but email notifications often get lost in deluge of daily emails that Admins receive in their inbox and sometimes end up in junk email or lower priority folders and get lost. Admin user then ends up in a situation where they get “behind” on these notifications and cannot find the email they received when their teams asks them if there is anything they need to worry about for their own release planning.
We recognize this pain point and we have created a solution for addressing this pain for Salesforce Admin users just for this purpose.
We have created an App and a standalone lightning component that can be included on any lightning page by the Admin user via simple drag and drop configuration and start monitoring only the Salesforce instances, mydomains, Marketing Instances [MIDs] and B2C Ecommerce PODs, they are interested in for their own enterprise.


## Features of the My Salesforce Trust Monitor

•	Out of the box by default your current Salesforce instance information is displayed without any configuration as soon as the App loads first time
•	You can search any production Salesforce instance [e.g. NA111] and add to list of your Favorites by clicking on the star icon next to the name of the instance
•	You can search any myDomain [e.g. heroku] and add to list of your Favorites by clicking on the star icon next to the name of the instance
•	You can search any Marketing Cloud Instance [e.g. DB23] and add to list of your Favorites by clicking on the star icon next to the name of the instance
•	You can search any B2C Commerce Cloud PODs [e.g. POD34] and add to list of your Favorites by clicking on the star icon next to the name of the instance
•	Multiple users can use the App or standalone component and their list of instances will be saved from each other
•	Responsive user interface that uses Salesforce Lightning Design Style system and will support using phone, tablet or Desktop screens


## Installation Instructions

Installation is fairly straightforward, you would follow the standard process of getting the link to package installation URL from AppExchange listing for My Salesforce Trust Monitor and click on Get It Now button and follow the steps in video below:

https://youtu.be/OqwV-gy43A4


## Setting up your instances, myDomains, MIDs and PODs to monitor

After installation simply follow these steps to start monitoring your Salesforce instances, myDomains, MIDs and PODs.

1.	Search for your instance [e.g. NA111] or your myDomain in the search box at top
2.	When the search returns your instance name or myDomain in the list of items found, simply click the star icon next to the name within the search results item to make it a Favorite and save it to your list of items to monitor
3.	When you click the star icon, that instance will move to list of your favorites and your favorites are organized in two groups – instances and myDomains
4.	To get the detail information for the specific to a given instance you have favorited, click on it and the Detail information section below will retrieve the information from trust.salesforce.com and display it in the tabs and timeline view below

Here is another video that shows quickly how to add an instance for monitoring:

https://youtu.be/5ET_hsyza1c


## Frequently Asked Questions 


### Does the My Salesforce Trust Monitor require Lightning Experience?
Yes. My Salesforce Trust Monitor is built using latest Lightning Web Component framework and will require Lightning Experience enabled

### How much does the My Salesforce Trust Monitor cost?
It is Free.

### Is there a limit on number of Salesforce instances I can monitor?
No. There is no limit from the implementation perspective, however, monitoring hundreds of instances can make the screen look very busy.  

### Can I request a feature?
Certainly. Please give us feedback via reviews or email and we will try to incorporate your request in future if possible.
