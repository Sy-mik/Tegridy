using System.Collections.Generic;
using Model.Dto;

namespace BusinessLogic
{
    public interface IPlantsRulesService
    {
        IEnumerable<PlantRuleDto> GetUserRules(int userId);
    }
}