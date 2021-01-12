import { Injectable } from '@angular/core';

import { environment } from '../environments/environment';

export interface AzureStorageConfiguration {
  sasToken: string;
  containerName: string;
}

export interface Configuration {
  azureStorage: AzureStorageConfiguration;
}

@Injectable({
  providedIn: 'root'
})
export class ConfigurationService {
  configuration!: Configuration;

  initialize(): Promise<Configuration> {
    return fetch(`${environment.baseApisUri}/organizations/config`)
      .then(response => response.text())
      .then(data => this.configuration = JSON.parse(data) as Configuration);
  }
}
