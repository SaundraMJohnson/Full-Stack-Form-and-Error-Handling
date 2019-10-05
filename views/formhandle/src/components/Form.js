import React from "react";

class Form extends React.Component {
  constructor() {
    super();
    this.state = {
      firstName: "",
      lastName: "",
      email: "",
      occupation: "",
      city: "",
      bio: ""
    };
  }

  handleSubmit = event => {
    event.preventDefault();
    fetch("http://localhost:3000/api/form", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        email: this.state.email,
        occupation: this.state.occupation,
        city: this.state.city,
        bio: this.state.bio
      })
    })
      .then(res => res.json())
      .then(data => console.log(data))
  };

  handleChange = event => {
    var { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  render() {
    return (
      <>
        <form className="userForm" onSubmit={this.handleSubmit}>
          <h2>Fill in the form below</h2>
          <input
            onChange={this.handleChange}
            name="firstName"
            type="text"
            placeholder="FirstName"
            value={this.state.firstName}
          />
          <input
            onChange={this.handleChange}
            name="lastName"
            type="text"
            placeholder="LastName"
            value={this.state.lastName}
          />
          <input
            onChange={this.handleChange}
            name="email"
            type="email"
            placeholder="Enter Your Email"
            value={this.state.email}
          />
          <input
            onChange={this.handleChange}
            name="occupation"
            type="text"
            placeholder="Occupation"
            value={this.state.occupation}
          />
          <input
            onChange={this.handleChange}
            name="city"
            type="text"
            placeholder="City"
            value={this.state.city}
          />
          <input
            onChange={this.handleChange}
            name="bio"
            type="text"
            placeholder="Short bio about you..."
            value={this.state.bio}
          />
          <input
            style={{
              cursor: "pointer",
              width: "150px",
              color: "#fff",
              background: "lightblue",
              border: "none"
            }}
            type="submit"
            value="Submit"
          />
        </form>
      </>
    );
  }
}

export default Form;
