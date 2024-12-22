// src/pipes/cost_analyzer.ts
import { Langbase } from 'langbase';
import * as dotenv from 'dotenv';
dotenv.config({path: 'config/.env'})

interface CloudResource {
    id: string;
    name: string;
    type: string;
    region: string;
    status: string;
    usage: any;
}
interface Subscription{
    subscriptionName: string,
    cost: number,
    renewalDate: string,
    users: number
  }

interface CostAnalysisResult {
    recommendations: string[];
    costSavings: number;
}

export class CostAnalyzer {
    private langbase: Langbase;
    constructor() {
       this.langbase = new Langbase({ apiKey: process.env.LANGBASE_API_KEY! })
   }
    async run(resources: CloudResource[], subscriptions: Subscription[]): Promise<CostAnalysisResult> {
        try {
          this.log('Analyzing resource costs...');
          const analysisResult = await this.analyzeCosts(resources, subscriptions);
          this.log('Cost analysis completed.');
          return analysisResult;
        } catch (error) {
          this.log(`Error analyzing costs: ${error}`);
          throw error;
        }
      }

    async analyzeCosts(resources: CloudResource[], subscriptions: Subscription[]): Promise<CostAnalysisResult> {
          let recommendations: string[] = [];
          let totalSavings = 0;

            // Example: Identify underutilized resources
        for(const resource of resources){
            if(resource.usage && resource.usage.cpu < 10){
              recommendations.push(`Consider scaling down: ${resource.name}, id: ${resource.id}`)
                 totalSavings += 10;
             }
        }
         // Example: Identify underutilized subscriptions
        for(const subscription of subscriptions){
          if(subscription.users == 0){
             recommendations.push(`Consider cancelling subscription: ${subscription.subscriptionName}, cost: ${subscription.cost}`)
            totalSavings += subscription.cost;
          }
      }

          return { recommendations: recommendations, costSavings: totalSavings };
    }
    log(message: string): void {
         console.log(`${new Date().toISOString()} - ${message}`);
     }
}
