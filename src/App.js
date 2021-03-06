import React, { Component } from 'react';
import { Navbar, NavItem, Nav, Grid, Row, Col } from "react-bootstrap";
//import "bootstrap/dist/css/bootstrap.css";
import "bootswatch/cosmo/bootstrap.css";
import './App.css';

const PLACES = [
  { name: "Palo Alto", zip: "94303" },
  { name: "San Jose", zip: "94088" },
  { name: "Santa Cruz", zip: "95062" },
  { name: "Honolulu", zip: "96803" }
];

class WeatherDisplay extends Component {

  constructor() {
    super();
    this.state = {
      weatherData: null
    };
  }

  componentDidMount() {
    const zip = this.props.zip;
    const URL = "https://api.openweathermap.org/data/2.5/weather?q=" +
      zip +
      "&appid=b1b35bba8b434a28a0be2a3e1071ae5b&units=imperial";
    fetch(URL).then(res => res.json()).then(json => {
      this.setState({ weatherData: json });
    });
  }

  render() {

    const weatherData = this.state.weatherData;
    if (!weatherData) return <div className="loader"></div>;
    const weather = weatherData.weather[0];
    const iconUrl = "https://openweathermap.org/img/w/" + weather.icon + ".png";

    return (
      <div>
        <h1>
          <span>{weather.main} in {weatherData.name}</span>
          <span><img src={iconUrl} alt={weatherData.name} /></span>
        </h1>
        <p>Current: {weatherData.main.temp}°</p>
        <p>High: {weatherData.main.temp_max}°</p>
        <p>Low: {weatherData.main.temp_min}°</p>
        <p>Wind Speed: {weatherData.wind.speed} mi/hr</p>
      </div>
    );
  }
}

class App extends Component {

  constructor() {
    super();
    this.state = {
      activePlace: 0,
    };
  }

  render() {
    const activePlace = this.state.activePlace;

    return (
      <div className="App">

        <Navbar>
          <Navbar.Header>
            <Navbar.Brand>
              React Simple Weather App
            </Navbar.Brand>
          </Navbar.Header>
        </Navbar>

        <Grid>
          <Row>
            <Col md={4} sm={4}>
              <br />
              <Nav
                bsStyle="pills"
                stacked
                activeKey={activePlace}
                onSelect={index => {
                  this.setState({ activePlace: index });
                }}
              >
                {PLACES.map((place, index) => (
                  <NavItem key={index} eventKey={index}>{place.name}</NavItem>
                ))}
              </Nav>
            </Col>
            <Col md={8} sm={8}>
              <WeatherDisplay
                key={activePlace}
                zip={PLACES[activePlace].zip}
              />
            </Col>
          </Row>
        </Grid>

      </div>
    );
  }
}

export default App;
