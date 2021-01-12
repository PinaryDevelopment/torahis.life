using Microsoft.EntityFrameworkCore;
using PinaryDevelopment.TorahIsLife.AudioFiles.DataAccess.Contracts;
using PinaryDevelopment.TorahIsLife.Organizations.DataAccess.Contracts;
using PinaryDevelopment.TorahIsLife.People.DataAccess.Contracts;
using PinaryDevelopment.TorahIsLife.Tags.DataAccess.Contracts;

namespace PinaryDevelopment.TorahIsLife.DataAccess
{
    public class TorahIsLifeDbContext : DbContext
    {
        public TorahIsLifeDbContext(DbContextOptions<TorahIsLifeDbContext> options) : base(options) { }

        public DbSet<AudioFileDto> AudioFiles { get; set; }
        public DbSet<OrganizationDto> Organizations { get; set; }
        public DbSet<PersonDto> People { get; set; }
        public DbSet<TagDto> Tags { get; set; }
        public DbSet<TagTypeDto> TagTypes { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<AudioFileDto>()
                        .ToTable("AudioFiles", "til");

            modelBuilder.Entity<OrganizationDto>()
                        .ToTable("Organizations", "til")
                        .HasData(
                            new OrganizationDto { Id = "doma.in", Name = "Name 1" },
                            new OrganizationDto { Id = "dom.ain", Name = "Name 2" }
                        );

            modelBuilder.Entity<PersonDto>()
                        .ToTable("People", "til")
                        .HasData(
                            new PersonDto { Id = "fakeuser@gmail.com", FirstName = "fake", LastName = "user", Title = "mr" }
                        );

            modelBuilder.Entity<TagDto>()
                        .ToTable("Tags", "til");

            modelBuilder.Entity<TagTypeDto>()
                        .ToTable("TagTypes", "til")
                        .HasData(
                            new TagTypeDto { Id = TagTypeDto.SeriesTitle },
                            new TagTypeDto { Id = TagTypeDto.SeferTitle },
                            new TagTypeDto { Id = TagTypeDto.Subtitle },
                            new TagTypeDto { Id = TagTypeDto.Metadata },
                            new TagTypeDto { Id = TagTypeDto.SeferSeriesTitle }
                        );
        }
    }
}
