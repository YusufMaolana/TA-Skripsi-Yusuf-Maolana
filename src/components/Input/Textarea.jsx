function Textarea({ props }) {
  return (
    <div className="mb-2">
      <label
        htmlFor={props.name}
        className="form-label font-primary fw-bold text-dark-blue"
      >
        {props.label}
      </label>
      <textarea
        className="form-control"
        name={props.name}
        value={props.value}
        placeholder={props.placeholder}
        onChange={props.onChange}
        style={{ height: "100px" }}
      ></textarea>
    </div>
  );
}

export default Textarea;
