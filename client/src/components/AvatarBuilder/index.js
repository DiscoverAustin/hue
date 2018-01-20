// File Imports
import React, { Component } from 'react';
import {fabric} from 'fabric';
import FabricCanvas from './FabricCanvas';
import TemplateList from './TemplateList'
import {bglist, facelist, eyeslist, faciallist, hairlist} from '../../../dist/img/templates/templatelist';
import {Col, Tabs, Tab, Jumbotron, Button } from 'react-bootstrap';

class AvatarBuilder extends Component {

  constructor(props){
    super(props);

    this.state = {
       activeProperty : null
    };
  }

  addToCanvas = (imgElement, property_type, z_Index) => {

    var imgInstance = new fabric.Image(imgElement, {
      width: 400,
      height: 400,
      the_type: property_type,
      zIndex : z_Index
    });

    this.setState({activeProperty: imgInstance });

  }

  render() {
    return (
      <div className="App">
        <div className="main">
          <div
            style={{'textAlign': 'center'}}
            >
            <h1> Thanks for joining BetterHue!</h1>
            <h2>Create your personalized BetterHue avatar below</h2>
            <br></br>
          </div>
          <div className="row">

            <Col md={6}>
              <Tabs defaultActiveKey={1} justified id="main_tabs">
                <Tab eventKey={1} title="Faces">

                  <TemplateList
                      data = {facelist}
                      property_type = "face"
                      zIndex = {0}
                      addtocanvas ={this.addToCanvas}
                  />

                </Tab>
                <Tab eventKey={2} title="Eyes">

                  <TemplateList
                    data = {eyeslist}
                    property_type= "eyes"
                    zIndex = {2}
                    addtocanvas ={this.addToCanvas}
                  />

                </Tab>
                <Tab eventKey={3} title="Beard">

                  <TemplateList
                    data = {faciallist}
                    property_type= "beard"
                    zIndex = {2}
                    addtocanvas ={this.addToCanvas}
                  />

                </Tab>
                <Tab eventKey={4} title="Hair">

                  <TemplateList
                    data = {hairlist}
                    property_type= "hair"
                    zIndex = {2}
                    addtocanvas ={this.addToCanvas}
                  />

                </Tab>
                <Tab eventKey={5} title="Background">

                  <TemplateList
                    data = {bglist}
                    property_type= "bg"
                    zIndex = {-9999}
                    addtocanvas ={this.addToCanvas}
                  />

                </Tab>
              </Tabs>
            </Col>

            <Col md={6}>

              <FabricCanvas
                activeProperty = {this.state.activeProperty}
              />

            </Col>

          </div>
        </div>
      </div>
    );
  }
}

export default AvatarBuilder;
