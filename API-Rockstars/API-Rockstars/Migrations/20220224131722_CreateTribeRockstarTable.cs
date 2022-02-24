using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace API_Rockstars.Migrations
{
    public partial class CreateTribeRockstarTable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "TribeRockstars",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    TribeId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    RockstarId = table.Column<Guid>(type: "uniqueidentifier", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TribeRockstars", x => x.Id);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "TribeRockstars");
        }
    }
}
