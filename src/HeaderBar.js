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
} from "reactstrap";
import React, {NumericInput} from "react";
import "./HeaderBar.css";

class HeaderBar extends React.Component {
  constructor(props) {
    super(props);
    // Don't call this.setState() here!
    this.state = {
      currKey: undefined,
      musicalKeys: [
        "A",
        "A#",
        "B",
        "C",
        "C#",
        "D",
        "D#",
        "E",
        "F",
        "F#",
        "G",
        "G#",
      ],
      dropdownOpen: false,
      minor: false,
      tempo: 120,
      tempoForm: false,
    };
    this.ToggleButton = this.ToggleButton.bind(this);
    this.MinorClick = this.MinorClick.bind(this);
    this.ToggleTempoField = this.ToggleTempoField.bind(this);
    this.ChangeTempo = this.ChangeTempo.bind(this);
  }

  ToggleButton() {
    this.setState((currentState) => ({
      dropdownOpen: !currentState.dropdownOpen,
    }));
  }

  ToggleTempoField() {
    this.setState((currentState) => ({
      tempoForm: !currentState.tempoForm,
    }));
  }

  MinorClick() {
    console.log(this.state.minor);
    this.setState((currentState) => ({
      minor: !currentState.minor,
    }));
  }

  KeyClick(keyVal) {
    console.log();
    this.setState(() => ({
      currKey: keyVal,
    }));
  }

  ChangeTempo(event) {
    this.setState({
      tempo: event.target.value,
    });
    console.log(this.state.tempo);
  }

  render() {
    return (
      <div>
        <Container fluid className="HeaderBar">
          <Row>
            <Col>
              TEMPO 
              {/* TEMPO BUTTON */}
              {this.state.tempoForm ? (
              <NumericInput precision={2} value={this.state.tempo} step={0.1} format={(x) => x + ' bpm'}/>
              ) : (
                <Button onClick={this.ToggleTempoField}>
                  {this.state.tempo} bpm
                </Button>
              )}
            </Col>
            {/* KEY BUTTON */}
            <Col>
              <ButtonGroup>
                <ButtonDropdown
                  isOpen={this.state.dropdownOpen}
                  toggle={this.ToggleButton}
                >
                  <DropdownToggle>
                    {this.state.currKey ? this.state.currKey : "Key"}
                  </DropdownToggle>

                  <DropdownMenu>
                    {this.state.musicalKeys.map((item, key) => (
                      <DropdownItem
                        key={key}
                        className={item}
                        onClick={this.KeyClick.bind(this, item)}
                      >
                        {item}
                      </DropdownItem>
                    ))}
                  </DropdownMenu>
                </ButtonDropdown>

                {this.state.currKey ? (
                  <Button
                    className="minorButton"
                    outline={!this.state.minor}
                    onClick={this.MinorClick}
                  >
                    {" "}
                    m{" "}
                  </Button>
                ) : undefined}
              </ButtonGroup>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default HeaderBar;
