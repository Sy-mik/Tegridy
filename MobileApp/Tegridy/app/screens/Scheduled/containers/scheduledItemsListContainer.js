import React, { useState, useEffect } from "react";

import { useSelector, useDispatch } from "react-redux";
import ScheduledItemsListComponent from "../components/ScheduledItemsListComponent";
import { pushScheduledFromRules } from "../../../store/actions";

export default function ScheduledItemsListContainer({ openModal }) {
  const dataReducer = useSelector((state) => state.scheduledDataReducer);
  const { data } = dataReducer;
  const dispatch = useDispatch();
  const [monthOfTheAction, setMonthOfTheAction] = useState("");
  const [dayOfTheAction, setDayOfTheAction] = useState("");
  const [listIndex, setListIndex] = useState(0);
  const [isAddingNewDataToScheduled, setIsAddingNewDataToScheduled] = useState(
    false
  );

  let weekday = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  useEffect(() => {
    calculateDayOfTheAction();
    setIsAddingNewDataToScheduled(false);
  }, [dataReducer]);

  function calculateDayOfTheAction() {
    let item = data[listIndex];
    if (!item) {
      return;
    }
    let date = new Date(item.scheduledDate);
    setDayOfTheAction(
      weekday[date.getDay()] + " " + parseNumber(date.getDate().toString())
    );
    const month = date.toLocaleString("default", { month: "long" });
    setMonthOfTheAction(month);
  }

  function onScrollScheduledItems(e) {
    let offset = e.nativeEvent.contentOffset.x;
    let index = parseInt(offset / 190); // cell height

    if (!isAddingNewDataToScheduled && data.length - index < 3) {
      setIsAddingNewDataToScheduled(true);

      if (data) {
        let lastItem = data[data.length - 1];
        dispatch(pushScheduledFromRules(lastItem.scheduledDate));
      }
    }
    setListIndex(index);
    calculateDayOfTheAction();
  }

  function parseNumber(number) {
    number = new Number(number);
    if (number > 3 && number < 21) {
      return number + "th";
    }
    let date = "";
    let dateNumber = number % 10;
    if (dateNumber == 1) {
      date = number + "st";
    } else if (dateNumber == 2) {
      date += number + "nd";
    } else if (dateNumber == 3) {
      date = number + "rd";
    } else {
      date = number + "th";
    }

    return date;
  }

  return (
    <ScheduledItemsListComponent
      monthOfTheAction={monthOfTheAction}
      dayOfTheAction={dayOfTheAction}
      onScrollScheduledItems={onScrollScheduledItems}
      data={data}
      openModal={openModal} //
    ></ScheduledItemsListComponent>
  );
}
