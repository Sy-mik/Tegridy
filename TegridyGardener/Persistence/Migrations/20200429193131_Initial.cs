using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Persistence.Migrations
{
    public partial class Initial : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Rules",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    WaterInMilliliters = table.Column<int>(nullable: false),
                    HoursBetweenWatering = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Rules", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Users",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Email = table.Column<string>(nullable: true),
                    Password = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Users", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "PlantsInfo",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(nullable: true),
                    Description = table.Column<string>(nullable: true),
                    ImageUri = table.Column<string>(nullable: true),
                    RuleId = table.Column<int>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PlantsInfo", x => x.Id);
                    table.ForeignKey(
                        name: "FK_PlantsInfo_Rules_RuleId",
                        column: x => x.RuleId,
                        principalTable: "Rules",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "PlantsGroups",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(nullable: true),
                    UserId = table.Column<int>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PlantsGroups", x => x.Id);
                    table.ForeignKey(
                        name: "FK_PlantsGroups_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Plants",
                columns: table => new
                {
                    Id = table.Column<Guid>(nullable: false),
                    Name = table.Column<string>(nullable: true),
                    PlantInfoId = table.Column<int>(nullable: true),
                    ImageUri = table.Column<string>(nullable: true),
                    RuleId = table.Column<int>(nullable: true),
                    PlantsGroupId = table.Column<int>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Plants", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Plants_PlantsInfo_PlantInfoId",
                        column: x => x.PlantInfoId,
                        principalTable: "PlantsInfo",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Plants_PlantsGroups_PlantsGroupId",
                        column: x => x.PlantsGroupId,
                        principalTable: "PlantsGroups",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Plants_Rules_RuleId",
                        column: x => x.RuleId,
                        principalTable: "Rules",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "PlantsAudit",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    AmountOfWaterMilliliters = table.Column<double>(nullable: false),
                    PlantId = table.Column<Guid>(nullable: false),
                    ImagePath = table.Column<string>(nullable: true),
                    ScheduledDate = table.Column<DateTime>(nullable: true),
                    ExecutionDate = table.Column<DateTime>(nullable: true),
                    Recommendation = table.Column<string>(nullable: true),
                    IsDone = table.Column<bool>(nullable: false),
                    UserId = table.Column<int>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PlantsAudit", x => x.Id);
                    table.ForeignKey(
                        name: "FK_PlantsAudit_Plants_PlantId",
                        column: x => x.PlantId,
                        principalTable: "Plants",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_PlantsAudit_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Plants_PlantInfoId",
                table: "Plants",
                column: "PlantInfoId");

            migrationBuilder.CreateIndex(
                name: "IX_Plants_PlantsGroupId",
                table: "Plants",
                column: "PlantsGroupId");

            migrationBuilder.CreateIndex(
                name: "IX_Plants_RuleId",
                table: "Plants",
                column: "RuleId");

            migrationBuilder.CreateIndex(
                name: "IX_PlantsAudit_PlantId",
                table: "PlantsAudit",
                column: "PlantId");

            migrationBuilder.CreateIndex(
                name: "IX_PlantsAudit_UserId",
                table: "PlantsAudit",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_PlantsGroups_UserId",
                table: "PlantsGroups",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_PlantsInfo_RuleId",
                table: "PlantsInfo",
                column: "RuleId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "PlantsAudit");

            migrationBuilder.DropTable(
                name: "Plants");

            migrationBuilder.DropTable(
                name: "PlantsInfo");

            migrationBuilder.DropTable(
                name: "PlantsGroups");

            migrationBuilder.DropTable(
                name: "Rules");

            migrationBuilder.DropTable(
                name: "Users");
        }
    }
}
