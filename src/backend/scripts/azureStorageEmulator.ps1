using namespace System.Diagnostics.Process;

Function Start-AzureStorage(
    [Parameter()]
    [boolean]
    $emulatorOnly = $false
) {
    If ($emulatorOnly -and -not (Test-Path "C:\Program Files (x86)\Microsoft SDKs\Azure\Storage Emulator\AzureStorageEmulator.exe" -PathType leaf)) {
        Write-Host "Installing Azure Storage Emulator."
        Install-AzureStorageEmulator
    }

    If (-not $emulatorOnly -and -not (Test-Path "C:\Program Files (x86)\Microsoft Azure Storage Explorer\StorageExplorer.exe" -PathType leaf)) {
        Write-Host "Installing Azure Storage Explorer."
        Install-AzureStorageExplorer
    }

    if (([System.Diagnostics.Process]::GetProcessesByName("AzureStorageEmulator")).Length -eq 0) {
        Write-Host "Starting Azure Storage Emulator."
        Start-Process -FilePath "AzureStorageEmulator.exe" -ArgumentList "start" -WorkingDirectory "C:\Program Files (x86)\Microsoft SDKs\Azure\Storage Emulator"
    }
}

Function Install-AzureStorageEmulator() {
    Write-Host "Installing Azure Storage Emulator"
    $installer = "$PSScriptRoot\microsoftazurestorageemulator.msi"
    curl "https://go.microsoft.com/fwlink/?LinkId=717179&clcid=0x409" -O $installer
    Start-Process -Wait -FilePath msiexec -ArgumentList /i, $installer
    Remove-Item $installer
}

Function Install-AzureStorageExplorer() {
    Write-Host "Installing Azure Storage Explorer"
    $installer = "$PSScriptRoot\StorageExplorer.exe"
    curl "https://aka.ms/azurestorageexplorer" -O $installer
    Start-Process -Wait -FilePath $installer
    Remove-Item $installer
}