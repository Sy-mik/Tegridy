using System.Collections.Generic;

namespace Model
{
    public class PlantsGroup
    {
        public PlantsGroup()
        {
            Plants = new List<Plant>();
        }

        public int Id { get; set; }

        public string Name { get; set; }

        public ICollection<Plant> Plants { get; set; }
    }
}