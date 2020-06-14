import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import CalendarActionComponent from "../components/calendarActionComponent";
import FetchPlants from "../../../store/FetchPlants";
import { useModalState } from "../../../hooks/useModalState";
import { ScheduledItemsFactory } from "../../../services/ScheduleItemFactory";
import PlantListComponent from "../../plant/PlantListComponent";
import { View } from "react-native";
import ScheduleActionModalContainer from "./ScheduledActionModalContainer";
export default function CalendarActionContainer({
  isOpen,
  onDismiss,
  scheduledDate,
}) {
  const dispatch = useDispatch();
  const dataReducer = useSelector((state) => state.userPlantsReducer);
  const { data } = dataReducer;
  const [items, setItems] = React.useState([]);
  const itemFactory = new ScheduledItemsFactory();

  useEffect(() => {
    let newItems = [];
    if (data.length == 0) {
      FetchPlants(dispatch);
    }

    data.forEach((element) => {
      let binaryDay = Math.pow(2, new Date(scheduledDate).getDay());

      if (IsFlagSet(element.rule.days, binaryDay)) {
        let item = itemFactory.CreateNewScheduledItem(element, scheduledDate);
        newItems.push(item);
      }
    });
    setItems(newItems);
  }, [isOpen]); //

  function IsFlagSet(value, flag) {
    return (value & flag) != 0;
  }

  return (
    <ScheduleActionModalContainer
      isOpen={isOpen}
      onDismiss={onDismiss}
      scheduledDate={scheduledDate}
      schedeuledItems={items}
      data={data}
    ></ScheduleActionModalContainer>
  );
}
