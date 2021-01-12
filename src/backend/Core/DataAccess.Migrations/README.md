#Generate Entity Framework Migration
	- Make sure the [EF cli tools](https://docs.microsoft.com/en-us/ef/core/cli/dotnet) are installed
	- cd <PROJECT-ROOT>/src/backend/Core/DataAccess
	- dotnet-ef migrations add <MIGRATION-NAME> --startup-project ../DataAccess.Migrations/DataAccess.Migrations.csproj