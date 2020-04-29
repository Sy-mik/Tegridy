using System;
using System.Collections.Generic;
using Model;
using Model.Dto;

namespace BusinessLogic
{
    public interface IPlantScheduledActionService
    {
        void AddPlantsAction(User user, PlantsActionDto plantsActionDto);

        PlantsActionDto GetSuggestedActionForPlant(Guid plantId);
        
        IEnumerable<PlantsActionDto> GetScheduledForUser(int userId);

        void Invoke(int auditId);

        void Remove(int auditId);
    }
}