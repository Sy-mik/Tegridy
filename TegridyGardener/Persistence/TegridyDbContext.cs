using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;
using Model;

namespace Persistence
{
    public class TegridyDbContext : DbContext
    {
        public TegridyDbContext()
        {
        }
        
        public TegridyDbContext(DbContextOptions<TegridyDbContext> options) :base(options)
        {
          //  MockedData.Initialize(this);
        }

        public DbSet<Plant> Plants { get; set; }

        public DbSet<ScheduledAction> PlantsAudit { get; set; }

        public DbSet<PlantInfo> PlantsInfo { get; set; }

        public DbSet<PlantsGroup> PlantsGroups { get; set; }

        public DbSet<User> Users { get; set; }

        
        public DbSet<Rule> Rules { get; set; }
    }
    
    public class TegridyContextFacotry : IDesignTimeDbContextFactory<TegridyDbContext>
    {

            public TegridyDbContext CreateDbContext(string[] args)
            {
                var optionsBuilder = new DbContextOptionsBuilder<TegridyDbContext>();

                var connection =
                    @"Server=localhost,1433;Initial Catalog=master;Persist Security Info=False;User ID=sa;Password=WelcomeToTheJungle;MultipleActiveResultSets=False;Encrypt=True;TrustServerCertificate=True;Connection Timeout=60;";
                optionsBuilder.UseSqlServer(connection);

                return new TegridyDbContext(optionsBuilder.Options);
            }
    }
}