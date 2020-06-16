using namespace System.ServiceProcess

Function Start-CosmosDbEmulatorForDocker(
  [Parameter()]
  [securestring]
  $password
) {
  $cosmosDbInstallLocation = Get-CosmosDbInstallLocation
  If (!$cosmosDbInstallLocation) {
      Install-AzureCosmosDBEmulator
  }

  Write-Host "Importing Microsoft.Azure.CosmosDB.Emulator powershell module."
  Import-Module -Name "$($cosmosDbInstallLocation.InstallLocation)\PSModules\Microsoft.Azure.CosmosDB.Emulator"

  Install-CosmosDBDockerCertificate -cosmosDbInstallLocation $cosmosDbInstallLocation.InstallLocation -password $password

  Start-CosmosDbEmulator -AllowNetworkAccess -Key "C2y6yDjf5/R+ob0N8A7Cgv30VRDJIWEHLM+4QDU5DE2nQ9nDuVTqobD4b8mGGyPMbIZnqyMsEcaGQy67XIw/Jw=="
}

Function Get-CosmosDbInstallLocation() {
  Get-ChildItem HKLM:\SOFTWARE\Microsoft\Windows\CurrentVersion\Uninstall | ForEach-Object { Get-ItemProperty $_.PsPath } | Where-Object { $_.DisplayName -eq "Azure Cosmos DB Emulator" } | Select-Object InstallLocation
}

Function Install-AzureCosmosDBEmulator() {
  Write-Host "Installing Azure Cosmos Db Emulator."
  $installer = "$PSScriptRoot\cosmosEmulatorInstaller.msi"
  curl "https://aka.ms/cosmosdb-emulator" -O $installer
  Start-Process -Wait -FilePath msiexec -ArgumentList /i, $installer
  Remove-Item $installer
}

Function Install-CosmosDBDockerCertificate(
  [Parameter()]
  [string]
  $cosmosDbInstallLocation,

  [Parameter()]
  [securestring]
  $password
) {
  If ((Get-CosmosDbEmulatorStatus) -ne [ServiceControllerStatus]::Stopped) {
    Write-Host "Stopping Cosmos DB emulator."
    Stop-CosmosDbEmulator
  }

  $dockerCertificatesPath = Join-Path (Split-Path -Path $PSScriptRoot -Parent) "certificates"
  $cosmosDbPfxCertificatePath = "$($dockerCertificatesPath)\cosmosdbemulator.pfx"
  Uninstall-Certificate -dockerCertificatePath $cosmosDbPfxCertificatePath

  Write-Host "Generating new Cosmos DB certificate to work with Docker."
  New-CosmosDbEmulatorCertificate "host.docker.internal"
  Start-Sleep -s 5

  New-DockerCertificate -dockerCertificatePath $cosmosDbPfxCertificatePath -password $password

  Set-Location (Split-Path -Path $PSScriptRoot -Parent)
}

Function Uninstall-Certificate(
  [Parameter()]
  [string]
  $dockerCertificatePath
) {
  Write-Host "Removing existing DocumentDbEmulatorCertificate certificate."

  if (Test-Path $dockerCertificatePath) {
    Remove-Item -Path $dockerCertificatePath
  }
}

Function New-DockerCertificate(
  [Parameter()]
  [string]
  $dockerCertificatePath,

  [Parameter()]
  [securestring]
  $password
) {
  Write-Host "Generating new pfx version of DocumentDbEmulatorCertificate certificate for use in Docker image."

  Get-CosmosDbEmulatorCertificate | Export-PfxCertificate -Filepath $dockerCertificatePath -Password $password
}
