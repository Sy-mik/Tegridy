using System;

namespace Model
{
    public class Rule
    {
        public int Id { get; set; }
        public int WaterInMilliliters { get; set; }
        public Days Days { get; set; }
        
    }

    [Flags]
    public enum Days
    {
        NONE= 0,
        SUNDAY = 1,
        MONDAY= 2,
        TUESDAY= 4,
        WEDNESDAY= 8,
        THURSDAY = 16,
        FRIDAY = 32,
        SATURDAY = 64,
    }
    
}