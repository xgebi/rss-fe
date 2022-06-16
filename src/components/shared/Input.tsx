import React, {ChangeEvent, Dispatch, SetStateAction} from 'react';
import './input.css';


interface InputProps {
  type: string;
  label: string;
  onChange: Dispatch<SetStateAction<any>>;
  value: any;
}

export const Input = ({
  type = "text",
  label,
  value = "",
  onChange,
  ...props
                      }: InputProps) => {
  const id = `input-${Math.random().toString(16).substring(2, 8)}`;

  function propagateValue(ev: ChangeEvent<HTMLInputElement>) {
    if (onChange) {
      onChange(ev.target.value);
    }
  }

  return (
    <div className={"input"}>
      <label htmlFor={id}>{ label }</label>
      <input type={type} onChange={propagateValue} value={value} />
    </div>
  )
}