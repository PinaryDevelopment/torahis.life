ARG ENVIRONMENT="Development"
ARG STORAGE_CONNECTION_STRING="AccountName=devstoreaccount1;AccountKey=Eby8vdM02xNOcqFlqUwJPLlmEtlCDXJ1OUzFT50uSRZ6IFsuFq2UVErCz4I6tq/K1SZFPTOtr/KBHBeksoGMGw==;DefaultEndpointsProtocol=http;BlobEndpoint=http://host.docker.internal:10000/devstoreaccount1;QueueEndpoint=http://host.docker.internal:10001/devstoreaccount1;TableEndpoint=http://host.docker.internal:10002/devstoreaccount1;"
ARG COSMOS_CONNECTION_STRING="AccountEndpoint=https://host.docker.internal:8081/;AccountKey=C2y6yDjf5/R+ob0N8A7Cgv30VRDJIWEHLM+4QDU5DE2nQ9nDuVTqobD4b8mGGyPMbIZnqyMsEcaGQy67XIw/Jw=="
ARG LOCAL_FILES_STORAGE_PATH="/app/files"

FROM mcr.microsoft.com/dotnet/core/sdk:3.1 AS build
COPY *.sln */*.csproj /src/
WORKDIR /src
RUN for file in ./*.csproj; \
    do \
    projectname=${file%.*}; \
    mkdir -p "/src/$projectname"; \
    cp $file "/src/$projectname"; \
    rm $file; \
    done

RUN dotnet restore *.sln

COPY . /src
WORKDIR /src
RUN dotnet publish --no-restore -c Release -f netcoreapp3.1 -r linux-x64 -o /dist/Apis Apis/Apis.csproj
RUN dotnet publish --no-restore -c Release -f netcoreapp3.1 -r linux-x64 --self-contained true -p:PublishSingleFile=false -p:PublishTrimmed=true -o /dist/DataStores.Migrations DataStores.Migrations/DataStores.Migrations.csproj



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
# ENV ASPNETCORE_URLS=https://+:443;http://+:80
ENV LocalFilesStoragePath=LOCAL_FILES_STORAGE_PATH
# ENV ASPNETCORE_Kestrel__Certificates__Default__Password="SuperSecret"
# ENV ASPNETCORE_Kestrel__Certificates__Default__Path=/certificates/localhost.pfx
# ENV ASPNETCORE_HTTPS_PORT=443

# user secrets path value pulled from C:\Users\{user_name}\.nuget\packages\microsoft.visualstudio.azure.containers.tools.targets\1.10.9\tools\Microsoft.VisualStudio.Containers.Tools.Shared.dll#ContainerLaunchManager.cs
VOLUME [ \
    ${LOCAL_FILES_STORAGE_PATH}, \
    "/root/.microsoft/usersecrets" \
]
EXPOSE 80
# EXPOSE 443

COPY ["/scripts/", "/scripts/"]
COPY ["/certificates/", "/certificates/"]
RUN /scripts/trust_cosmos_db_emulator_crt.sh

# COPY --from=build ["/dist/DataStores.Migrations", "/app/DataStores.Migrations"]
# WORKDIR /app/DataStores.Migrations
# RUN ["dotnet", "DataStores.Migrations.dll"]

COPY --from=build ["/dist/Apis", "/app/wwwroot"]
WORKDIR /app/wwwroot
# ENTRYPOINT ["/azure-functions-host/Microsoft.Azure.WebJobs.Script.WebHost", "--cert", "/certificates/localhost.pfx", "--password", "SuperSecret", "--useHttps" ]
