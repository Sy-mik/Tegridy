import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { ScheduledItemsFactory } from "../../../services/ScheduleItemFactory";
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
    if(data){
      for(let i=0;i<data.length;i++)
    {
      let element = data[i];
      let binaryDay = Math.pow(2, new Date(scheduledDate).getDay());
      if(!element.rule){
        continue;
      }
      if (IsFlagSet(element.rule.days, binaryDay)) {
        console.log('PUSHING');
        console.log(element);
        let item = itemFactory.CreateNewScheduledItem(element, scheduledDate);
        newItems.push(item);
      }
    }
    setItems(newItems);
    console.log("new ITEMS");
    console.log(items);
    }
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
