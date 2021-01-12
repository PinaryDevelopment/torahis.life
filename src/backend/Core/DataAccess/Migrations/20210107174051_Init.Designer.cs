﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using PinaryDevelopment.TorahIsLife.DataAccess;

namespace PinaryDevelopment.TorahIsLife.DataAccess.Migrations
{
    [DbContext(typeof(TorahIsLifeDbContext))]
    [Migration("20210107174051_Init")]
    partial class Init
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "3.1.10")
                .HasAnnotation("Relational:MaxIdentifierLength", 128)
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("PinaryDevelopment.TorahIsLife.AudioFiles.DataAccess.Contracts.AudioFileDto", b =>
                {
                    b.Property<string>("Id")
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("AuthorId")
                        .HasColumnType("nvarchar(max)");

                    b.Property<TimeSpan>("Duration")
                        .HasColumnType("time");

                    b.Property<int>("OrderInSeries")
                        .HasColumnType("int");

                    b.Property<string>("OrganizationId")
                        .HasColumnType("nvarchar(max)");

                    b.Property<long>("OriginalFileSizeInBytes")
                        .HasColumnType("bigint");

                    b.Property<long>("ProcessedFileSizeInBytes")
                        .HasColumnType("bigint");

                    b.Property<DateTimeOffset>("ProcessedOn")
                        .HasColumnType("datetimeoffset");

                    b.Property<DateTimeOffset>("RecordedOn")
                        .HasColumnType("datetimeoffset");

                    b.Property<DateTimeOffset>("ReleasedOn")
                        .HasColumnType("datetimeoffset");

                    b.Property<string>("Title")
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateTimeOffset>("UploadedOn")
                        .HasColumnType("datetimeoffset");

                    b.HasKey("Id");

                    b.ToTable("AudioFiles","til");
                });

            modelBuilder.Entity("PinaryDevelopment.TorahIsLife.Organizations.DataAccess.Contracts.OrganizationDto", b =>
                {
                    b.Property<string>("Id")
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("Name")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("Organizations","til");
                });

            modelBuilder.Entity("PinaryDevelopment.TorahIsLife.People.DataAccess.Contracts.PersonDto", b =>
                {
                    b.Property<string>("Id")
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("FirstName")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("LastName")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Title")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("People","til");
                });

            modelBuilder.Entity("PinaryDevelopment.TorahIsLife.Tags.DataAccess.Contracts.TagDto", b =>
                {
                    b.Property<string>("Id")
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("Tag")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("TypeId")
                        .HasColumnType("nvarchar(450)");

                    b.HasKey("Id");

                    b.HasIndex("TypeId");

                    b.ToTable("Tags","til");
                });

            modelBuilder.Entity("PinaryDevelopment.TorahIsLife.Tags.DataAccess.Contracts.TagTypeDto", b =>
                {
                    b.Property<string>("Id")
                        .HasColumnType("nvarchar(450)");

                    b.HasKey("Id");

                    b.ToTable("TagTypes","til");

                    b.HasData(
                        new
                        {
                            Id = "SeriesTitle"
                        },
                        new
                        {
                            Id = "SeferTitle"
                        },
                        new
                        {
                            Id = "Subtitle"
                        },
                        new
                        {
                            Id = "Metadata"
                        },
                        new
                        {
                            Id = "SeferSeriesTitle"
                        });
                });

            modelBuilder.Entity("PinaryDevelopment.TorahIsLife.Tags.DataAccess.Contracts.TagDto", b =>
                {
                    b.HasOne("PinaryDevelopment.TorahIsLife.Tags.DataAccess.Contracts.TagTypeDto", "Type")
                        .WithMany()
                        .HasForeignKey("TypeId");
                });
#pragma warning restore 612, 618
        }
    }
}
