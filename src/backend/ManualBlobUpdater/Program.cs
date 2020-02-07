using FileUploadListener;
using System;
using System.IO;
using System.Threading.Tasks;

namespace ManualBlobUpdater
{
    class Program
    {
        static async Task Main(string[] args)
        {
            await VideoFileService.ProcessFile(
                new Microsoft.Azure.WebJobs.ExecutionContext { FunctionAppDirectory = Directory.GetCurrentDirectory() },
                DateTime.Now.AddDays(-6)
            ).ConfigureAwait(false);
        }
    }
}
