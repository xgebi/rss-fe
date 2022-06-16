import React from 'react';
import './error.css';
import ErrorTypes from "../../types/ErrorTypes";


interface ErrorProps {
  type: ErrorTypes;
  message: string;
}

export const Error = ({
  type = ErrorTypes.INFO,
  message,
  ...props
                      }: ErrorProps) => {

  return (
    <div className={`error-message ${type}`}>
      { message }
    </div>
  )
}