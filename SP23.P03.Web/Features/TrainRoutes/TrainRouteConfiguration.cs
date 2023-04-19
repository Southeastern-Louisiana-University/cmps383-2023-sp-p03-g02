using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore;

namespace SP23.P03.Web.Features.TrainRoutes;

public class TrainRouteConfiguration : IEntityTypeConfiguration<TrainRoute>
{
    public void Configure(EntityTypeBuilder<TrainRoute> builder)
    {
        builder.HasKey(x => new { x.StationAId, x.StationBId });

        builder.Property(x => x.DistanceMiles)
               .IsRequired();

        builder.Property(x => x.GeographyMultiplier)
               .IsRequired();

        builder.HasOne(x => x.StationA)
               .WithMany()
               .HasForeignKey(x => x.StationAId)
               .IsRequired()
               .OnDelete(DeleteBehavior.NoAction);

        builder.HasOne(x => x.StationB)
               .WithMany()
               .HasForeignKey(x => x.StationBId)
               .IsRequired()
               .OnDelete(DeleteBehavior.NoAction);
    }
}
