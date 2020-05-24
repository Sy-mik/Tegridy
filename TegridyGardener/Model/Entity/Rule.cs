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
        MONDAY= 1,
        TUESDAY= 2,
        WEDNESDAY= 4,
        THURSDAY = 8,
        FRIDAY = 16,
        SATURDAY = 32,
        SUNDAY = 64
    }
    
}