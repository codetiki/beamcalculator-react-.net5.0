﻿// <auto-generated />
using BeamAPI.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

namespace BeamAPI.Migrations
{
    [DbContext(typeof(BeamDbContext))]
    partial class BeamDbContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("Relational:MaxIdentifierLength", 128)
                .HasAnnotation("ProductVersion", "5.0.17")
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("BeamAPI.Models.Beam", b =>
                {
                    b.Property<int>("BeamId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<decimal>("A")
                        .HasColumnType("decimal(18,2)");

                    b.Property<decimal>("B")
                        .HasColumnType("decimal(18,2)");

                    b.Property<string>("BeamDefinition")
                        .HasColumnType("nvarchar(200)");

                    b.Property<string>("BeamName")
                        .HasColumnType("nvarchar(200)");

                    b.Property<decimal>("Mmax")
                        .HasColumnType("decimal(18,2)");

                    b.Property<decimal>("Mmin")
                        .HasColumnType("decimal(18,2)");

                    b.Property<decimal>("Span")
                        .HasColumnType("decimal(18,2)");

                    b.Property<decimal>("Vmax")
                        .HasColumnType("decimal(18,2)");

                    b.Property<decimal>("Vmin")
                        .HasColumnType("decimal(18,2)");

                    b.HasKey("BeamId");

                    b.ToTable("Beams");
                });

            modelBuilder.Entity("BeamAPI.Models.ForceType", b =>
                {
                    b.Property<int>("ForceTypeId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("ForceTypeDefinition")
                        .HasColumnType("nvarchar(200)");

                    b.Property<string>("ForceTypeName")
                        .HasColumnType("nvarchar(200)");

                    b.HasKey("ForceTypeId");

                    b.ToTable("ForceTypes");
                });

            modelBuilder.Entity("BeamAPI.Models.Type", b =>
                {
                    b.Property<int>("TypeId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("BeamDefinition")
                        .HasColumnType("nvarchar(200)");

                    b.Property<int>("BeamId")
                        .HasColumnType("int");

                    b.Property<decimal>("Fy")
                        .HasColumnType("decimal(18,2)");

                    b.Property<decimal>("FyUDL")
                        .HasColumnType("decimal(18,2)");

                    b.Property<decimal>("Fy_EndLDL")
                        .HasColumnType("decimal(18,2)");

                    b.Property<decimal>("Fy_StartLDL")
                        .HasColumnType("decimal(18,2)");

                    b.Property<decimal>("M")
                        .HasColumnType("decimal(18,2)");

                    b.Property<decimal>("XEndLDL")
                        .HasColumnType("decimal(18,2)");

                    b.Property<decimal>("XEndUDL")
                        .HasColumnType("decimal(18,2)");

                    b.Property<decimal>("XStartLDL")
                        .HasColumnType("decimal(18,2)");

                    b.Property<decimal>("XStartUDL")
                        .HasColumnType("decimal(18,2)");

                    b.Property<decimal>("Xm")
                        .HasColumnType("decimal(18,2)");

                    b.Property<decimal>("Xp")
                        .HasColumnType("decimal(18,2)");

                    b.HasKey("TypeId");

                    b.HasIndex("BeamId");

                    b.ToTable("Types");
                });

            modelBuilder.Entity("BeamAPI.Models.Type", b =>
                {
                    b.HasOne("BeamAPI.Models.Beam", "Beam")
                        .WithMany("Types")
                        .HasForeignKey("BeamId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Beam");
                });

            modelBuilder.Entity("BeamAPI.Models.Beam", b =>
                {
                    b.Navigation("Types");
                });
#pragma warning restore 612, 618
        }
    }
}
