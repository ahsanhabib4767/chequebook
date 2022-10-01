import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import AuthService from "../services/auth.service";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";

import CheckPreview from "./cheque-preview";
const required = value => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
      </div>
    );
  }
};
export default class Profile extends Component {
  constructor(props) {
    super(props);
    this.handleSubmission = this.handleSubmission.bind(this);
    this.onChangeName= this.onChangeName.bind(this);
    this.onChangeLocation = this.onChangeLocation.bind(this);
    this.onChangeNumber = this.onChangeNumber.bind(this);
    this.state = {
      chequeId: props.match.params && props.match.params.id || null,
      username:"",
      named: "",
      locations: "",
      number: "",
      successful: false,
      message: "",
      redirect: null,
      userReady: false,
      currentUser: { username: "" },
      preveiw: false,
      spreview:false
    };
  }
  onChangeName(e) {
    this.setState({
      named: e.target.value
    });
  }
  onChangeLocation(e) {
    this.setState({
      location: e.target.value
    });
  }
  onChangeNumber(e) {
    this.setState({
      number: e.target.value
    });
  }
  componentDidMount() {
    console.log("Cheque id: ", this.state.chequeId);
    const currentUser = AuthService.getCurrentUser();

    if (!currentUser) this.setState({ redirect: "/home" });
    this.setState({ currentUser: currentUser, userReady: true });
  }
  handleSubmission(e) {
    e.preventDefault();

    this.setState({
      message: "",
      successful: false
    });

    this.form.validateAll();

    if (this.checkBtn.context._errors.length === 0) {
      AuthService.iniatepayment(
        this.state.named,
         this.state.location,
         this.state.number).then(
        () => {
          console.log("inside submit",this.state.preveiw);
          // this.props.history.push("/profile");
          // window.location.reload();
          this.setState({
            spreview: true
          });
        },
        error => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();

          this.setState({
            loading: false,
            message: resMessage
          });
        }
      );
    } else {
      this.setState({
        loading: false
      });
    }
  }
  closePreview = () => {
    
    this.setState({
    
      spreview: false
    },this.resetForm
    );
  }

  resetForm = () => {
    this.setState({
      named: "",
      locations: "",
      number: "" 
    })
  }

  
  render() {
    // if (this.state.redirect) {
    //   return <Redirect to={this.state.redirect} />
    // }
console.log(this.state.preveiw);
    const { currentUser } = this.state;

    return (
      <div className="container">
        <Form onSubmit={this.handleSubmission} ref={c => {
              this.form = c;
            }}>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <Input
              type="text"
              className="form-control"
              value={this.state.named}
              onChange={this.onChangeName}
              validations={[required]}
              name="name"/>
          </div>
  
          <div className="form-group">
            <label htmlFor="location">Location</label>
            <Input
              type="text"
              className="form-control"
              name="location"
              value={this.state.locations}
              onChange={this.onChangeLocation}
              validations={[required]}
            />
          </div>
  
          <div className="form-group">
            <label htmlFor="number">Number</label>
            <Input
              type="text"
              name="number"
              className="form-control"
              value={this.state.number}
              onChange={this.onChangeNumber}
              validations={[required]}
              
            />
          </div>
         
          <div className="form-group">
            <button className="btn btn-danger btn-block" disabled={this.state.loading}>
              {this.state.loading && (
                <span className="spinner-border spinner-border-sm"></span>
              )}
              <span>Submit</span>
            </button>
          </div>
          <p>
        {/* <strong>Seeed:</strong> {currentUser.access_token} */}
      </p>
          {this.state.message && (
              <div className="form-group">
                <div
                  className={
                    this.state.successful
                      ? "alert alert-success"
                      : "alert alert-danger"
                  }
                  role="alert"
                >
                  {this.state.message}
                </div>
              </div>
            )}
          <CheckButton style={{ display: "none" }} ref={c => {
                this.checkBtn = c;
              }} />
        </Form>

        { this.state.spreview
        ? <CheckPreview
            closeCb = {this.closePreview}
            
            checkData={{name: this.state.named, location: this.state.locations}}
          />
        : null}
       
      </div>
    );
  
  }
}
