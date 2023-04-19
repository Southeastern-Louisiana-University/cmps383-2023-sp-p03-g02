using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace SP23.P03.Web.Migrations
{
    /// <inheritdoc />
    public partial class AddTrainRoutes : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "TrainRoute",
                columns: table => new
                {
                    StationAId = table.Column<int>(type: "int", nullable: false),
                    StationBId = table.Column<int>(type: "int", nullable: false),
                    DistanceMiles = table.Column<double>(type: "float", nullable: false),
                    GeographyMultiplier = table.Column<double>(type: "float", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TrainRoute", x => new { x.StationAId, x.StationBId });
                    table.ForeignKey(
                        name: "FK_TrainRoute_TrainStation_StationAId",
                        column: x => x.StationAId,
                        principalTable: "TrainStation",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_TrainRoute_TrainStation_StationBId",
                        column: x => x.StationBId,
                        principalTable: "TrainStation",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateIndex(
                name: "IX_TrainRoute_StationBId",
                table: "TrainRoute",
                column: "StationBId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "TrainRoute");
        }
    }
}
