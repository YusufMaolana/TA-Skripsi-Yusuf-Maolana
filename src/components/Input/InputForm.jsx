import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useState } from "react";

function InputForm({ props }) {
  const [inputType, setInputType] = useState("password");

  const inputTextType = () => {
    if (inputType == "password") {
      setInputType("text");
    } else {
      setInputType("password");
    }
  };
  return (
    <div className="mb-3">
      <label
        htmlFor={props.name}
        className="form-label font-primary fw-bold text-dark-blue"
      >
        {props.label}
      </label>
      {props.name == "password" || props.name == "confirm_password" ? (
        <div className="input-group">
          <input
            type={inputType}
            className="form-control border-end-0"
            id={props.name}
            name={props.name}
            placeholder={props.placeholder}
            onChange={props.onChange}
            disabled={props.disabled}
            value={props.value}
            required
          />
          <span
            className="input-group-text bg-transparent fs-4 pe-3"
            onClick={() => inputTextType()}
          >
            {inputType == "password" ? (
              <AiOutlineEye />
            ) : (
              <AiOutlineEyeInvisible />
            )}
          </span>
        </div>
      ) : (
        <input
          type={props.type}
          className="form-control"
          id={props.name}
          name={props.name}
          placeholder={props.placeholder}
          onChange={props.onChange}
          disabled={props.disabled}
          value={props.value}
          required
        />
      )}
      <div className="form-text text-danger">
        {props.errMsg ? props.errMsg : " "}
      </div>
    </div>
  );
}

export default InputForm;
