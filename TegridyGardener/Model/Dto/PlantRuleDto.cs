using System;

namespace Model.Dto
{
    public class PlantRuleDto
    {
        public int Id { get; set; }
        
        public Guid PlantId { get; set; }
        
        public int UserId { get; set; }
        
        public string Name { get; set; }
        
        public  Days Days { get; set; }
    }
}