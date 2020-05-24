using System;
using Model;
using Model.Dto;

namespace BusinessLogic.Mapping
{
    public static class AuditMapping
    {
        public static PlantsActionDto ToDto(this ScheduledAction action)
        {
            var imageUri = action.Plant?.ImageUri;

            if (string.IsNullOrEmpty(imageUri) && action.Plant.PlantInfo != null)
            {
                imageUri = action.Plant?.PlantInfo?.ImageUri;
            }

            PlantsActionDto dto = new PlantsActionDto()
            {
                Recommendations = action.Recommendation,
                Id = action.Id,
                Name = action.Plant.Name,
                ImageUri = imageUri,
                ImageName = action.Plant.ImageName,
                PlantId = action.Plant.Id,
                ScheduledDate = action.ScheduledDate,
                AmountOfWaterMilliliters = action.AmountOfWaterMilliliters,
                ExecutionDate = action.ExecutionDate
            };

            return dto;
        }

        public static ScheduledAction ToEntity(this PlantsActionDto dto)
        {
            ScheduledAction action = new ScheduledAction()
            {
                PlantId = dto.PlantId,
                ScheduledDate = dto.ScheduledDate,
                AmountOfWaterMilliliters = dto.AmountOfWaterMilliliters,
            };

            return action;
        }
    }
}