import React from "react";
import { NavLink } from "react-router-dom";
import MedicationRow from "./MedicationRow.jsx";
import { fetchProfileData } from "../services/apiConfig.js"; // Update the import statement

const MedicationTable = ({ profileData, handleTakenChange }) => {
  return (
    <div>
      {/* <NavLink to="/date-time-tab">Date & Time</NavLink> */}
      <table className="profile-table">
        <thead>
          <tr>
            <th>Sunday</th>
            <th>Monday</th>
            <th>Tuesday</th>
            <th>Wednesday</th>
            <th>Thursday</th>
            <th>Friday</th>
            <th>Saturday</th>
            <th>Medication</th>
          </tr>
        </thead>
        <tbody>
          {profileData.map((medication) => (
            <tr key={medication.id}>
              <td>
                <input type="date" />
                <input type="time" />
              </td>
              <td>
                <input type="date" />
                <input type="time" />
              </td>
              <td>
                <input type="date" />
                <input type="time" />
              </td>
              <td>
                <input type="date" />
                <input type="time" />
              </td>
              <td>
                <input type="date" />
                <input type="time" />
              </td>
              <td>
                <input type="date" />
                <input type="time" />
              </td>
              <td>
                <input type="date" />
                <input type="time" />
              </td>
              <td>
                <select>
                  {profileData.map((medication) => (
                    <option key={medication.id} value={medication.medication}>
                      {medication.medication}
                    </option>
                  ))}
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MedicationTable;
