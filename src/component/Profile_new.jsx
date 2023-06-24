import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AddMedicationForm from "./AddMedicationForm.jsx";
import EditMedicationForm from "./EditMedicationForm.jsx";
import DeleteMedication from "./DeleteMedication.jsx";
import {
  fetchProfileData,
  addMedication,
  updateMedication,
  deleteMedication,
} from "../services/apiConfig.js";
import Swal from "sweetalert2";

function Profile() {
  const [profileData, setProfileData] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const token = localStorage.getItem("token");
  const [selectedMedication, setSelectedMedication] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const [addMedicationFormVisible, setAddMedicationFormVisible] =
    useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    console.log("Fetching profile data...");

    fetchProfileData(token)
      .then((data) => {
        console.log("Profile data received:", data);
        setProfileData(data);
        setIsLoggedIn(true);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, [navigate, setProfileData, setIsLoggedIn, token]);

  useEffect(() => {
    if (!token) {
      localStorage.setItem("token", token);
    }
  }, [token]);
  const handleModificationButton =()=>{
    addMedicationFormVisible ===true ? setAddMedicationFormVisible(false) : setAddMedicationFormVisible(true) ;
  }
  const closeEditBox=(etat)=>{
    console.log("ok")

setEditMode(etat);

   }
  const handleAddMedication = (medicationData) => {
    let userId = null;
    if (profileData && profileData.user && profileData.user.id) {
      userId = profileData.user.id;
    }

    const data = {
      ...medicationData,
      user: userId,
    };
    addMedication(token, data)
      .then((responseData) => {
        setProfileData((prevData) => [...prevData, responseData]);
        Swal.fire('Success!', '', 'success');
        setAddMedicationFormVisible(false); // Hide the add medication form after submission
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const handleTakenChange = (medicationId, taken) => {
    const updatedProfileData = profileData.map((medication) => {
      if (medication.id === medicationId) {
        return { ...medication, taken: !taken };
      }
      return medication;
    });

    setProfileData(updatedProfileData);

    updateMedication(token, medicationId, { taken: !taken })
      .then((data) => {
        setProfileData(updatedProfileData);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const handleEditMedication = (medicationId, updatedMedication) => {
    const updatedProfileData = profileData.map((medication) => {
      if (medication.id === medicationId) {
        return { ...medication, ...updatedMedication };
      }
      return medication;
    });

    setProfileData(updatedProfileData);

    updateMedication(token, medicationId, updatedMedication)
      .then((data) => {
        setProfileData(updatedProfileData);
        setUpdateSuccess(true);
        setTimeout(() => {
          setEditMode(false);
          setUpdateSuccess(false);
        }, 2000);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const handleEditButtonClick = (medication , etat) => {
   if(medication) setSelectedMedication(medication);
    setEditMode(etat);
  };

  const handleDeleteMedication = (medicationId) => {
    Swal.fire({
      title: 'Are you sure?',
      showCancelButton: true,
      confirmButtonText: 'yes',
    
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
  
        deleteMedication(token, medicationId)
        .then(() => {
          const updatedProfileData = profileData.filter(
            (medication) => medication.id !== medicationId
          );
          setProfileData(updatedProfileData);
          Swal.fire('Success!', '', 'success');
        })
        .catch((error) => {
          Swal.fire(`${error}`, '', 'error');
        });
      } 
    })

  };
 
    return (
        <div>

<div className="container">
<h1 className="mt-5 text-center"><b>Profile</b></h1>

<div className="row mt-5 mb-5">

<div className="col-lg-4 mt-5">

<div className="card" style={{border:'hidden'}} >
<img src="images/client_.png"  className="img-fluid"/>

  <div className="card-body text-center">
   { profileData &&  <h5 className="card-title"> {profileData[0]?.username}</h5>}
    <p className="card-text">Adresse_Mail / oTher info.</p>
  
  </div>
</div>
</div>

<div className="col-lg-8  mt-5">
{addMedicationFormVisible && (
          <AddMedicationForm onAddMedication={handleAddMedication} />
        )}
       {editMode && selectedMedication && (
          <>
            <EditMedicationForm
              medicationId={selectedMedication.id}
              medicationData={selectedMedication}
              onEditMedication={handleEditMedication}
              closeEditBox={closeEditBox}
            />

            {updateSuccess && (
              <p className="update-success-message">
                Medication updated successfully!
              </p>
            )}
          </>
        )}
<div className="">
        {profileData ? (
          <div className="profile-data">
        
            <button
              className="addMedication largeButton btn btn-outline-primary"
              onClick={() => handleModificationButton()}
            >
             {addMedicationFormVisible ? <span> <svg xmlns="http://www.w3.org/2000/svg" width="25" height="30" fill="currentColor" className="bi bi-x" viewBox="0 0 16 16">
  <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
</svg> </span> : <span> Add Medication</span> } 
            </button>
            {Array.isArray(profileData) && profileData.length > 0 ? (
              <div className="table-responsive">
              <table className="table table-striped">
              <thead className="thead-dark">
                <tr>
                <th>Medication</th>
                    <th>Dosage</th>
                    <th>Description</th>
                    <th>Taken</th>
                    <th>Edit Medication</th>
                    <th>Delete Medication</th>
                </tr>
              </thead>

                <tbody>
                  {profileData.map((medication) => (
                    <tr
                      key={medication.id}
                   
                    >
                      <td>{medication.medication}</td>
                      <td>{medication.dosage}</td>
                      <td>{medication.description}</td>
                      <td>
                        <input
                          type="checkbox"
                          checked={medication.taken}
                          onChange={() =>
                            handleTakenChange(medication.id, medication.taken)
                          }
                          style={{marginLeft:'15px'}}
                        />
                      </td>
                      <td>
                        <button className="btn btn-outline-info"    style={{marginLeft:'25px'}}
                          onClick={() => handleEditButtonClick(medication , true)}
                        >
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pen" viewBox="0 0 16 16">
  <path d="m13.498.795.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001zm-.644.766a.5.5 0 0 0-.707 0L1.95 11.756l-.764 3.057 3.057-.764L14.44 3.854a.5.5 0 0 0 0-.708l-1.585-1.585z"/>
</svg>
                        </button>
                      </td>
                      <td  >
                        <DeleteMedication   
                          medicationId={medication.id}
                          onDeleteMedication={handleDeleteMedication}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
                </table>
         </div>
            ) : (
              <p>No medication data available.</p>
            )}
          </div>
        ) : (
          <p>Loading profile data...</p>
        )}
   
 
      </div>

</div>






</div>
</div>

<section className="info_section layout_padding2">
<div className="container">
  <div className="row">
    <div className="col-md-3">
      <div className="info_contact">
        <h4>
          Contact
        </h4>
        <div className="box">
          <div className="img-box">
            <img src="images/telephone-symbol-button.png" alt=""/>
          </div>
          <div className="detail-box">
            <h6>
            +216 71 485 254
            </h6>
          </div>
        </div>
        <div className="box">
          <div className="img-box">
            <img src="images/email.png" alt=""/>
          </div>
          <div className="detail-box">
            <h6>
              pill_pal@gmail
            </h6>
          </div>
        </div>
      </div>
    </div>
    <div className="col-md-3">
      <div className="info_menu">
        <h4>
          Menu
        </h4>
        <ul className="navbar-nav  ">
          <li className="nav-item active">
            <a className="nav-link" href="/">Home <span className="sr-only">(current)</span></a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/about-us"> About </a>
          </li>
        
        </ul>
      </div>
    </div>
    <div className="col-md-6">
      <div className="info_news">
        <h4>
          newsletter
        </h4>
        <form action="">
          <input type="text" placeholder="Enter Your email"/>
          <div className="d-flex justify-content-center justify-content-md-end mt-3">
            <button>
              Subscribe
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</div>
</section>

</div>

    );

}

export default Profile;
