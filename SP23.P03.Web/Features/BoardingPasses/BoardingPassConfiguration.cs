using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore;

namespace SP23.P03.Web.Features.BoardingPasses
{
    public class BoardingPassConfiguration : IEntityTypeConfiguration<BoardingPass>
    {
        public void Configure(EntityTypeBuilder<BoardingPass> builder)
        {
            builder.Property(x => x.Code)
                   .HasMaxLength(64)
                   .IsRequired();

            builder.HasOne(x => x.Owner)
                   .WithMany()
                   .HasForeignKey(x => x.OwnerId)
                   .IsRequired();

            builder.HasOne(x => x.Trip)
                   .WithMany()
                   .HasForeignKey(x => x.TripId)
                   .IsRequired();

            builder.HasMany(x => x.Passengers)
                   .WithMany()
                   .UsingEntity<BoardingPassenger>();
        }
    }
}
