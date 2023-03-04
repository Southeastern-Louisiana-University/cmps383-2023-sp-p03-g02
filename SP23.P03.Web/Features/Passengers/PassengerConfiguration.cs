using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace SP23.P03.Web.Features.Passengers
{
    public class PassengerConfiguration: IEntityTypeConfiguration<Passenger>
    {
        public void Configure(EntityTypeBuilder<Passenger> builder)
        {
            builder.Property(x => x.Owner)
                   .IsRequired();

            builder.Property(x => x.FirstName)
                   .HasMaxLength(64)
                   .IsRequired();

            builder.Property(x => x.LastName)
                   .HasMaxLength(64)
                   .IsRequired();

            builder.Property(x => x.Birthday)
                   .IsRequired();

            builder.HasOne(x => x.Owner)
                   .WithMany(x => x.OwnedPassengers)
                   .HasForeignKey(x => x.OwnerId);
        }
    }
}
