using System.Collections.Generic;

namespace Model
{
    public class User
    {
//        public User()
//        {
//            PlantsGroups = new List<PlantsGroup>();
//            PlantsAudits = new List<ScheduledAction>();
//        }

        public int Id { get; set; }

        public string Email { get; set; }

        public string Password { get; set; }

        public ICollection<PlantsGroup> PlantsGroups { get; }

        public ICollection<ScheduledAction> PlantsAudits { get; }
    }
}