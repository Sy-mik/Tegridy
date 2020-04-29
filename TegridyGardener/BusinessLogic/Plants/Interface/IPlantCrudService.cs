using System;
using Model;
using Model.Dto;

namespace BusinessLogic
{
    public interface IPlantCrudService
    {
        void AddPlant(PlantDto plantDto);
        void AddPlantToGroup(string plantId, int plantGroupId);
        
        void RemovePlant(Guid plantId);

    }
}