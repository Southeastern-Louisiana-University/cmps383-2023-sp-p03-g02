using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace SP23.P03.Web.Migrations
{
    /// <inheritdoc />
    public partial class AddBoardingPasses : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "BoardingPass",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Code = table.Column<string>(type: "nvarchar(64)", maxLength: 64, nullable: false),
                    OwnerId = table.Column<int>(type: "int", nullable: false),
                    TripId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_BoardingPass", x => x.Id);
                    table.ForeignKey(
                        name: "FK_BoardingPass_AspNetUsers_OwnerId",
                        column: x => x.OwnerId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_BoardingPass_Trip_TripId",
                        column: x => x.TripId,
                        principalTable: "Trip",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "BoardingPassenger",
                columns: table => new
                {
                    BoardingPassId = table.Column<int>(type: "int", nullable: false),
                    PassengerId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_BoardingPassenger", x => new { x.BoardingPassId, x.PassengerId });
                    table.ForeignKey(
                        name: "FK_BoardingPassenger_BoardingPass_BoardingPassId",
                        column: x => x.BoardingPassId,
                        principalTable: "BoardingPass",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_BoardingPassenger_Passenger_PassengerId",
                        column: x => x.PassengerId,
                        principalTable: "Passenger",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateIndex(
                name: "IX_BoardingPass_OwnerId",
                table: "BoardingPass",
                column: "OwnerId");

            migrationBuilder.CreateIndex(
                name: "IX_BoardingPass_TripId",
                table: "BoardingPass",
                column: "TripId");

            migrationBuilder.CreateIndex(
                name: "IX_BoardingPassenger_PassengerId",
                table: "BoardingPassenger",
                column: "PassengerId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "BoardingPassenger");

            migrationBuilder.DropTable(
                name: "BoardingPass");
        }
    }
}
