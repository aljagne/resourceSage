import { AutomatedActions } from './pipes/automated_actions';
import { ResourceDataIngestor } from "./pipes/resource_ingestor";
import { AwsAPI } from "./utils/api_clients/aws_api";
import { HubspotAPI } from "./utils/api_clients/hubspot_api";
import { CostAnalyzer } from "./pipes/cost_analyzer";

async function main() {
    const automatedActions = new AutomatedActions();

    // Example usage: stop an instance
    try{
        const stopResult = await automatedActions.run({
          actionType: 'stopInstance',
          resourceId: 'i-01234567890abcdef0',
          payload: {
            reason: 'Testing stop action'
          }
        });
        console.log('Stop Instance Result:', stopResult);
     }catch(error){
        console.error("Error executing stop instance: ", error)
    }

    try{
        const scaleDownResult = await automatedActions.run({
          actionType: 'scaleDown',
          resourceId: 'i-01234567890abcdef0',
          payload: {
             reason: 'Testing scaleDown action'
         }
       });
       console.log('Scale Down Instance Result:', scaleDownResult);
   }catch(error){
        console.error("Error executing scale down instance: ", error)
   }

    try {
          const unknownResult = await automatedActions.run({
              actionType: 'unknownAction',
             resourceId: 'i-01234567890abcdef0',
              payload: {
                reason: 'Testing unknown action'
               }
        })
    } catch (error){
       console.error("Error executing unknown action:", error)
    }

    const awsAPI = new AwsAPI();
     const resourceDataIngestor = new ResourceDataIngestor(awsAPI)

    try{
        const resources = await resourceDataIngestor.run();
         console.log("Resources", resources)

          const costAnalyzer = new CostAnalyzer();
          const analysis = await costAnalyzer.run(resources, [{
              subscriptionName: "Test Subscription",
            cost: 100,
             renewalDate: "2024-09-20",
           users: 0
          }]);
        console.log("Analysis", analysis)
    } catch(error) {
        console.error("Error fetching resources", error)
    }

    const hubspotApi = new HubspotAPI()
    console.log(await hubspotApi.getSubscriptionDetails())

}

main();
