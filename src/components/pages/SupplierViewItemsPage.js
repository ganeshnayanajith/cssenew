import React from 'react'
import {MDBCard, MDBCol, MDBRow, MDBCardBody, MDBBtn, MDBDataTable, MDBContainer} from 'mdbreact';
import FirebaseDB from "../../Firebase";

class SupplierViewItemsPage extends React.Component {

    constructor(props) {
        super(props);


        this.state = {
            supplierId: '',
            data: [],
            rows: [],
            columns: [
                {
                    label: 'Item Name',
                    field: 'itemName'
                },
                {
                    label: 'Item Unit',
                    field: 'itemUnit'
                },
                {
                    label: 'Unit Price',
                    field: 'itemUnitPrice'
                },
                {
                    label: 'Payment Type',
                    field: 'itemPaymentType'
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
        document.title = "Items";

        let currentUrl = window.location.href;
        let supplierId = (currentUrl.split('/')[4]);
        console.log(currentUrl);
        console.log(supplierId);
        this.setState({
            supplierId: supplierId
        });



        const suppliersRef = FirebaseDB.database().ref('suppliers/'+supplierId+'/items');
        //const itemRef=suppliersRef.child(this.state.supplierId).child("items");
        suppliersRef.on('value', (snapshot) => {


            var items = snapshot.val();
            var newitems = [];
            for (let item in items) {
                newitems.push({
                    itemName: items[item].itemName,
                    itemUnit: items[item].itemUnit,
                    itemUnitPrice: items[item].itemUnitPrice,
                    itemPaymentType: items[item].itemPaymentType,
                    update:<MDBBtn color="yellow" size="sm" id={item} >Update</MDBBtn>,
                    delete:<MDBBtn color="red" size="sm" id={item} >Delete</MDBBtn>
                });
            }
            this.setState({
                rows: newitems,
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
        document.title = "Items";

        let currentUrl = window.location.href;
        let supplierId = (currentUrl.split('/')[4]);
        console.log(currentUrl);
        console.log(supplierId);
        this.setState({
            supplierId: supplierId
        });



        const suppliersRef = FirebaseDB.database().ref('suppliers/'+supplierId+'/items');
        //const itemRef=suppliersRef.child(this.state.supplierId).child("items");
        suppliersRef.on('value', (snapshot) => {


            var items = snapshot.val();
            var newitems = [];
            for (let item in items) {
                newitems.push({
                    itemName: items[item].itemName,
                    itemUnit: items[item].itemUnit,
                    itemUnitPrice: items[item].itemUnitPrice,
                    itemPaymentType: items[item].itemPaymentType,
                    update:<MDBBtn color="yellow" size="sm" id={item} >Update</MDBBtn>,
                    delete:<MDBBtn color="red" size="sm" id={item} >Delete</MDBBtn>
                });
            }
            this.setState({
                rows: newitems,
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

            <MDBContainer fluid>

                <MDBRow>
                    <MDBCol lg="12" className="mb-5">
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

export default SupplierViewItemsPage;