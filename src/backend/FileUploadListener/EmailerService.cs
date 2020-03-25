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
        public static async Task SendEmails(CloudBlobContainer cloudBlobContainer, AudioFileName audioFile, CloudBlockBlob distBlockBlob)
        {
            var emailBlobReference = cloudBlobContainer.GetBlockBlobReference("emails");
            var emailList = (await emailBlobReference.DownloadTextAsync().ConfigureAwait(false)).Split('\n');
            var apiKey = Environment.GetEnvironmentVariable("SendGrid.ApiKey", EnvironmentVariableTarget.Process);
            var client = new SendGridClient(apiKey);
            var fromEmail = emailList.First().Split(',');
            var from = new EmailAddress(fromEmail[0], fromEmail[1]);
            var subject = $"{audioFile.Masechta.ToUppercaseWords()} Daf {audioFile.Daf}";
            var plainTextContent = $"{audioFile.Masechta.ToUppercaseWords()} Daf {audioFile.Daf} is now available. https://torahis.life/shiurim(daf-yomi&shabbos)";
            var htmlContent = $"<a href=\"https://torahis.life/shiurim(daf-yomi&shabbos)\">{audioFile.Masechta.ToUppercaseWords()} Daf {audioFile.Daf}</a> is now available.";
            var groupedRecipients = emailList.Skip(1)
                                             .Select(line => line.Split(','))
                                             .Select(lineParts => (bool.Parse(string.IsNullOrWhiteSpace(lineParts[2]) ? bool.FalseString : lineParts[2]), new EmailAddress(lineParts[0], lineParts[1])))
                                             .ToLookup(r => r.Item1);
            if (groupedRecipients.Contains(false))
            {
                var to = groupedRecipients[false].Select(recipient => recipient.Item2).ToList();
                var msg = MailHelper.CreateSingleEmailToMultipleRecipients(from, to, subject, plainTextContent, htmlContent);
                var response = await client.SendEmailAsync(msg);
            }

            if (groupedRecipients.Contains(true))
            {
                var to = groupedRecipients[true].Select(recipient => recipient.Item2).ToList();
                var msg = MailHelper.CreateSingleEmailToMultipleRecipients(from, to, subject, plainTextContent, htmlContent);
                var bytes = new byte[distBlockBlob.Properties.Length];
                await distBlockBlob.DownloadToByteArrayAsync(bytes, 0).ConfigureAwait(false);
                msg.AddAttachment($"{audioFile.Masechta.ToUppercaseWords()} Daf {audioFile.Daf}", Convert.ToBase64String(bytes));
                var response = await client.SendEmailAsync(msg);
            }
        }
    }
}
