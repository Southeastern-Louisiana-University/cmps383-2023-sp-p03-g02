using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore;

namespace SP23.P03.Web.Features.BoardingPasses;

public class BoardingPassTripConfiguration : IEntityTypeConfiguration<BoardingPassTrip>
{
    public void Configure(EntityTypeBuilder<BoardingPassTrip> builder)
    {
        builder.HasKey(x => new { x.BoardingPassId, x.TripId });

        builder.HasOne(x => x.BoardingPass)
               .WithMany()
               .HasForeignKey(x => x.BoardingPassId)
               .OnDelete(DeleteBehavior.ClientCascade);

        builder.HasOne(x => x.Trip)
               .WithMany()
               .HasForeignKey(x => x.TripId)
               .OnDelete(DeleteBehavior.ClientCascade);
    }
}
