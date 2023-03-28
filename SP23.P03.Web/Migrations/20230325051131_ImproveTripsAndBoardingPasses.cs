using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace SP23.P03.Web.Migrations
{
    /// <inheritdoc />
    public partial class ImproveTripsAndBoardingPasses : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql("DELETE FROM BoardingPassenger;");
            migrationBuilder.Sql("DELETE FROM BoardingPass;");
            migrationBuilder.Sql("DELETE FROM Trip;");
            migrationBuilder.Sql("DELETE FROM Train;");

            migrationBuilder.DropForeignKey(
                name: "FK_BoardingPass_Trip_TripId",
                table: "BoardingPass");

            migrationBuilder.DropIndex(
                name: "IX_BoardingPass_TripId",
                table: "BoardingPass");

            migrationBuilder.DropColumn(
                name: "Capacity",
                table: "Train");

            migrationBuilder.DropColumn(
                name: "BasePrice",
                table: "Trip");

            migrationBuilder.DropColumn(
                name: "TripId",
                table: "BoardingPass");

            migrationBuilder.AddColumn<int>(
                name: "CoachPrice",
                table: "Trip",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "FirstClassPrice",
                table: "Trip",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "RoomletPrice",
                table: "Trip",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "SleeperPrice",
                table: "Trip",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "CoachCapacity",
                table: "Train",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "FirstClassCapacity",
                table: "Train",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "RoomletCapacity",
                table: "Train",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "SleeperCapacity",
                table: "Train",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "TravelClass",
                table: "BoardingPass",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateTable(
                name: "BoardingPassTrip",
                columns: table => new
                {
                    BoardingPassId = table.Column<int>(type: "int", nullable: false),
                    TripId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_BoardingPassTrip", x => new { x.BoardingPassId, x.TripId });
                    table.ForeignKey(
                        name: "FK_BoardingPassTrip_BoardingPass_BoardingPassId",
                        column: x => x.BoardingPassId,
                        principalTable: "BoardingPass",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_BoardingPassTrip_Trip_TripId",
                        column: x => x.TripId,
                        principalTable: "Trip",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateIndex(
                name: "IX_BoardingPassTrip_TripId",
                table: "BoardingPassTrip",
                column: "TripId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "BoardingPassTrip");

            migrationBuilder.DropColumn(
                name: "SleeperPrice",
                table: "Trip");

            migrationBuilder.DropColumn(
                name: "FirstClassPrice",
                table: "Trip");

            migrationBuilder.DropColumn(
                name: "RoomletPrice",
                table: "Trip");

            migrationBuilder.DropColumn(
                name: "CoachCapacity",
                table: "Train");

            migrationBuilder.DropColumn(
                name: "FirstClassCapacity",
                table: "Train");

            migrationBuilder.DropColumn(
                name: "RoomletCapacity",
                table: "Train");

            migrationBuilder.DropColumn(
                name: "SleeperCapacity",
                table: "Train");

            migrationBuilder.RenameColumn(
                name: "CoachPrice",
                table: "Trip",
                newName: "BasePrice");

            migrationBuilder.DropColumn(
                name: "TravelClass",
                table: "BoardingPass");

            migrationBuilder.AddColumn<int>(
                name: "TripId",
                table: "BoardingPass",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "Capacity",
                table: "Train",
                type: "int",
                maxLength: 150,
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_BoardingPass_TripId",
                table: "BoardingPass",
                column: "TripId");

            migrationBuilder.AddForeignKey(
                name: "FK_BoardingPass_Trip_TripId",
                table: "BoardingPass",
                column: "TripId",
                principalTable: "Trip",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
