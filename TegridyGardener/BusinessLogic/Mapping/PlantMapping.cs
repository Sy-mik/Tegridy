using Model;
using Model.Dto;

namespace BusinessLogic.Mapping
{
    public static class PlantMapping
    {
        public static PlantDto ToDto(this Plant plant)
        {
            return new PlantDto()
            {
                Id = plant.Id,
                Name = plant.Name,
                Rule = new PlantRuleDto()
                {
                    Days = plant.Rule.Days,
                    Id = plant.Rule.Id
                },
                ImageName = plant.ImageName,
                ImageUri = plant.ImageUri,
                WateringInMililiters = plant.Rule.WaterInMilliliters,
                PlantInfoId = plant.PlantInfo?.Id
            };
        }
    }
}