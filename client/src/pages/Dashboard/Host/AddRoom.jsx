import React, { useState } from "react";
import AddRoomForm from "../../../components/Form/AddRoomRorm";

function AddRoom() {
  const [dates, setDates] = useState({
    startDate: new Date(),
    endDate: null,
    key: "selection",
  });

  const dateHandler = (item) => {
    console.log(item);
    setDates(item.selection);
  };
  return (
    <div>
      {/* add room  */}
      <AddRoomForm dates={dates} dateHandler={dateHandler} />
    </div>
  );
}

export default AddRoom;
