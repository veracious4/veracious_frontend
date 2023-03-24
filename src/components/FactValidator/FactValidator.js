import React, {Component} from 'react';
import { connect } from 'react-redux';
import { factValidator, factValidatorAsync } from '../../actions';
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
            factDescription: '',
            errors: {
                factDescription: ''
            }
        }
    }

    componentDidMount() {
        document.body.style.backgroundColor = "#E0E9EE";
    }

    handleInputChange = (event) => {
        const target = event.target;
        const name = target.name;
        this.setState({
            [name]: event.target.value
        });
    }

    validateForm = (data) => {
        const { factDescription } = data;
        let factDescriptionError = "", error = false;

        if (!factDescription || !factDescription.trim()) {
            factDescriptionError = "Enter fact description";
            error = true;
        }

        this.setState(prevState => ({
            errors: {
                factDescription: factDescriptionError
            }
        }))

        return !error;
    }

    handleSubmit = async (event) => {
        event.preventDefault();
        const isValid = this.validateForm(this.state);

        if(isValid){
            await this.props.factValidatorAsync(this.state.factDescription)
            // await this.props.factValidator(this.state.factDescription)

        }
    }

    render(){

        var verMess = "", verScore = "", processing = "Validate";
        if(this.props.factValidateData.isLoading){
            verMess = "Getting the verdict....";
            verScore = "Getting the score....";
            processing = "Running Validator";
        }
        else if(this.props.factValidateData.error){
            verMess = "Server Error Couldn't get the verdict";
            verScore = "Server Error Couldn't get the score";
            processing = "Validate";
        }
        else if(this.props.factValidateData.message){
            const trustScore = (this.props.factValidateData.message.trust_score * 100).toFixed(2);
            verMess = verdictMessage(trustScore);
            verScore = trustScore + "%";
            processing = "Validate";
        }
        else {
            verMess = "The verdict message will appear here..";
            verScore = "The trust score will appear here..";
            processing = "Validate";
        }

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
                                <Form.Control className="mt-4" as="textarea" rows={4} placeholder="Write Here.." name="factDescription" onChange={this.handleInputChange}/>
                                <div className="invalid__feedback">{this.state.errors.factDescription}</div>
                            </Form.Group>
                            <div className="form__btn">
                                <button className="large_btn orange_red_gradiend_btn" type="submit" onClick={this.handleSubmit}>
                                    <BsGearFill /> { processing }
                                </button>
                            </div>
                        </Form>
                    </Col>
                    <Col xs={11} md={5} className="form_content_div login_form_div">
                        <h2 className="verdict_heading red_orange_gradient">Final Verdict</h2>
                        <h5 className="verdict_description">{verMess}</h5>
                        <h2 className="verdict_heading red_orange_gradient">Trust Score</h2>
                        <h3 className="verdict_description">{verScore}</h3>
                    </Col>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps)=>{
    return({
        ...ownProps,
        factValidateData: state.factValidateData
    })

}

export default connect(mapStateToProps, {factValidator, factValidatorAsync})(FactValidator);