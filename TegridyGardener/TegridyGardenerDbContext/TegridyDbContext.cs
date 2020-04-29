using Microsoft.EntityFrameworkCore;
using Model;

namespace TegridyGardenerDbContext
{
    public class TegridyDbContext : DbContext
    {
        public TegridyDbContext()
        {
            
        }
        public TegridyDbContext(DbContextOptions<TegridyDbContext> options) :base(options)
        {
            MockedData.Initialize(this);
        }

        public DbSet<Plant> Plants { get; set; }

        public DbSet<ScheduledAction> PlantsAudit { get; set; }

        public DbSet<PlantInfo> PlantsInfo { get; set; }

        public DbSet<PlantsGroup> PlantsGroups { get; set; }

        public DbSet<User> Users { get; set; }

        
        public DbSet<Rule> Rules { get; set; }
    }
}