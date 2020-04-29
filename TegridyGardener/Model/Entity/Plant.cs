using System;
using System.Collections.Generic;

namespace Model
{
    public class Plant
    {
        public Plant()
        {
        }

        public Guid Id { get; set; }

        public string Name { get; set; }

        public PlantInfo PlantInfo { get; set; }

       // private ICollection<ScheduledAction> PlantActions { get; set; }
        
        public string ImageUri { get; set; }
        
        public Rule Rule { get; set; }
    }
}