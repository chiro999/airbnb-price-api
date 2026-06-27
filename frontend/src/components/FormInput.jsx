function FormInput({
    label,
    name,
    value,
    onChange,
    type = "text"
}) {

    return (

        <div className="input-group">

            <label>{label}</label>

            <input
                type={type}
                name={name}
                value={value}
                onChange={onChange}
            />

        </div>

    );

}

export default FormInput;