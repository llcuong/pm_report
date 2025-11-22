/** 
 * @typedef {Object} OptionList
 * @property {string} label
 * @property {string} value
 */

/**
 * @param {Object} props
 * @param {string} props.label
 * @param {string} props.name
 * @param {OptionList[]} props.optionList
 */

const SelectOptionCustom = ({ label, name, optionList }) => {
  return (
    <div className="flex gap-4 items-center">
      <label htmlFor={name}>{label}</label>
      <select name={name} id={name}>
        {optionList.map((option, idx) => (
          <option key={idx} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectOptionCustom;