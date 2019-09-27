import React, {Component} from 'react';
import {MDBBtn, MDBCard, MDBCardBody, MDBCol, MDBContainer, MDBRow} from "mdbreact";
import FirebaseDB from "../../Firebase";
import Swal from 'sweetalert';


class SupplierUpdatePage extends Component {


    constructor(props) {
        super(props);

        this.suppliersRef = "";

        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangeContact = this.onChangeContact.bind(this);
        this.onChangeAddress = this.onChangeAddress.bind(this);

        this.onClickBack = this.onClickBack.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            supplierId: '',
            name: '',
            email: '',
            contact: '',
            address: ''
        }

    }


    componentDidMount() {


        document.title = "Update Supplier";

        let currentUrl = window.location.href;
        let supplierId = (currentUrl.split('/')[4]);
        console.log(currentUrl);
        console.log(supplierId);
        this.setState({
            supplierId: supplierId
        });


        this.suppliersRef = FirebaseDB.database().ref('suppliers/' + supplierId);
        this.suppliersRef.on('value', (snapshot) => {


            console.log(snapshot.val());
            var supplier = snapshot.val();

            this.setState({
                name: supplier.name,
                email: supplier.email,
                contact: supplier.contact,
                address: supplier.address
            });

        });


    }

    onChangeName(e) {
        this.setState({
            name: e.target.value
        });
    }

    onChangeEmail(e) {
        this.setState({
            email: e.target.value
        });
    }

    onChangeContact(e) {
        this.setState({
            contact: e.target.value
        });
    }

    onChangeAddress(e) {
        this.setState({
            address: e.target.value
        });
    }

    onClickBack(e){
        this.props.history.push("/supplier");
    }

    onSubmit(e) {


        console.log("name : " + this.state.name + '\n' +
            "email : " + this.state.email + '\n' +
            "contact : " + this.state.contact + '\n' +
            "address : " + this.state.address + '\n'
        );


        const supplier = {
            name: this.state.name,
            email: this.state.email,
            contact: this.state.contact,
            address: this.state.address
        };

        if (this.state.name !== '' && this.state.name !== null) {
            if (this.state.email !== '' && this.state.email !== null) {
                if (this.state.contact !== '' && this.state.contact !== null) {
                    if (this.state.address !== '' && this.state.address !== null) {


                        this.suppliersRef.update({
                            name: this.state.name,
                            email: this.state.email,
                            contact: this.state.contact,
                            address: this.state.address
                        })
                            .then(response => {
                                console.log(response);

                                this.setState({
                                    name: '',
                                    email: '',
                                    contact: '',
                                    address: ''
                                });

                                Swal("Success !", "Supplier Updated Successfully !", "success");
                                this.props.history.push("/supplier");

                            })
                            .catch(error => {
                                console.log(error);
                            });


                    } else {
                        Swal("Failed !", "Enter Address", "error");
                    }
                } else {
                    Swal("Failed !", "Enter Contact", "error");
                }
            } else {
                Swal("Failed !", "Enter Email", "error");
            }
        } else {
            Swal("Failed !", "Enter Name", "error");
        }
    }


    render() {

        return (

            <MDBContainer fluid>

                <MDBRow>
                    <MDBCol lg="4" className="mb-5">
                        <div className="d-flex justify-content-end float-lg-left">
                            <MDBBtn color="blue" onClick={this.onClickBack}>Back</MDBBtn>
                        </div>
                    </MDBCol>
                </MDBRow>


                <MDBRow>
                    <MDBCol lg="8" className="mb-5">
                        <MDBCard>
                            <MDBCardBody>
                                <form>
                                    <p className="h4 text-center mb-4">Update Supplier</p>
                                    <label className="grey-text">
                                        Full Name
                                    </label>
                                    <input
                                        value={this.state.name}
                                        onChange={this.onChangeName}
                                        type="text"
                                        id="name"
                                        className="form-control"
                                    />
                                    <br/>
                                    <label className="grey-text">
                                        Email
                                    </label>
                                    <input
                                        value={this.state.email}
                                        onChange={this.onChangeEmail}
                                        type="email"
                                        id="email"
                                        className="form-control"
                                    />
                                    <br/>
                                    <label className="grey-text">
                                        Contact
                                    </label>
                                    <input
                                        value={this.state.contact}
                                        onChange={this.onChangeContact}
                                        type="text"
                                        id="contact"
                                        className="form-control"
                                    />
                                    <br/>
                                    <label className="grey-text">
                                        Address
                                    </label>
                                    <input
                                        value={this.state.address}
                                        onChange={this.onChangeAddress}
                                        type="text"
                                        id="address"
                                        className="form-control"
                                    />
                                    <div className="text-center mt-4">
                                        <MDBBtn color="indigo" type="button" onClick={this.onSubmit}>Update
                                            Supplier</MDBBtn>
                                    </div>
                                </form>
                            </MDBCardBody>
                        </MDBCard>
                    </MDBCol>
                </MDBRow>
            </MDBContainer>

        );


    }
};


export default SupplierUpdatePage;