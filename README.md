# How to setup a computer to work on this project.

[Visual Studio Community Edition](https://visualstudio.microsoft.com/vs/community/) and [Visual Studio Code](https://code.visualstudio.com/) are two IDE's that are highly recommended for use in developing this project.

The source control system for the application is [Git](https://git-scm.com/). This will need to be installed to work on this application.

## Backend
The backend of the application is built in C#, utilizing Azure Functions. To work on these parts of the application locally, the following tools should be installed.

Install Azure Storage Emulator ([docs](https://docs.microsoft.com/en-us/azure/storage/common/storage-use-emulator), [installer](https://go.microsoft.com/fwlink/?linkid=717179&clcid=0x409)).

Install Azure Storage Explorer ([docs](https://azure.microsoft.com/en-us/features/storage-explorer/), [installer](https://go.microsoft.com/fwlink/?LinkId=708343&clcid=0x409)).

*Currently all of the documents that the application uses are in a container called `shiurim`.*
1. Start the Azure Storage Emulator.
2. Open the Microsoft Azure Storage Explorer installed on your computer.
    - Expand `Local & Attached/(Emulator - Default Ports) (Key)`.
    - Right click on `Blob Containers`.
    - Select `Create Blob Container`.
    - Name the new blob container `shiurim`.
    - If you want to pre-load some audio files for testing locally, the easiest way to do this would be to go to https://torahis.life, download one or more of the files there and upload them to the blob container just created. The destination directory for the upload should be `/dist/rabbiyosefbromberg/dafyomi/berachos`
3. `FileUploadListener` is the project containing all of the Azure Functions.

## Frontend
The frontend of the application is built in HTML5, Typescript and SCSS, leveraging the Aurelia 2 framework. To work on this part of the application locally, the [current documentation](https://docs.aurelia.io/getting-started/quick-start-guide/creating-your-first-app) only requires [Node 8.9.0](https://nodejs.org/en/) or above to be installed.

Comment out lines 5-12 in the `index.ejs` file. This will not cause local development to get logged with Google Analytics. With a command line window open in the `frontend` directory, run the command `npm run start`. This will build all of the frontend files and launch a browser with the application in it. This process also watches all of the frontend source files, so changing one and saving it will cause the files to be rebuilt and the browser to reload.

If the frontend work needs to actually make calls to the backend, then there are a few other steps needed to get working with it.
1. Create a file in the `FileUploadListener` project directory called `local.settings.json` with the following contents:

    {
      "IsEncrypted": false,
      "Values": {
        "AzureWebJobsStorage": "UseDevelopmentStorage=true",
        "FUNCTIONS_WORKER_RUNTIME": "dotnet"
      }
    }
2. Start the `FileUploadListener` project.
3. Update the URL base in `my-app.html`(~line 25) from "https://torahislife.azurewebsites.net" to the local url that is assigned to the app during startup(shown in the console that is launched when `FileUploadListener` project is launched).

---
## Additional Resources
| Tool | Documentation | Use |
| ---- | ------------- | --- |
| Application Insights | [docs](https://docs.microsoft.com/en-us/azure/azure-monitor/app/app-insights-overview) | backend error tracking, monitoring for application usage |
| Azure DevOps | [docs](https://azure.microsoft.com/en-us/solutions/devops/) | CICD system for the project |
| Azure Functions | [docs](https://docs.microsoft.com/en-us/azure/azure-functions/) | the backend for the application |
| ffmpeg | [docs](https://ffmpeg.org/) | executable used for audio file manipulation |
| Git  | [docs](https://git-scm.com/doc) | source control for application |
| GitHub Actions | [docs](https://github.com/features/actions) | used as a hook to automatically create branch/commits/pull request for newly uploaded shiurim |
| GitHub Pages | [docs](https://pages.github.com/) | hosting/SSL for the web application |
| Google Analytics | [docs](https://support.google.com/analytics) | frontend monitoring |
| Google Fonts | [docs](https://fonts.google.com/) | source of web-fonts used in the application |
| Node | [docs](https://nodejs.org/en/docs/) | environment the frontend files of the application are built in |
| npm | [docs](https://docs.npmjs.com/) | package manager for frontend libraries used in project |

---
| Language | Documentation | Use |
| ---------- | ------------- | --- |
| C#         | [docs](https://docs.microsoft.com/en-us/dotnet/csharp/) |
| HTML5      |[docs](https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/HTML5) |
| SCSS       | [docs](https://sass-lang.com/documentation) |
| Markdown (GitHub flavored) | [docs](https://guides.github.com/features/mastering-markdown/) |
| Typescript | [docs](https://www.typescriptlang.org/docs/home.html) |

---
| Framework/Library | Documentation | Notes |
| ---------- | ------------- | --- |
| Aurelia 2  | [v2](https://docs.aurelia.io/), [v1](https://aurelia.io/docs) | v2 is the version used by this application, but the documentation is mostly non-existent. v1 documentation can be used as a spring-board for most things in the interim. |
| Aurelia 2 routing | [video tutorial](https://www.youtube.com/watch?v=mwrIiwVPSHo) | |
| HTML Audio | [docs](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/audio) |
| Taglib | [docs](https://github.com/mono/taglib-sharp#taglib) |
| Send Grid | [docs](https://sendgrid.com/docs/) |
| Twillio | [docs](https://www.twilio.com/docs) |