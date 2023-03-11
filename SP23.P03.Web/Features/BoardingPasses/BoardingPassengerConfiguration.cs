using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore;

namespace SP23.P03.Web.Features.BoardingPasses;

public class BoardingPassengerConfiguration : IEntityTypeConfiguration<BoardingPassenger>
{
    public void Configure(EntityTypeBuilder<BoardingPassenger> builder)
    {
        builder.HasKey(x => new { x.BoardingPassId, x.PassengerId });

        builder.HasOne(x => x.BoardingPass)
               .WithMany()
               .HasForeignKey(x => x.BoardingPassId)
               .OnDelete(DeleteBehavior.ClientCascade);

        builder.HasOne(x => x.Passenger)
               .WithMany()
               .HasForeignKey(x => x.PassengerId)
               .OnDelete(DeleteBehavior.ClientCascade);
    }
}
