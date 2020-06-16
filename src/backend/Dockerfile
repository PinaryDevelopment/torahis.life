ARG ENVIRONMENT="Development"
ARG STORAGE_CONNECTION_STRING="AccountName=devstoreaccount1;AccountKey=Eby8vdM02xNOcqFlqUwJPLlmEtlCDXJ1OUzFT50uSRZ6IFsuFq2UVErCz4I6tq/K1SZFPTOtr/KBHBeksoGMGw==;DefaultEndpointsProtocol=http;BlobEndpoint=http://host.docker.internal:10000/devstoreaccount1;QueueEndpoint=http://host.docker.internal:10001/devstoreaccount1;TableEndpoint=http://host.docker.internal:10002/devstoreaccount1;"
ARG COSMOS_CONNECTION_STRING="AccountEndpoint=https://host.docker.internal:8081/;AccountKey=C2y6yDjf5/R+ob0N8A7Cgv30VRDJIWEHLM+4QDU5DE2nQ9nDuVTqobD4b8mGGyPMbIZnqyMsEcaGQy67XIw/Jw=="
ARG LOCAL_FILES_STORAGE_PATH="/app/files"

FROM mcr.microsoft.com/dotnet/core/sdk:3.1 AS build
COPY . /src
RUN mkdir -p /dist
WORKDIR /src
RUN dotnet restore *.csproj
RUN dotnet publish *.csproj --output /dist

FROM mcr.microsoft.com/azure-functions/dotnet:3.0-appservice
ARG ENVIRONMENT
ARG STORAGE_CONNECTION_STRING
ARG COSMOS_CONNECTION_STRING
ARG LOCAL_FILES_STORAGE_PATH

ENV AZURE_FUNCTIONS_ENVIRONMENT=${ENVIRONMENT}
ENV AzureWebJobsScriptRoot=/app/wwwroot
ENV AzureFunctionsJobHost__Logging__Console__IsEnabled=true
ENV AzureWebJobsStorage=${STORAGE_CONNECTION_STRING}
ENV AzureCosmosConnectionString=${COSMOS_CONNECTION_STRING}
ENV ASPNETCORE_URLS=http://+:80
ENV LocalFilesStoragePath=LOCAL_FILES_STORAGE_PATH

VOLUME [ ${LOCAL_FILES_STORAGE_PATH} ]
EXPOSE 80

COPY ["/scripts/", "/scripts/"]
COPY ["/certificates/", "/certificates/"]
RUN /scripts/trust_cosmos_db_emulator_crt.sh

COPY --from=build ["/dist", "/app/wwwroot"]
WORKDIR /app/wwwroot
