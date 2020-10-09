using System.Collections.ObjectModel;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Internal;
using Model;

namespace Persistence
{
    public class TegridyDbContext : DbContext
    {
        private object x = new object();

        public TegridyDbContext(DbContextOptions<TegridyDbContext> options) : base(options)
        {
            if (!Users.Any())
            {
                lock (x)
                {
//                    PlantsAudit.Add(MockedData.scheduledAction);
                    PlantsInfo.Add(MockedData.plantInfo);
                    Plants.Add(MockedData.plant);
                    Users.Add(MockedData.user);
                    this.SaveChanges();
                }
            }
        }

        public DbSet<Plant> Plants { get; set; }

        public DbSet<ScheduledAction> PlantsAudit { get; set; }

        public DbSet<PlantInfo> PlantsInfo { get; set; }

        public DbSet<PlantsGroup> PlantsGroups { get; set; }

        public DbSet<User> Users { get; set; }


        public DbSet<Rule> Rules { get; set; }


        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);
        }
    }

//    public class TegridyContextFacotry : IDesignTimeDbContextFactory<TegridyDbContext>
//    {
//
//            public TegridyDbContext CreateDbContext(string[] args)
//            {
//                var optionsBuilder = new DbContextOptionsBuilder<TegridyDbContext>();
//
//                var connection =
//                    @"Server=localhost,1433;Initial Catalog=master;Persist Security Info=False;User ID=sa;Password=WelcomeToTheJungle;MultipleActiveResultSets=False;Encrypt=True;TrustServerCertificate=True;Connection Timeout=60;";
//                optionsBuilder.UseSqlServer(connection);
//
//                return new TegridyDbContext(optionsBuilder.Options);
//            }
//    }
}