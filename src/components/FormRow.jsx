import React from "react";

const FormRow = ({ name, type, value, onChangeFunc }) => {
  return (
    <div className="">
      <label htmlFor="name" className="block text-left py-4 text-white text-lg">
        {name}
      </label>
      <input
        type={type}
        value={value}
        name={name}
        onChange={onChangeFunc}
        className="w-full h-8"
      />
    </div>
  );
};

export default FormRow;
