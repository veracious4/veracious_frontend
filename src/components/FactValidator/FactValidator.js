import React, {Component} from 'react';
import { Container, Row, Col, Image, Form } from 'react-bootstrap';
import { AiOutlineUnorderedList } from 'react-icons/ai';
import { BsGearFill } from 'react-icons/bs';
import { MdOutlineFactCheck } from 'react-icons/md';
import verdictMessage from '../../utils/VerdictMessage';
import './FactValidator.css';

class FactValidator extends Component {

    constructor(props){
        super(props);

        this.state={
            trustScore: 10
        }
    }

    componentDidMount() {
        document.body.style.backgroundColor = "#E0E9EE";
    }

    render(){
        return (
            <div className='container'>
                <div className="row">
                    <div className="col-12">
                        <h3 className="section_heading red_orange_gradient main_heading">Fact Validator</h3>
                    </div>
                </div>
                <div className='row main_content'>
                    <Col xs={11} md={5} className="form_content_div login_form_div">
                        <Form>
                            <Form.Group controlId="formBasicEmail" className="form_field_div">
                                <Form.Label><span className="form__icon"><MdOutlineFactCheck /></span><span className="label__important">*</span> Enter Fact Description</Form.Label>
                                <Form.Control className="mt-4" as="textarea" rows={4} placeholder="Write Here.." />
                            </Form.Group>
                            <div className="form__btn">
                                <button className="large_btn orange_red_gradiend_btn" type="submit" onClick={this.handleSubmit}>
                                    <BsGearFill /> Validate
                                </button>
                            </div>
                        </Form>
                    </Col>
                    <Col xs={11} md={5} className="form_content_div login_form_div">
                        <h2 className="verdict_heading red_orange_gradient">Final Verdict</h2>
                        <h5 className="verdict_description">{verdictMessage(this.state.trustScore)}</h5>
                        <h2 className="verdict_heading red_orange_gradient">Trust Score</h2>
                        <h3 className="verdict_description">{this.state.trustScore+"%"}</h3>
                    </Col>
                </div>
            </div>
        );
    }
}

export default FactValidator;