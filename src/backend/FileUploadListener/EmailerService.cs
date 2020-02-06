using Microsoft.WindowsAzure.Storage.Blob;
using SendGrid;
using SendGrid.Helpers.Mail;
using System;
using System.Linq;
using System.Threading.Tasks;

namespace FileUploadListener
{
    public static class EmailerService
    {
        public static async Task SendEmails(CloudBlobContainer cloudBlobContainer, AudioFileName audioFile)
        {
            var emailBlobReference = cloudBlobContainer.GetBlockBlobReference("emails");
            var emailList = (await emailBlobReference.DownloadTextAsync().ConfigureAwait(false)).Split('\n');
            var apiKey = Environment.GetEnvironmentVariable("SendGrid.ApiKey", EnvironmentVariableTarget.Process);
            var client = new SendGridClient(apiKey);
            var fromEmail = emailList.First().Split(',');
            var from = new EmailAddress(fromEmail[0], fromEmail[1]);
            var subject = $"{audioFile.Masechta.ToUppercaseWords()} Daf {audioFile.Daf}";
            var to = emailList.Skip(1).Select(line => line.Split(',')).Select(lineParts => new EmailAddress(lineParts[0], lineParts[1])).ToList();
            var plainTextContent = $"{audioFile.Masechta.ToUppercaseWords()} Daf {audioFile.Daf} is now available. https://torahis.life";
            var htmlContent = $"<a href=\"https://torahis.life\">{audioFile.Masechta} Daf {audioFile.Daf}</a> is now available.";
            var msg = MailHelper.CreateSingleEmailToMultipleRecipients(from, to, subject, plainTextContent, htmlContent);
            //msg.AddAttachment
            var response = await client.SendEmailAsync(msg);
        }
    }
}
