using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore;

namespace SP23.P03.Web.Features.BoardingPasses;

public class BoardingPassengerConfiguration : IEntityTypeConfiguration<BoardingPassenger>
{
    public void Configure(EntityTypeBuilder<BoardingPassenger> builder)
    {
        builder.HasOne(x => x.BoardingPass)
               .WithMany()
               .HasForeignKey(x => x.BoardingPassId)
               .IsRequired();

        builder.HasOne(x => x.Passenger)
               .WithMany()
               .HasForeignKey(x => x.PassengerId)
               .IsRequired();
    }
}
