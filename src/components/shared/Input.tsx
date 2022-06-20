import React, {ChangeEvent, Dispatch, SetStateAction} from 'react';
import './input.css';

/**
 * Interface defining props for Input
 */
interface InputProps {
  type?: string;
  label: string;
  onChange: Dispatch<SetStateAction<any>>;
  value: any;
}

/**
 * Definition of an Input component
 *
 * @param {string} type
 * @param {string} label
 * @param {any} value
 * @param {Function} onChange
 * @param {Array} props
 * @constructor
 */
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