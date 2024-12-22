import { CloudProviderAPI } from "./cloud_provider_api.js";
import { EC2Client, DescribeInstancesCommand } from "@aws-sdk/client-ec2";

type ResourceType = 'ec2' | 's3' | 'rds' | 'lambda'; // Add other resource types
type ResourceStatus = 'running' | 'stopped' | 'terminated' | 'pending';

interface ResourceUsage {
    cpuUtilization?: number;
    memoryUtilization?: number;
    networkIn?: number;
    networkOut?: number;
    // Add other relevant metrics
}

interface CloudResource {
    id: string;
    name: string;
    type: ResourceType;
    region: string;
    status: ResourceStatus;
    usage: ResourceUsage;
}

export class AwsAPI implements CloudProviderAPI {
  private ec2Client: EC2Client;
  constructor(){
     this.ec2Client = new EC2Client({
       region: process.env.AWS_REGION,
       credentials: {
          accessKeyId: process.env.AWS_ACCESS_KEY_ID || "",
          secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || "",
        }
     })
  }

  async getResources(): Promise<CloudResource[]> {
    try {
      const command = new DescribeInstancesCommand({});
      const response = await this.ec2Client.send(command);
      return (response.Reservations ?? []).flatMap(reservation =>
        (reservation.Instances ?? []).map(instance => ({
          id: instance.InstanceId || 'N/A',
          name: instance.Tags?.find(tag => tag.Key === 'Name')?.Value || 'N/A',
          type: instance.InstanceType || 'N/A',
          region: String(this.ec2Client.config.region || 'N/A'),
          status: instance.State?.Name || 'N/A',
          usage: { /* add usage metrics here */ },
        }))
      );
    } catch (error) {
      console.error('Error describing instances:', error);
      throw error;
    }
  }
}
