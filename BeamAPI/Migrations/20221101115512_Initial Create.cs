using Microsoft.EntityFrameworkCore.Migrations;

namespace BeamAPI.Migrations
{
    public partial class InitialCreate : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Beams",
                columns: table => new
                {
                    BeamId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    BeamName = table.Column<string>(type: "nvarchar(100)", nullable: true),
                    Span = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    A = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    B = table.Column<decimal>(type: "decimal(18,2)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Beams", x => x.BeamId);
                });

            migrationBuilder.CreateTable(
                name: "Types",
                columns: table => new
                {
                    TypeId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Xp = table.Column<string>(type: "nvarchar(100)", nullable: false),
                    Fy = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    Xm = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    M = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    XStartUDL = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    XEndUDL = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    FyUDL = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    XStartLDL = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    XEndLDL = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    Fy_StartLDL = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    Fy_EndLDL = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    BeamId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Types", x => x.TypeId);
                    table.ForeignKey(
                        name: "FK_Types_Beams_BeamId",
                        column: x => x.BeamId,
                        principalTable: "Beams",
                        principalColumn: "BeamId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Types_BeamId",
                table: "Types",
                column: "BeamId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Types");

            migrationBuilder.DropTable(
                name: "Beams");
        }
    }
}
