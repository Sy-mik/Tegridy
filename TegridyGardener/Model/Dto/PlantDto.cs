using System.Collections.Generic;

namespace Model.Dto
{
    public class PlantDto
    {
        public string Name { get; set; }

        public string FilePath { get; set; }

        public int PlantInfoId { get; set; }

        public int WateringInMililiters { get; set; }

        public int WateringHour { get; set; }            
      
        public int WateringMinute { get; set; }            

        public int UserId { get; set; }

        public int GroupId { get; set; }
        
       // public IEnumerable<> ScheduledActions { get; set; }
    }
}