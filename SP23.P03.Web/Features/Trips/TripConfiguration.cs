using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore;
using SP23.P03.Web.Features.BoardingPasses;

namespace SP23.P03.Web.Features.Trips;

public class TripConfiguration : IEntityTypeConfiguration<Trip>
{
    public void Configure(EntityTypeBuilder<Trip> builder)
    {
        builder.Property(x => x.Departure)
               .IsRequired();

        builder.Property(x => x.Arrival)
               .IsRequired();

        builder.Property(x => x.CoachPrice)
               .IsRequired();

        builder.Property(x => x.FirstClassPrice)
               .IsRequired();

        builder.Property(x => x.RoomletPrice)
               .IsRequired();

        builder.Property(x => x.SleeperPrice)
               .IsRequired();

        builder.HasOne(x => x.Train)
               .WithMany()
               .HasForeignKey(x => x.TrainId)
               .IsRequired();

        builder.HasOne(x => x.FromStation)
               .WithMany()
               .HasForeignKey(x => x.FromStationId)
               .IsRequired();

        builder.HasOne(x => x.ToStation)
               .WithMany()
               .HasForeignKey(x => x.ToStationId)
               .IsRequired();

        builder.HasMany(x => x.BoardingPasses)
               .WithMany(x => x.Trips)
               .UsingEntity<BoardingPassTrip>();
    }
}
