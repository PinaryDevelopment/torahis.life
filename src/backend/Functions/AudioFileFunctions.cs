using Microsoft.AspNetCore.DataProtection;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.Storage.Queue;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.Extensions.Logging;
using PinaryDevelopment.TorahIsLife.AudioFiles.Contracts;
using PinaryDevelopment.TorahIsLife.Organizations.Contracts;
using PinaryDevelopment.TorahIsLife.People.Contracts;
using PinaryDevelopment.TorahIsLife.Tags.Contracts;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json;
using System.Threading.Tasks;

namespace PinaryDevelopment.TorahIsLife.Functions
{
    public class AudioFileFunctions
    {
        private IAudioFilesService AudioFilesService { get; }
        private IOrganizationsService OrganizationsService { get; }
        private IPeopleService PeopleService { get; }
        private ITagsService TagsService { get; }
        private readonly IDataProtector DataProtector;

        public AudioFileFunctions(
            IAudioFilesService audioFilesService,
            IOrganizationsService organizationsService,
            IPeopleService peopleService,
            ITagsService tagsService,
            IDataProtectionProvider dataProtectionProvider
        )
        {
            AudioFilesService = audioFilesService;
            OrganizationsService = organizationsService;
            PeopleService = peopleService;
            TagsService = tagsService;
            DataProtector = dataProtectionProvider.CreateProtector(GetType().FullName);
        }

        /*
         * This is clunky, but due to limitations with Azure Functions, here is the way this process is currently working:
         *      - The front-end calls post with the audio files metadata, which gets saved to a SQL database
         *      - The front-end then directly uploads the audio file to blob storage, getting the access token and container name from the authorization response.
         *      - The front-end then calls postpost method which will place a message on a queue to have the file be processed.
         *      - Lastly, there is a function that is listening to the queue for messages
         *          - When it recieves the message, it retrieves all of the information from SQL and the original file from blob storage.
         *          - Then it processes the file with ffmpeg to make a smaller audio file and updates SQL with the relevant information from the processing.
         *          - Finally it will create the relevant document in Azure Search relating to the uploaded file.
         */
        [FunctionName("AudioFile-Create")]
        public async Task<IActionResult> Post([HttpTrigger(AuthorizationLevel.Anonymous, "post", "options", Route = "audio-media/upload")]HttpRequest request, ILogger log)
        {
            request.AddCorsAllowOriginHeader()
                   .AddCorsAllowHeadersHeader("Content-Type")
                   .AddCorsAllowMethodHeader("POST");

            if (HttpMethods.IsOptions(request.Method))
            {
                return new OkResult();
            }

            //try
            //{
            //    Authorize(request);
            //}
            //catch (UnauthorizedAccessException)
            //{
            //    return new UnauthorizedResult();
            //}
            try
            {
                var audioFile = await request.BindModelFromBody<AudioFile>();
                var host = request.ReadHost();

                audioFile.OrganizationId = (await OrganizationsService.GetByHost(host)).Id;
                var file = await AudioFilesService.Post(audioFile);

                return new CreatedResult("", file);
            }
            catch (Exception)
            {
                return new UnprocessableEntityResult();
            }
        }

        [FunctionName("AudioMedia-Uploaded")]
        public async Task<IActionResult> PostPost([HttpTrigger(AuthorizationLevel.Anonymous, "post", "options", Route = "audio-media/uploaded")] HttpRequest request, ILogger log)
        {
            request.AddCorsAllowOriginHeader()
                   .AddCorsAllowHeadersHeader("Content-Type")
                   .AddCorsAllowMethodHeader("POST");

            if (HttpMethods.IsOptions(request.Method))
            {
                return new OkResult();
            }

            //try
            //{
            //    Authorize(request);
            //}
            //catch (UnauthorizedAccessException)
            //{
            //    return new UnauthorizedResult();
            //}
            try
            {
                var id = request.Query["id"];
                var audioFile = await AudioFilesService.Get(id);

                await AudioFilesService.EnqueueMessageToProcessAudioFile(id);

                return new AcceptedResult();
            }
            catch (Exception)
            {
                return new BadRequestResult();
            }
        }

        [FunctionName("AudioMedia-Process")]
        public async Task<IActionResult> Run([QueueTrigger("til-audiofiles", Connection = "AzureWebJobsStorage")]CloudQueueMessage message, ILogger log, ExecutionContext context)
        {
            log.LogInformation($"C# Queue trigger function processed: {message}");

            var idMessage = JsonSerializer.Deserialize<IdMessage>(message.AsString);
            var audioFile = await AudioFilesService.Get(idMessage.Id);
            var (author, organization, tags) = await LoadAuthorOrganizationAndTags(audioFile.AuthorId, audioFile.OrganizationId);
            var metadata = new Metadata
            {
                AuthorFirstName = author.FirstName,
                AuthorLastName = author.LastName,
                AuthorTitle = author.Title,
                OrganizationName = organization.Name,
                Tags = audioFile.TagIds.Select(id => tags.First(tag => tag.Id == id)).Select(ConvertTag)
            };
            audioFile = await AudioFilesService.ProcessFile(audioFile, metadata, context.FunctionAppDirectory);
            return new OkObjectResult(audioFile);
        }

        private void Authorize(HttpRequest request)
        {
            request.HttpContext.Response.Headers.Add("Access-Control-Allow-Credentials", bool.TrueString);
            request.HttpContext.Response.Headers.Add("Access-Control-Allow-Origin", request.Headers["Origin"]);
            request.HttpContext.Response.Headers.Add("Access-Control-Allow-Headers", "PD_AUTH");

            var a = request.Headers["PD_AUTH"];

            if (a.Count <= 0)
            {
                throw new UnauthorizedAccessException();
            }

            Console.WriteLine(DataProtector.Unprotect(a[0]));
        }

        private class IdMessage
        {
            public string Id { get; set; }
        }

        private AudioFiles.Contracts.Tag ConvertTag(Tags.Contracts.Tag tag)
        {
            return new AudioFiles.Contracts.Tag
            {
                Name = tag.Name,
                TypeId = tag.TypeId
            };
        }

        private async Task<(Person author, Organization organization, IEnumerable<Tags.Contracts.Tag> tags)> LoadAuthorOrganizationAndTags(string authorId, string organizationId)
        {
            var organizationTask = OrganizationsService.Get(organizationId);
            var authorTask = PeopleService.Get(authorId);
            var tagsTask = TagsService.Get();

            await Task.WhenAll(
                authorTask,
                organizationTask,
                tagsTask
            );

            return (authorTask.Result, organizationTask.Result, tagsTask.Result);
        }
    }
}
