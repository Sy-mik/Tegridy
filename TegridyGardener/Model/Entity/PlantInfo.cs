namespace Model
{
    public class PlantInfo
    {
        public int Id { get; set; }

        public string Name { get; set; }
        public string Description { get; set; }
        
        public string ImageUri { get; set; }
        
        public Rule Rule { get; set; }
    }
}