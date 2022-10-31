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
                    ForceType = table.Column<string>(type: "nvarchar(100)", nullable: true),
                    Xp = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    Fy = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    Xm = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    M = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    XStartUDL = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    XEndUDL = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    FyUDL = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    XStartLDL = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    XEndLDL = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    Fy_StartLDL = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    Fy_EndLDL = table.Column<decimal>(type: "decimal(18,2)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Types", x => x.TypeId);
                });

            migrationBuilder.CreateTable(
                name: "BeamType",
                columns: table => new
                {
                    BeamsBeamId = table.Column<int>(type: "int", nullable: false),
                    TypesTypeId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_BeamType", x => new { x.BeamsBeamId, x.TypesTypeId });
                    table.ForeignKey(
                        name: "FK_BeamType_Beams_BeamsBeamId",
                        column: x => x.BeamsBeamId,
                        principalTable: "Beams",
                        principalColumn: "BeamId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_BeamType_Types_TypesTypeId",
                        column: x => x.TypesTypeId,
                        principalTable: "Types",
                        principalColumn: "TypeId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "BeamTypes",
                columns: table => new
                {
                    BeamTypeId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    BeamId = table.Column<int>(type: "int", nullable: false),
                    TypeId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_BeamTypes", x => x.BeamTypeId);
                    table.ForeignKey(
                        name: "FK_BeamTypes_Beams_BeamId",
                        column: x => x.BeamId,
                        principalTable: "Beams",
                        principalColumn: "BeamId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_BeamTypes_Types_TypeId",
                        column: x => x.TypeId,
                        principalTable: "Types",
                        principalColumn: "TypeId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_BeamType_TypesTypeId",
                table: "BeamType",
                column: "TypesTypeId");

            migrationBuilder.CreateIndex(
                name: "IX_BeamTypes_BeamId",
                table: "BeamTypes",
                column: "BeamId");

            migrationBuilder.CreateIndex(
                name: "IX_BeamTypes_TypeId",
                table: "BeamTypes",
                column: "TypeId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "BeamType");

            migrationBuilder.DropTable(
                name: "BeamTypes");

            migrationBuilder.DropTable(
                name: "Beams");

            migrationBuilder.DropTable(
                name: "Types");
        }
    }
}
