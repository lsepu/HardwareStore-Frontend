import React from "react";

interface IAlert {
  message: string;
}

const Alert: React.FC<IAlert> = ({ message }) => {
  return (
    <nav>
      <div className="nav-wrapper red">
        <p style={{marginTop: "0px", paddingLeft: "15px", fontSize:"18px"}}><span style={{fontWeight:"700"}}>Alert:</span> {message}</p>
      </div>
    </nav>
  );
};

export default Alert;
