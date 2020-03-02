using Data;
using Microsoft.WindowsAzure.Storage;
using System;
using System.Configuration;
using System.Drawing;
using System.IO;
using System.Linq;
using System.Windows.Forms;

namespace FileUploader
{
    public partial class UploaderForm : Form
    {
        private const string SubmitButtonKey = "SubmitButton";
        private const string DafInputKey = "DafInput";
        private const string AuthorInputKey = "AuthorInput";
        private const string TitleInputKey = "TitleInput";
        private const string SubtitleInputKey = "SubtitleInput";
        private const string DateInputKey = "DateInput";

        public UploaderForm()
        {
            InitializeComponent();
            InitializeControls();

            var fileDialog = new OpenFileDialog();
            fileDialog.FileOk += (_, __) =>
            {
                var originalFileName = Path.GetFileName(fileDialog.FileName);
                Show();
                var button = Controls.Find<Button>(SubmitButtonKey);
                button.Click += (___, ____) =>
                {
                    var daf = Controls.Find<ComboBox>(DafInputKey).SelectedItem.ToString();
                    var date = Controls.Find<MonthCalendar>(DateInputKey).SelectionStart;
                    var author = GetSelectedAuthor();
                    var shiur = author.Shiurim.First(shiur =>
                                                        string.Join(" - ", shiur.Groups) == Controls.Find<ComboBox>(TitleInputKey).SelectedItem.ToString()
                                                        && shiur.Version == Controls.Find<ComboBox>(SubtitleInputKey).SelectedItem.ToString().Replace("(no subtitle)", string.Empty));

                    var cloudBlobClient = CloudStorageAccount.Parse(ConfigurationManager.ConnectionStrings["AzureWebJobsStorage"].ConnectionString).CreateCloudBlobClient();
                    var containerReference = cloudBlobClient.GetContainerReference(StaticData.ShiurimContainerName);
                    containerReference.CreateIfNotExistsAsync().ConfigureAwait(false).GetAwaiter().GetResult();

                    static string createPathPart(string str) => str.ToLowerInvariant().Replace(" ", string.Empty);
                    var cloudFilePath = Path.Combine(StaticData.UploadedFileRootContainerPath, createPathPart(author.Fullname));
                    foreach (var grouping in shiur.Groups)
                    {
                        cloudFilePath = Path.Combine(cloudFilePath, createPathPart(grouping));
                    }
                    cloudFilePath = Path.Combine(cloudFilePath, $"Daf {daf}-{shiur.Version}-{date.ToString("yyyy.MM.dd")}{Path.GetExtension(originalFileName).ToLowerInvariant()}");
                    var blockBlobReference = containerReference.GetBlockBlobReference(cloudFilePath);
                    using (var fileStream = fileDialog.OpenFile())
                    {
                        blockBlobReference.UploadFromStreamAsync(fileStream).ConfigureAwait(false).GetAwaiter().GetResult();
                    }
                    Microsoft.VisualBasic.FileIO.FileSystem.DeleteFile(fileDialog.FileName, Microsoft.VisualBasic.FileIO.UIOption.OnlyErrorDialogs, Microsoft.VisualBasic.FileIO.RecycleOption.SendToRecycleBin);
                    Application.Exit();
                };
            };

            fileDialog.ShowDialog();
        }

        private void InitializeControls()
        {
            var paddingSize = 10;
            var labelWidth = 150;
            var controlHeight = 50;
            var y = paddingSize;

            var comboBox = new ComboBox { Name = AuthorInputKey, Height = controlHeight, Width = ClientSize.Width - (paddingSize * 2), Location = new Point(paddingSize, y) };
            comboBox.Items.AddRange(StaticData.Authors.Select(author => author.Fullname).ToArray());
            Controls.Add(comboBox);

            y = y + comboBox.PreferredHeight + paddingSize;
           
            comboBox = new ComboBox { Name = TitleInputKey, Height = controlHeight, Width = ClientSize.Width - (paddingSize * 2), Location = new Point(paddingSize, y) };
            Controls.Add(comboBox);

            y = y + comboBox.PreferredHeight + paddingSize;

            comboBox = new ComboBox { Name = SubtitleInputKey, Height = controlHeight, Width = ClientSize.Width - (paddingSize * 2), Location = new Point(paddingSize, y) };
            Controls.Add(comboBox);

            y = y + comboBox.PreferredHeight + paddingSize;

            comboBox = new ComboBox { Name = DafInputKey, Height = controlHeight, Width = ClientSize.Width - (paddingSize * 2), Location = new Point(paddingSize, y) };
            Controls.Add(comboBox);

            y = y + comboBox.PreferredHeight + paddingSize;

            Controls.Find<ComboBox>(AuthorInputKey).SelectedIndexChanged += (a, b) => UpdateTitleComboBoxOptions();
            Controls.Find<ComboBox>(TitleInputKey).SelectedIndexChanged += (a, b) => UpdateSubtitleComboBoxOptions();
            Controls.Find<ComboBox>(SubtitleInputKey).SelectedIndexChanged += (a, b) => UpdateDafComboBoxOptions();
            Controls.Find<ComboBox>(AuthorInputKey).SelectedIndex = 0;

            var (Masechta, Daf) = StaticData.CalculateDafForDate(DateTime.Now);
            Controls.Find<ComboBox>(TitleInputKey).SelectedIndex = Controls.Find<ComboBox>(TitleInputKey).Items.IndexOf($"Daf Yomi - {Masechta}");
            Controls.Find<ComboBox>(SubtitleInputKey).SelectedIndex = Controls.Find<ComboBox>(SubtitleInputKey).Items.IndexOf(DateTime.Now.Hour > 12 ? "without Rashi" : "with Rashi");
            Controls.Find<ComboBox>(DafInputKey).SelectedIndex = Controls.Find<ComboBox>(DafInputKey).Items.IndexOf($"{Daf}");

            Control control = new Label { Text = "Date", Height = controlHeight, Width = labelWidth, Visible = true, Location = new Point(paddingSize, y) };
            Controls.Add(control);

            control = new MonthCalendar { Name = DateInputKey, Location = new Point(control.Width + paddingSize, y) };
            Controls.Add(control);

            y = y + 320 + paddingSize;

            control = new Button { Name = SubmitButtonKey, Text = "Submit", AutoSize = true, Location = new Point(paddingSize, y) };
            control.BackColor = Color.CadetBlue;
            control.ForeColor = Color.White;
            Controls.Add(control);

            y = y + control.Height + paddingSize;
            ClientSize = new Size(ClientSize.Width, y);
        }

        private void UpdateTitleComboBoxOptions()
        {
            var comboBox = Controls.Find<ComboBox>(TitleInputKey);
            comboBox.Items.Clear();
            comboBox.Items.AddRange(GetSelectedAuthor().Shiurim.Select(shiur => string.Join(" - ", shiur.Groups)).Distinct().ToArray());
            comboBox.SelectedIndex = 0;
            UpdateSubtitleComboBoxOptions();
        }

        private void UpdateSubtitleComboBoxOptions()
        {
            var comboBox = Controls.Find<ComboBox>(SubtitleInputKey);
            comboBox.Items.Clear();
            comboBox.Items.AddRange(GetSelectedAuthor().Shiurim.Where(shiur => string.Join(" - ", shiur.Groups) == Controls.Find<ComboBox>(TitleInputKey).SelectedItem.ToString()).Select(shiur => shiur.Version).Distinct().ToArray());
            comboBox.SelectedIndex = 0;
            UpdateDafComboBoxOptions();
        }

        private void UpdateDafComboBoxOptions()
        {
            var comboBox = Controls.Find<ComboBox>(DafInputKey);
            comboBox.Items.Clear();
            comboBox.Items.AddRange(GetSelectedAuthor().Shiurim.Where(shiur => string.Join(" - ", shiur.Groups) == Controls.Find<ComboBox>(TitleInputKey).SelectedItem.ToString()).Where(shiur => shiur.Version == Controls.Find<ComboBox>(SubtitleInputKey).SelectedItem.ToString()).Select(shiur => shiur.Title).ToArray());
            comboBox.SelectedIndex = 0;
        }

        private AuthorMetadata GetSelectedAuthor()
        {
            return StaticData.Authors.First(author => author.Fullname == Controls.Find<ComboBox>(AuthorInputKey).SelectedItem.ToString());
        }
    }

    public static class ControlCollectionExtensions
    {
        public static T Find<T>(this Control.ControlCollection controls, string key) where T : class
        {
            return controls.Find(key, false)[0] as T;
        }
    }
}
