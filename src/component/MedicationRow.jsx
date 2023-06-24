import React, { useState } from "react";

const MedicationRow = ({ medication, handleTakenChange }) => {
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  const handleDateChange = (e) => {
    setDate(e.target.value);
  };

  const handleTimeChange = (e) => {
    setTime(e.target.value);
  };

  return (
    <tr className={medication.taken ? "medication-taken" : ""}>
      <td>{medication.medication}</td>
      <td>{medication.dosage}</td>
      <td>{medication.description}</td>
      <td>
        <input type="date" value={date} onChange={handleDateChange} />
      </td>
      <td>
        <input type="time" value={time} onChange={handleTimeChange} />
      </td>
      <td>
        <input
          type="checkbox"
          checked={medication.taken}
          onChange={() => handleTakenChange(medication.id, medication.taken)}
        />
      </td>
      {/* ...the rest of your table cell components... */}
    </tr>
  );
};

export default MedicationRow;
