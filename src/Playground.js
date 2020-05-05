import {
  Button,
  ButtonDropdown,
  Form,
  ButtonGroup,
  DropdownItem,
  Input,
  DropdownMenu,
  DropdownToggle,
  Container,
  Row,
  Col,
} from "react-bootstrap";
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';

import React, { NumericInput } from "react";
import "./Playground.css";
import drumKitIcon from './drum-set.png'; // Tell webpack this JS file uses this image
import { Slider, MuiThemeProvider } from "material-ui";
import { Select } from "@material-ui/core";

class Playground extends React.Component {
  constructor(props) {
    super(props);
    // Don't call this.setState() here!
    this.state = {};
  }
  render() {
    return (
      <div>
        <MuiThemeProvider>
        <Container className="playgroundContainer" fluid={true}>
          <Row className="drumTrack">
            <Col xs={1} className="trackMixer">
              <img src={drumKitIcon} alt="Logo" height="40" width="40"/>
            </Col>
            <Col>
              <ArrowDropDownIcon></ArrowDropDownIcon>
            </Col>
            <Col xs={true} md={1}>
              <Slider defaultValue={.5}></Slider>
            </Col>
            <Col xs="auto" className="trackLoops">
              <Button variant="outline-primary">NEW LOOP</Button>
            </Col>
          </Row>
          <Row className="drumTrack">
            <Col xs={2} className="trackMixer">
              <img src={drumKitIcon} alt="Logo" height="40" width="40"/>
            </Col>
            <Col xs="auto" className="trackLoops">
              <Button variant="outline-primary">NEW LOOP</Button>
            </Col>
          </Row>
        </Container>
        </MuiThemeProvider>
      </div>
    );
  }
}

export default Playground;
