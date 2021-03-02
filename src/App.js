import React from "react";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";

class better extends React.Component {
  state = {
    gender: [
      { label: "Male (M)", value: "male" },
      { label: "Female (F)", value: "female" },
    ],
    nationality: [
      { label: "Australia(AU)", value: "Australia" },
      { label: "Brazil(BR)", value: "Brazil" },
      { label: "Canada(CA)", value: "Canada" },
      { label: "France(FR)", value: "France" },
      { label: "Great Britain(GB)", value: "Great Britain" },
      { label: "USA(US)", value: "USA" },
    ],
    NoOfResults: [
      { label: "10", value: "10" },
      { label: "20", value: "20" },
      { label: "50", value: "50" },
      { label: "100", value: "100" },
    ],
    selectedGender: "",
    selectedNation: "",
    selectedNumber: "",
    data: { results: [] }
  };

  handleSelectGender = (e) => {
    console.log(e.value);
    this.setState({ selectedGender: e.value });
  };

  handleSelectNation = (e) => {
    console.log(e.value);
    this.setState({ selectedNation: e.value });
  };
  handleSelectNumber = (e) => {
    console.log(e.value);
    this.setState({ selectedNumber: e.value });
  };

  async componentDidMount() {
    // console.log(this.state.data);
    await fetch("https://randomuser.me/api/?results=1000")
      .then((res) => res.json())
      .then((data) => this.setState({ data: data }));
    //console.log(this.state.data.results);
  }
  render() {
    const selectedGender = this.state.selectedGender;
    const selectedNation = this.state.selectedNation;
    const filterData = this.state.data.results.filter(function (ele) {
      // console.log(selectedGender, selectedNation);
      if (
        (ele.gender === selectedGender) &
        (ele.location.country === selectedNation)
      ) {
        console.log(ele);
        // console.log(this.state.selectedNation);
        return ele;
      }
    });
    const renderingData = filterData.map(function (ele) {
      return (
        <li>
          {ele.name.title}. {ele.name.first} {ele.name.last} {ele.gender}{" "}
          {ele.location.country} {ele.email} {ele.phone}{" "}
          <img src={ele.picture.thumbnail} alt="" />
        </li>
      );
    });
    return (
      <>
        <p>Better Place</p>

        <Dropdown
          options={this.state.gender}
          value={this.state.selectedGender}
          onChange={this.handleSelectGender}
          placeholder="Select a gender"
        />

        <Dropdown
          options={this.state.nationality}
          value={this.state.selectedNation}
          onChange={this.handleSelectNation}
          placeholder="Select a nation"
        />
          <Dropdown
          options={this.state.NoOfResults}
          value={this.state.selectedNumber}
          onChange={this.handleSelectNumber}
          placeholder="Select Number of results"
        />
        {renderingData}

        <button>Next</button>
        <button>Previous</button>
      </>
      
    );
  }
}

export default better;
