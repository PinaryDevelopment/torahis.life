using Octokit;
using System;
using System.IO;
using System.Linq;
using System.Text.Json;
using System.Threading.Tasks;

namespace FileUploadListener.GitHub
{
    public class GitHubClientWrapper
    {
        private GitHubClient GitHubClient { get; }

        private string Owner { get; }

        private string RepositoryName { get; }

        public GitHubClientWrapper(string owner, string repositoryName, string privateKey, string appId, string appName)
        {
            Owner = owner;
            RepositoryName = repositoryName;
            privateKey = privateKey.Replace("||", Environment.NewLine);

            var userName = new ProductHeaderValue(appName);
            GitHubClient = new GitHubClient(userName) { Credentials = new Credentials(GitHubTokenHelper.CreateToken(appId, privateKey), AuthenticationType.Bearer) };
        }

        public async Task CreatePostComment(string author, DateTime recordedOn, string masechta, string daf, string subtitle, TimeSpan duration)
        {
            await GiveClientWithAppCredentials().ConfigureAwait(false);
            var master = await GetMasterBranch().ConfigureAwait(false);
            var branch = await CreateCommentBranch(master).ConfigureAwait(false);
            var branchInfo = new BranchInfo
            {
                MasterBranchName = master.Name,
                NewBranchRef = branch.Ref,
                NewBranchName = branch.Ref.Split('/').Last()
            };
            var files = await AddCommentToFileContents(author, recordedOn, masechta, daf, subtitle, duration).ConfigureAwait(false);
            await CreateCommentPullRequest(files, branchInfo).ConfigureAwait(false);
        }

        public async Task GiveClientWithAppCredentials()
        {
            var appInstallation = await GitHubClient.GitHubApps.GetRepositoryInstallationForCurrent(Owner, RepositoryName).ConfigureAwait(false);
            var accessToken = await GitHubClient.GitHubApps.CreateInstallationToken(appInstallation.Id).ConfigureAwait(false);
            GitHubClient.Credentials = new Credentials(accessToken.Token, AuthenticationType.Bearer);
        }

        private Task<Branch> GetMasterBranch()
        {
            return GitHubClient.Repository.Branch.Get(Owner, RepositoryName, "master");
        }

        private Task<Reference> CreateCommentBranch(Branch master)
        {
            var newBranchName = Guid.NewGuid().ToString();
            return GitHubClient.Git.Reference.Create(Owner, RepositoryName, new NewReference($"refs/heads/{newBranchName}", master.Commit.Sha));
        }

        private async Task<(FileUpdateInfo fileInfo, string filePath)[]> AddCommentToFileContents(string author, DateTime recordedOn, string masechta, string daf, string subtitle, TimeSpan duration)
        {
            var dummyData = new TmpShiur
            {
                author = author,
                date = recordedOn.ToString("MMM d yyyy"),
                subseries = UppercaseWords(masechta),
                series = "Daf Yomi",
                title = $"Daf {daf}",
                versions = new[]
                {
                    new TmpVersion
                    {
                        name = subtitle,
                        duration = duration.ToString("mm':'ss")
                    }
                }
            };

            var srcDataContent = await GitHubClient.Repository.Content.GetAllContents(Owner, RepositoryName, Path.Combine("src", "frontend", "src", "data", "data.json")).ConfigureAwait(false);
            var srcDataContainer = JsonSerializer.Deserialize<TmpContainer>(srcDataContent[0].Content);
            var shiur = srcDataContainer.shiurim.FirstOrDefault(s => s.author == dummyData.author && s.subseries == dummyData.subseries && s.title == dummyData.title);
            if (shiur == null)
            {
                srcDataContainer.shiurim = srcDataContainer.shiurim.Concat(new[] { dummyData }).ToArray();
            }
            else
            {
                shiur.versions = shiur.versions.Append(dummyData.versions[0]).ToArray();
            }

            var srcDataContent2 = await GitHubClient.Repository.Content.GetAllContents(Owner, RepositoryName, Path.Combine("docs", "data", "data.json")).ConfigureAwait(false);

            return new[]
            {
                (
                    new FileUpdateInfo
                    {
                        UpdatedFileContent = JsonSerializer.Serialize(srcDataContainer, new JsonSerializerOptions { WriteIndented = true }),
                        OriginalFileContentSha = srcDataContent[0].Sha
                    },
                    Path.Combine("src", "frontend", "src", "data", "data.json")
                ),
                (
                    new FileUpdateInfo
                    {
                        UpdatedFileContent = JsonSerializer.Serialize(srcDataContainer, new JsonSerializerOptions { WriteIndented = false }),
                        OriginalFileContentSha = srcDataContent2[0].Sha
                    },
                    Path.Combine("docs", "data", "data.json")
                )
            };
        }
        
        static string UppercaseWords(string value)
        {
            char[] array = value.ToCharArray();
            if (array.Length >= 1)
            {
                if (char.IsLower(array[0]))
                {
                    array[0] = char.ToUpper(array[0]);
                }
            }
            for (int i = 1; i < array.Length; i++)
            {
                if (array[i - 1] == ' ')
                {
                    if (char.IsLower(array[i]))
                    {
                        array[i] = char.ToUpper(array[i]);
                    }
                }
            }
            return new string(array);
        }


        private async Task CreateCommentPullRequest((FileUpdateInfo fileInfo, string filePath)[] files, BranchInfo branchInfo)
        {
            foreach (var (fileInfo, filePath) in files)
            {
                await GitHubClient.Repository.Content.UpdateFile(Owner, RepositoryName, filePath, new UpdateFileRequest("new comment", fileInfo.UpdatedFileContent, fileInfo.OriginalFileContentSha, branchInfo.NewBranchRef)).ConfigureAwait(false);
            }

            await GitHubClient.PullRequest.Create(Owner, RepositoryName, new NewPullRequest("new comment", branchInfo.NewBranchName, branchInfo.MasterBranchName)).ConfigureAwait(false);
        }
    }

    internal class TmpContainer
    {
        public TmpShiur[] shiurim { get; set; }
    }

    internal class TmpShiur
    {
        public string author { get; set; }
        public string date { get; set; }
        public string series { get; set; }
        public string subseries { get; set; }
        public string title { get; set; }
        public TmpVersion[] versions { get; set; }
    }

    internal class TmpVersion
    {
        public string name { get; set; }
        public string duration { get; set; }
    }
}
