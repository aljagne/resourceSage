// src/utils/api_clients/hubspot_api.ts

import { SaasAPI } from "./saas_api";


export class HubspotAPI implements SaasAPI {
    private apiKey: string;
    constructor(){
        this.apiKey = process.env.HUBSPOT_API_KEY || "";
    }

    async getSubscriptionDetails(): Promise<any>{
        // Implement hubspot subscription details api call
        return `Hubspot subscription data for key: ${this.apiKey}`
    }
}
