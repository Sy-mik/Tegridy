using System.Collections.Generic;
using Model;
using Model.Dto;

namespace BusinessLogic
{
    public interface IPlantsGroupService
    {
        IEnumerable<PlantDto> GetUserPlants(int userId);
        void CreateGroup(int userId, string name);
    }
}