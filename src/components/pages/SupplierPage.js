import React from 'react'
import {MDBCard, MDBCol, MDBRow, MDBCardBody, MDBBtn, MDBDataTable, MDBContainer} from 'mdbreact';
import FirebaseDB from "../../Firebase";

class SupplierPage extends React.Component {

    constructor(props) {
        super(props);

        this.onClick = this.onClick.bind(this);

        this.state = {
            suppliers: [],
            rows: [],
            columns: [
                {
                    label: 'ID',
                    field: 'id'
                },
                {
                    label: 'Name',
                    field: 'name'
                },
                {
                    label: 'Email',
                    field: 'email'
                },
                {
                    label: 'Contact',
                    field: 'contact'
                },
                {
                    label: 'Address',
                    field: 'address'
                }
            ]

        }

    }//end of constructor

    onClick() {

        console.log("click");

        this.props.history.push("/supplieradd");
    };


    componentDidMount() {
        document.title = "Suppliers";
        const suppliersRef = FirebaseDB.database().ref('suppliers');
        suppliersRef.on('value', (snapshot) => {
            var suppliers = snapshot.val();
            var newsuppliers = [];
            for (let supplier in suppliers) {
                newsuppliers.push({
                    id:supplier,
                    name: suppliers[supplier].name,
                    email: suppliers[supplier].email,
                    contact: suppliers[supplier].contact,
                    address: suppliers[supplier].address,
                });
            }
            this.setState({
                rows: newsuppliers,
            });
            this.setState({
                data: {
                    columns: this.state.columns,
                    rows: this.state.rows
                }
            });
        });
    };

    componentWillMount() {
        document.title = "Suppliers";
        const suppliersRef = FirebaseDB.database().ref('suppliers');
        suppliersRef.on('value', (snapshot) => {
            var suppliers = snapshot.val();
            var newsuppliers = [];
            for (let supplier in suppliers) {
                newsuppliers.push({
                    id:supplier,
                    name: suppliers[supplier].name,
                    email: suppliers[supplier].email,
                    contact: suppliers[supplier].contact,
                    address: suppliers[supplier].address,
                });
            }
            this.setState({
                rows: newsuppliers,
            });
            this.setState({
                data: {
                    columns: this.state.columns,
                    rows: this.state.rows
                }
            });
        });
    };

    render() {

        return (

            <MDBContainer>

                <MDBRow>
                    <MDBCol sm="12" md="6" lg="3" className="mb-5">
                    </MDBCol>
                    <MDBCol sm="12" md="6" lg="3" className="mb-5">
                    </MDBCol>
                    <MDBCol sm="12" md="6" lg="3" className="mb-5">
                    </MDBCol>
                    <MDBCol sm="12" md="6" lg="3" className="mb-5">
                        <MDBBtn color="success" onClick={this.onClick}>Add Supplier</MDBBtn>
                    </MDBCol>
                </MDBRow>

                <MDBRow>
                    <MDBCol sm="12" md="12" lg="12" className="mb-5">
                        <MDBCard>
                            <MDBCardBody>
                                <MDBDataTable
                                    striped
                                    hover
                                    data={this.state.data}
                                />
                            </MDBCardBody>
                        </MDBCard>
                    </MDBCol>
                </MDBRow>

            </MDBContainer>

        );//end of return
    };//end of render

}

export default SupplierPage;