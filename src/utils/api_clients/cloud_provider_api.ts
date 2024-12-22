export interface CloudProviderAPI {
  getResources(): Promise<any[]>;
}
