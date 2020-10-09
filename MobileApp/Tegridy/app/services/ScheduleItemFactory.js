export class ScheduledItemsFactory {
  CreateNewScheduledItem(plant, date) {
    let scheduled = new Object();
    scheduled.scheduledDate = new Date(date);
    scheduled.plantId = plant.id;
    scheduled.executionDate = null;
    scheduled.imageUri = plant.imageUri;
    scheduled.imageName = plant.imageName;
    scheduled.amountOfWaterMilliliters = plant.wateringInMililiters;
    scheduled.name = plant.name;

    return scheduled;
  }
}