function SelectInput({
    label,
    name,
    value,
    options,
    onChange
}) {

    return (

        <div className="input-group">

            <label>{label}</label>

            <select
                name={name}
                value={value}
                onChange={onChange}
            >

                {options.map(option => (

                    <option
                        key={option}
                        value={option}
                    >
                        {option}
                    </option>

                ))}

            </select>

        </div>

    );

}

export default SelectInput;