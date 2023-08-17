const InputTag = ({ tag_id, label, type, value, handleOnChange }) => {
  return (
    <div className="form-group">
      <label htmlFor="">{label}</label>
      <input
        className="form-control mb-3 mt-1"
        type={type}
        id={tag_id}
        value={value}
        onChange={handleOnChange}
        required
      />
    </div>
  );
};

export default InputTag;
