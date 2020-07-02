$plaintextpassword = "SuperSecret"
$password = ConvertTo-SecureString "${plaintextpassword}" -asplaintext -force

. "$PSScriptRoot\azureCosmosDbEmulator.ps1"
Start-CosmosDbEmulatorForDocker -password $password

. "$PSScriptRoot\azureStorageEmulator.ps1"
Start-AzureStorage

$dockerImageCertInstallerScriptLocation = "$PSScriptRoot\trust_cosmos_db_emulator_crt.sh"
$dockerImageCertInstallerScript = Get-Content $dockerImageCertInstallerScriptLocation -Delimiter "%"
$dockerImageCertInstallerScript = $dockerImageCertInstallerScript -replace '(COSMOS_DB_EMULATOR_PFX_PASSWORD="(.*)")',"COSMOS_DB_EMULATOR_PFX_PASSWORD=`"$($plaintextpassword)`""
Set-Content $dockerImageCertInstallerScriptLocation $dockerImageCertInstallerScript -NoNewline

# $certFriendlyName = "IIS Express Development Certificate"
# $dockerCertificatesPath = Join-Path (Split-Path -Path $PSScriptRoot -Parent) "certificates"
# $localhostPfxCertificatePath = "$($dockerCertificatesPath)\localhost.pfx"
# Get-ChildItem -path Cert:\LocalMachine\My -Recurse | Where-Object {$_.FriendlyName -eq $certFriendlyName} | Export-PfxCertificate -Filepath $localhostPfxCertificatePath -Password $password