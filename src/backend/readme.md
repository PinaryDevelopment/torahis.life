# NOTES

## Azure Functions
 - [App Settings Documentation](https://docs.microsoft.com/en-us/azure/azure-functions/functions-app-settings)

## Docker
 - Build image: docker build -t temp .
 - Run image with emulators: docker run -it -p 613:80 -v C:\Users\{USER_NAME}\AppData\Roaming\Microsoft\UserSecrets:/root/.microsoft/usersecrets temp
 - Run image with local file storage: docker run -it -p 613:80 -v $(pwd)\files:/app/files temp
 - Azure storage emulator image: https://hub.docker.com/_/microsoft-azure-storage-azurite?tab=description
 - Azure cosmos emulator image?: https://hub.docker.com/r/microsoft/azure-cosmosdb-emulator/ (windows image only)
   - https://github.com/Azure/azure-cosmos-db-emulator-docker
                               

## Dockerfile
 - Currently represents a docker container for development
 - Base image mcr.microsoft.com/azure-functions/dotnet:3.0-appservice enables ssh and remote debugging
 - Base image mcr.microsoft.com/azure-functions/dotnet:3.0 is without those capabilities

## Git
 - Setup script sets the passwords for the certificates in a few of the plaintext files. To keep the passwords out of source control, the following command was used: https://stackoverflow.com/questions/13630849/git-difference-between-assume-unchanged-and-skip-worktree#answer-13631525

## Stack Overflow
 ### Questions asked during the creation of this project
  - https://stackoverflow.com/questions/62173426/connecting-to-cosmosdb-from-docker-container

## Exceptions
 ### System.Net.Http.HttpRequestException: The SSL connection could not be established, see inner exception.
  - Something is wrong with the CosmosDB cert setup. Check to ensure all passwords are the same and that the emulator was started with the `runEmulators.ps1` script after the cert was created with the `setup.ps1` script.
  - https://github.com/Azure/azure-cosmos-dotnet-v3/issues/1232#issuecomment-632942023
 ### System.Net.Http.HttpRequestException: Connection refused
  - CosmosDB Emulator hasn't started yet
 ### Microsoft.Azure.Cosmos.CosmosException : Response status code does not indicate success: BadRequest (400); Substatus: 0; ActivityId: 934365ab-9ae0-4acb-acd2-3f4c10e65a46; Reason: (Message: {"Errors":["One of the specified inputs is invalid"]}
  - Cosmos lib doesn't seem to use System.Text.Json as serializer, therefore doesn't honor JsonPropertyName attribute
 ### Microsoft.PowerShell.Commands.WriteErrorException,New-CosmosDbEmulatorCertificate
  - The DocumentDbEmulatorCertificate certificate is in a weird state and needs to be deleted manually from the `certlm` utility.