using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace API_Rockstars.Migrations
{
    public partial class ChangeRockstarImageDataType : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<string>(
                name: "Image",
                table: "Rockstars",
                type: "varchar(MAX)",
                nullable: true,
                oldClrType: typeof(byte[]),
                oldType: "varbinary(max)",
                oldNullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<byte[]>(
                name: "Image",
                table: "Rockstars",
                type: "varbinary(max)",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "varchar(MAX)",
                oldNullable: true);
        }
    }
}
