using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace SP23.P03.Web.Migrations
{
    /// <inheritdoc />
    public partial class WipeEverything : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql(
@"DELETE FROM BoardingPassenger
DELETE FROM BoardingPassTrip
DELETE FROM BoardingPass
DELETE FROM Trip
DELETE FROM TrainRoute
DELETE FROM Passenger
DELETE FROM TrainStation
DELETE FROM Train
");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {

        }
    }
}
