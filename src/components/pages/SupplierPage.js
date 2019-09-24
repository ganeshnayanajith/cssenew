import React from 'react'
import {MDBCard, MDBCol, MDBRow, MDBCardBody, MDBBtn, MDBDataTable, MDBContainer} from 'mdbreact';
import FirebaseDB from "../../Firebase";

class SupplierPage extends React.Component {

    constructor(props) {
        super(props);

        this.database = FirebaseDB.database().ref().child('suppliers');

        this.onClick = this.onClick.bind(this);

        this.state = {
            data: {
                columns: [
                    {
                        label: 'Name',
                        field: 'name',
                        sort: 'asc',
                        width: 150
                    },
                    {
                        label: 'Position',
                        field: 'position',
                        sort: 'asc',
                        width: 270
                    },
                    {
                        label: 'Office',
                        field: 'office',
                        sort: 'asc',
                        width: 200
                    },
                    {
                        label: 'Age',
                        field: 'age',
                        sort: 'asc',
                        width: 100
                    },
                    {
                        label: 'Start date',
                        field: 'date',
                        sort: 'asc',
                        width: 150
                    },
                    {
                        label: 'Salary',
                        field: 'salary',
                        sort: 'asc',
                        width: 100
                    }
                ],
                rows: [
                    {
                        name: 'Tiger Nixon',
                        position: 'System Architect',
                        office: 'Edinburgh',
                        age: '61',
                        date: '2011/04/25',
                        salary: '$320'
                    },
                    {
                        name: 'Garrett Winters',
                        position: 'Accountant',
                        office: 'Tokyo',
                        age: '63',
                        date: '2011/07/25',
                        salary: '$170'
                    }
                ]
            }
        }//end of this.state
    }//end of constructor

    onClick() {

        console.log("click");

        this.props.history.push("/supplieradd");
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