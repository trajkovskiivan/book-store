import React from "react";

const Input = ({
  name,
  placeholder,
  value,
  onChange,
  error,
  disabled,
  inputRef,
  label,
  validationMessage,
}) => {
  const onChangeVal = (event) => {
    const target = event.target;
    const { name, value } = target;
    onChange({ name, value });
  };
  return (
    <div className="input-wrapper">
      {label && <p>{label}</p>}
      <input
        name={name}
        className={`input-component`}
        placeholder={placeholder}
        value={value}
        onChange={onChangeVal}
        disabled={disabled ? disabled : false}
        ref={inputRef}
        type={name === "password" ? "password" : "text"}
        // type={eyeState === eyes[0] ? "password" : "text"}
        autoComplete={name === "password" ? "off" : "on"}
      />
      {validationMessage && (
        <p className="paragraph__red">{validationMessage}</p>
      )}
    </div>
  );
};

export default Input;
