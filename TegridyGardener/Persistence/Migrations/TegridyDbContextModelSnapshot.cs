﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Persistence;

namespace Persistence.Migrations
{
    [DbContext(typeof(TegridyDbContext))]
    partial class TegridyDbContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "3.1.3")
                .HasAnnotation("Relational:MaxIdentifierLength", 128)
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("Model.Plant", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<string>("ImageUri")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Name")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int?>("PlantInfoId")
                        .HasColumnType("int");

                    b.Property<int?>("PlantsGroupId")
                        .HasColumnType("int");

                    b.Property<int?>("RuleId")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("PlantInfoId");

                    b.HasIndex("PlantsGroupId");

                    b.HasIndex("RuleId");

                    b.ToTable("Plants");
                });

            modelBuilder.Entity("Model.PlantInfo", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("Description")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("ImageUri")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Name")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int?>("RuleId")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("RuleId");

                    b.ToTable("PlantsInfo");
                });

            modelBuilder.Entity("Model.PlantsGroup", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("Name")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int?>("UserId")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("UserId");

                    b.ToTable("PlantsGroups");
                });

            modelBuilder.Entity("Model.Rule", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<int>("HoursBetweenWatering")
                        .HasColumnType("int");

                    b.Property<int>("WaterInMilliliters")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.ToTable("Rules");
                });

            modelBuilder.Entity("Model.ScheduledAction", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<double>("AmountOfWaterMilliliters")
                        .HasColumnType("float");

                    b.Property<DateTime?>("ExecutionDate")
                        .HasColumnType("datetime2");

                    b.Property<string>("ImagePath")
                        .HasColumnType("nvarchar(max)");

                    b.Property<bool>("IsDone")
                        .HasColumnType("bit");

                    b.Property<Guid>("PlantId")
                        .HasColumnType("uniqueidentifier");

                    b.Property<string>("Recommendation")
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateTime?>("ScheduledDate")
                        .HasColumnType("datetime2");

                    b.Property<int?>("UserId")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("PlantId");

                    b.HasIndex("UserId");

                    b.ToTable("PlantsAudit");
                });

            modelBuilder.Entity("Model.User", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("Email")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Password")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("Users");
                });

            modelBuilder.Entity("Model.Plant", b =>
                {
                    b.HasOne("Model.PlantInfo", "PlantInfo")
                        .WithMany()
                        .HasForeignKey("PlantInfoId");

                    b.HasOne("Model.PlantsGroup", null)
                        .WithMany("Plants")
                        .HasForeignKey("PlantsGroupId");

                    b.HasOne("Model.Rule", "Rule")
                        .WithMany()
                        .HasForeignKey("RuleId");
                });

            modelBuilder.Entity("Model.PlantInfo", b =>
                {
                    b.HasOne("Model.Rule", "Rule")
                        .WithMany()
                        .HasForeignKey("RuleId");
                });

            modelBuilder.Entity("Model.PlantsGroup", b =>
                {
                    b.HasOne("Model.User", null)
                        .WithMany("PlantsGroups")
                        .HasForeignKey("UserId");
                });

            modelBuilder.Entity("Model.ScheduledAction", b =>
                {
                    b.HasOne("Model.Plant", "Plant")
                        .WithMany()
                        .HasForeignKey("PlantId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("Model.User", null)
                        .WithMany("PlantsAudits")
                        .HasForeignKey("UserId");
                });
#pragma warning restore 612, 618
        }
    }
}
