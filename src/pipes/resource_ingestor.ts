// src/pipes/resource_ingestor.ts

import { Langbase } from 'langbase';
import { CloudProviderAPI } from '../utils/api_clients/cloud_provider_api';
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

export class ResourceDataIngestor {
     private langbase: Langbase;
     cloudProviderAPI : CloudProviderAPI;

  constructor(cloudProviderAPI: CloudProviderAPI) {
      this.langbase = new Langbase({ apiKey: process.env.LANGBASE_API_KEY! })
      this.cloudProviderAPI = cloudProviderAPI;
  }
    async run(): Promise<CloudResource[]> {
        try {
            this.log('Fetching resources data...');
            const resources = await this.fetchResources();
            this.log('Resources data fetched successfully');
            return resources;
          } catch (error) {
              this.log(`Error fetching resource data: ${error}`);
              throw error;
           }
    }
  async fetchResources(): Promise<CloudResource[]> {
       const resources = await this.cloudProviderAPI.getResources();
      return resources;
 }
  log(message: string): void {
      console.log(`${new Date().toISOString()} - ${message}`);
    }
}
