using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace PinaryDevelopment.TorahIsLife.DataAccess.Migrations
{
    public partial class Init : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.EnsureSchema(
                name: "til");

            migrationBuilder.CreateTable(
                name: "AudioFiles",
                schema: "til",
                columns: table => new
                {
                    Id = table.Column<string>(nullable: false),
                    Title = table.Column<string>(nullable: true),
                    Duration = table.Column<TimeSpan>(nullable: false),
                    OriginalFileSizeInBytes = table.Column<long>(nullable: false),
                    ProcessedFileSizeInBytes = table.Column<long>(nullable: false),
                    OrderInSeries = table.Column<int>(nullable: false),
                    RecordedOn = table.Column<DateTimeOffset>(nullable: false),
                    UploadedOn = table.Column<DateTimeOffset>(nullable: false),
                    ProcessedOn = table.Column<DateTimeOffset>(nullable: false),
                    ReleasedOn = table.Column<DateTimeOffset>(nullable: false),
                    AuthorId = table.Column<string>(nullable: true),
                    OrganizationId = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AudioFiles", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Organizations",
                schema: "til",
                columns: table => new
                {
                    Id = table.Column<string>(nullable: false),
                    Name = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Organizations", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "People",
                schema: "til",
                columns: table => new
                {
                    Id = table.Column<string>(nullable: false),
                    Title = table.Column<string>(nullable: true),
                    FirstName = table.Column<string>(nullable: true),
                    LastName = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_People", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "TagTypes",
                schema: "til",
                columns: table => new
                {
                    Id = table.Column<string>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TagTypes", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Tags",
                schema: "til",
                columns: table => new
                {
                    Id = table.Column<string>(nullable: false),
                    Tag = table.Column<string>(nullable: true),
                    TypeId = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Tags", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Tags_TagTypes_TypeId",
                        column: x => x.TypeId,
                        principalSchema: "til",
                        principalTable: "TagTypes",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });


            migrationBuilder.InsertData(
                schema: "til",
                table: "TagTypes",
                column: "Id",
                values: new object[]
                {
                    "SeriesTitle",
                    "SeferTitle",
                    "Subtitle",
                    "Metadata",
                    "SeferSeriesTitle"
                });

            migrationBuilder.CreateIndex(
                name: "IX_Tags_TypeId",
                schema: "til",
                table: "Tags",
                column: "TypeId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "AudioFiles",
                schema: "til");

            migrationBuilder.DropTable(
                name: "Organizations",
                schema: "til");

            migrationBuilder.DropTable(
                name: "People",
                schema: "til");

            migrationBuilder.DropTable(
                name: "Tags",
                schema: "til");

            migrationBuilder.DropTable(
                name: "TagTypes",
                schema: "til");
        }
    }
}
