using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace API_Rockstars.Migrations
{
    public partial class UpdateConcept : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "Concept",
                table: "Articles",
                type: "bit",
                nullable: false,
                defaultValue: false);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Concept",
                table: "Articles");
        }
    }
}
