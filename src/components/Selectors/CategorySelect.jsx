import React from "react";
import Select, { components } from "react-select";
import { AiOutlineClose } from "react-icons/ai";

const CustomOption = ({
  data,
  innerRef,
  innerProps,
  removeOption,
  ...props
}) => {
  return (
    <components.Option {...props}>
      <div
        ref={innerRef}
        {...innerProps}
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          color: data.color,
        }}
      >
        <span>{data.label}</span>
        {data.value !== "addNewOption" && (
          <button className="option-delete">
            <AiOutlineClose
              className="option-delete"
              onClick={(e) => {
                e.stopPropagation();
                removeOption(data);
              }}
            />
          </button>
        )}
      </div>
    </components.Option>
  );
};

const CategorySelect = ({ onChange, loadOptions, removeOption, value }) => {
  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      backgroundColor: "transparent",
      border: 0,
      boxShadow: "none",
      width: "180px",
    }),

    indicatorSeparator: (provided) => ({
      ...provided,
      display: "none",
    }),
    dropdownIndicator: (provided) => ({
      ...provided,
      color: "#777",
    }),
    menu: (provided) => ({
      ...provided,
      backgroundColor: "rgba(128, 128, 128, 0.2)",
      border: "none",
      boxShadow: "none",
    }),
    menuList: (provided) => ({
      ...provided,
      backgroundColor: "transparent",
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor:
        state.isSelected || state.isFocused ? "transparent" : "transparent",
      color: state.isSelected ? "#9F3ED5	" : "white",
      "&:hover": {
        color: "#874475",
      },
      "&:active": {
        backgroundColor: "transparent",
        color: "#80366c"
      },
      "&:focus": {
        backgroundColor: "transparent",
      },
    }),
  };

  return (
    <Select
      options={loadOptions}
      placeholder="Categories"
      styles={customStyles}
      onChange={onChange}
      components={{
        Option: (props) => (
          <CustomOption {...props} removeOption={removeOption} />
        ),
      }}
      isSearchable={false}
      value={value}
    />
  );
};

export default CategorySelect;
