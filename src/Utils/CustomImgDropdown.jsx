import React, {useState, useEffect} from 'react';
import Select from 'react-select';
import "../Styles/CustomImgDropdown.css";

const CustomImgDropdown = (props) => {
    const [options, setOptions] = useState([]);
    const [selectedOption, setSelectedOption] = useState(null);

    useEffect(()=>{
        setOptions(props?.options?.map(row=> {
            return {
                value: <div className="div-flex"><img className="emp-img-select" src={row.image} alt="Avatar" /><p className="emp-name-select">{row.firstName}{" "}{row.lastName}</p></div>, 
                label: <div className="div-flex"><img className="emp-img-select" src={row.image} alt="Avatar" /><p className="emp-name-select">{row.firstName}{" "}{row.lastName}</p></div>
              }
          }));
    },[]);

    const handleChange = selectedOption => {
        setSelectedOption(selectedOption);
      };
    
    return (
      <Select
        value={selectedOption}
        onChange={handleChange}
        options={options}
      />
    );
  }

export default CustomImgDropdown;