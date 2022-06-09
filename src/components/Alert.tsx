import React from "react";

interface IAlert{
  message: string;
}

const Alert: React.FC<IAlert> = ({ message }) => {
  return <div>{message}</div>;
};

export default Alert;
