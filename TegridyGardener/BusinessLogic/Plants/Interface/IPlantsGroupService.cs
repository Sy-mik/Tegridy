using System.Collections.Generic;
using Model;

namespace BusinessLogic
{
    public interface IPlantsGroupService
    {
        IEnumerable<Plant> GetUserPlants(int userId);
        void CreateGroup(int userId, string name);
    }
}