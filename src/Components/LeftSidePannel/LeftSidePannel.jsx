import NotesGroup from "../NotesGroup/NotesGroup";
import StylesLeftSidePannel from "./LeftSidePannel.module.css";
import React, { useState, useEffect, useCallback, useMemo } from "react";

const LeftSidePannel = ({ handleClick,handleUserIdClicked, id, groupName, color, create }) => {
  const [clickedButton, setClickedButton] = useState(null);
  const [selectedGroupID, setSelectedGroupID]= useState(null)
  

  // Getting stored data
  const storedDataString = localStorage.getItem("groupNamesData");
  const storedData = useMemo(()=>JSON.parse(storedDataString) || [storedDataString],[storedDataString]) ;
//   const storedData = useMemo(() => {
//     const data = JSON.parse(storedDataString);
//     return Array.isArray(data) ? data : [];
// }, [storedDataString]);
  // changing id
  // const newId =
  //   storedData.length > 0 ? storedData[storedData.length - 1].id + 1 : 1;

  // Create a new data object
  const newData = useMemo(() => ({
    id: storedData.length > 0 ? storedData[storedData.length - 1].id + 1 : 1,
    groupName: groupName,
    color: color,
    create: create,
  }), [storedData, groupName, color, create]);

  // const newData = {
  //   id: newId,
  //   groupName: groupName,
  //   color: color,
  //   create: create,
  // };
  
  // Append the new data to the existing array


  const submitCheck = useCallback(() => {
    return groupName !== "" && create === true;
  }, [groupName, create]);

  // const submitCheck = () => {

  //   useCallback(() => {
  //     return groupName !== "" && create === true;
  //   }, [groupName, create]);
    // useCallback(()=>{})
    // if (groupName !== "" && create === true) {
    //   return true;
    // } else {
    //   return false;
    // }
  // };

  useEffect(() => {
    if (submitCheck()) {
      storedData.push(newData);
      localStorage.setItem("groupNamesData", JSON.stringify(storedData));
    }
  }, [submitCheck, newData,storedData]);


  const handleButtonClick = (buttonId) => {
    setClickedButton(buttonId);
    setSelectedGroupID(buttonId === selectedGroupID? null:buttonId)
  };

  const buttonStyle = (buttonId) => {
    return {
      backgroundColor: clickedButton === buttonId ? "#2F2F2F2B": "transparent",
      color: "white",
      minWidth: "100%",
      minHeight: "62px",
      // border: "1px solid black",
      display: "flex",
      justifyContent: "flex-start",
      borderRadius: "1rem",
      // width: "31vw",
      // padding: "4% 0.9% 4% 5%",
    };
  };

  return (
    <div className={StylesLeftSidePannel.leftSidePannel}>
      <h1>Pocket Notes</h1>
      <div className={StylesLeftSidePannel.center}>
      <button
          className={StylesLeftSidePannel.createNotesGroup}
          onClick={() => handleClick(true)}
        >
          {" "}
          <img src="assets/+.svg" alt="+" style={{ minWidth: "11px" }} />
        </button>
        <div>
          <br />
          <div
            style={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            {storedData.map((group,index) =>
              group.create ? (
                <div className={StylesLeftSidePannel.notesGroupSlected}>
                  
                  <span
                    className={StylesLeftSidePannel.act}
                    style={buttonStyle(group.id)}
                    onClick={(_) => {
                      handleUserIdClicked(group.id);
                      handleButtonClick(group.id);
                    }}
                  >
                    <NotesGroup
                      key={group.id}
                      groupName={group.groupName}
                      color={group.color}
                      buttonColorId={group.id}
                      isSelected ={group.id === selectedGroupID}
                    />
                  </span>
                </div>
                
              ) : null
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeftSidePannel;
