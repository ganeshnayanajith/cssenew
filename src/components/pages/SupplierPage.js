import React from 'react'
import {MDBCard, MDBCol, MDBRow, MDBCardBody, MDBBtn, MDBDataTable, MDBContainer} from 'mdbreact';
import FirebaseDB from "../../Firebase";
import Swal from 'sweetalert';

class SupplierPage extends React.Component {

    constructor(props) {
        super(props);

        this.suppliersRef = "";

        this.onClick = this.onClick.bind(this);
        this.addItem = this.addItem.bind(this);
        this.viewItems = this.viewItems.bind(this);
        this.updateSupplier = this.updateSupplier.bind(this);
        this.deleteSupplier = this.deleteSupplier.bind(this);

        this.state = {
            data: [],
            rows: [],
            columns: [
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
                },
                {
                    label: 'Add',
                    field: 'add'
                },
                {
                    label: 'View',
                    field: 'view'
                },
                {
                    label: 'Update',
                    field: 'update'
                },
                {
                    label: 'Delete',
                    field: 'delete'
                }
            ]
        }
    }//end of constructor


    componentDidMount() {
        document.title = "Suppliers";
        this.suppliersRef = FirebaseDB.database().ref('suppliers');
        this.suppliersRef.on('value', (snapshot) => {
            var suppliers = snapshot.val();
            var newsuppliers = [];
            for (let supplier in suppliers) {
                newsuppliers.push({
                    name: suppliers[supplier].name,
                    email: suppliers[supplier].email,
                    contact: suppliers[supplier].contact,
                    address: suppliers[supplier].address,
                    add: <MDBBtn color="purple" size="sm" id={supplier} onClick={this.addItem}>Add Item</MDBBtn>,
                    view: <MDBBtn color="green" size="sm" id={supplier} onClick={this.viewItems}>View Items</MDBBtn>,
                    update: <MDBBtn color="yellow" size="sm" id={supplier}  onClick={this.updateSupplier}>Update</MDBBtn>,
                    delete: <MDBBtn color="red" size="sm" id={supplier}  onClick={this.deleteSupplier}>Delete</MDBBtn>
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
        this.suppliersRef = FirebaseDB.database().ref('suppliers');
        this.suppliersRef.on('value', (snapshot) => {
            var suppliers = snapshot.val();
            var newsuppliers = [];
            for (let supplier in suppliers) {
                newsuppliers.push({
                    name: suppliers[supplier].name,
                    email: suppliers[supplier].email,
                    contact: suppliers[supplier].contact,
                    address: suppliers[supplier].address,
                    add: <MDBBtn color="purple" size="sm" id={supplier} onClick={this.addItem}>Add Item</MDBBtn>,
                    view: <MDBBtn color="green" size="sm" id={supplier} onClick={this.viewItems}>View Items</MDBBtn>,
                    update: <MDBBtn color="yellow" size="sm" id={supplier}  onClick={this.updateSupplier}>Update</MDBBtn>,
                    delete: <MDBBtn color="red" size="sm" id={supplier}  onClick={this.deleteSupplier}>Delete</MDBBtn>
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

    onClick() {
        console.log("click");
        this.props.history.push("/supplieradd");
    };

    addItem(e) {
        console.log(e.target.id);
        this.props.history.push("/supplieradditem/" + e.target.id);
    };

    viewItems(e) {
        console.log(e.target.id);
        this.props.history.push("/supplierviewitems/" + e.target.id);
    };

    updateSupplier(e) {
        console.log(e.target.id);
        this.props.history.push("/supplierupdate/" + e.target.id);
    };

    deleteSupplier(e) {
        console.log(e.target.id);
        let supplierId = e.target.id;


        Swal({
            title: "Are you sure?",
            text: "Once deleted, you will not be able to recover this data",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {

                    this.suppliersRef.child(supplierId).remove();
                    Swal("Success !", "Supplier Deleted Successfully !", "success");
                }
            });
    };




    render() {

        return (

            <MDBContainer fluid>

                <MDBRow>
                    <MDBCol lg="4" className="mb-5">
                        <div className="d-flex justify-content-end float-lg-left">
                            <MDBBtn color="success" onClick={this.onClick}>Add Supplier</MDBBtn>
                        </div>
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