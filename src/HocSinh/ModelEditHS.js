import { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

class ModelEditHS extends Component {

    constructor(props) {
        super(props)
        this.state = {
            name: '',
            ngaySinh: '',
            queQuan: '',
            id: '',
            lop: {
                id: '',
                ten: '',
            }

        }
    }


    async componentDidMount() {

        if (this.props.HsEdit.id !== this.state.id) {
            let hs = this.props.HsEdit;
            this.setState({
                name: hs.name,
                ngaySinh: hs.ngaySinh,
                queQuan: hs.queQuan,
                id: hs.id,
                lop:{
                    id:hs.lop.id,
                    ten:hs.lop.ten,
                }
            })
        }
    }


    toggle = () => {
        this.props.toggleModel();
    }

    handleOnChangeInput = (event, id) => {
        let copyState = { ...this.state };
        console.log(copyState)
        copyState[id] = event.target.value;
        this.setState({
            ...copyState
        });
    }

    handleOnChangeLopInput = (event) => {
        this.setState({
            lop:{
                id :event.target.value
            }
        })
        console.log("check event",event.target.value)
    }

    checkValid = () => {
        let isValid = true;
        let input = ["name", "ngaySinh", "lop", "queQuan"];
        for (let i = 0; i < input.length; i++) {
            if (!this.state[input[i]]) {
                isValid = false;
                alert("Thieu " + input[i]);
                break;
            }
        }
        return isValid;

    }

    handleUpdateHS = () => {
        let valid = this.checkValid();

         console.log(this.state)
        if (valid) {
            this.props.editHS(this.state);
        }
    }


    render() {

        return (

            <div>

                <Modal
                    isOpen={this.props.isOpen}
                    toggle={() => { this.toggle() }}
                    className={"abclassName"}
                    size="lg"
                    centered
                >
                    <ModalHeader toggle={() => { this.toggle() }}>Cap Nhat Hoc Sinh</ModalHeader>
                    <ModalBody>
                        <div className="container form-group" >
                            <div className="row">
                                <div className="col-6 ">
                                    <input type="text" className="form-control" placeholder="Ten Hoc Sinh"
                                        onChange={(event) => { this.handleOnChangeInput(event, "name") }}
                                        value={this.state.name} />
                                </div>
                                <div className="col-6">
                                    <select className="form-control"
                                        placeholder="Chon Lop"
                                        value={this.state.lop.id}
                                        onChange={(event) => { this.handleOnChangeLopInput(event) }}>
                                        {this.props.listLop.map((item, index) => {
                                            return (
                                                <option key={index} value={item.id} >{item.ten}</option>
                                            )
                                        }

                                        )}
                                    </select>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-6">
                                    <input type="date" className="form-control" placeholder="Ngay Sinh"
                                        onChange={(event) => { this.handleOnChangeInput(event, "ngaySinh") }}
                                        value={this.state.ngaySinh} />
                                </div>
                                <div className="col-6">
                                    <input type="text" className="form-control" placeholder="Que Quan"
                                        onChange={(event) => { this.handleOnChangeInput(event, "queQuan") }}
                                        value={this.state.queQuan} />
                                </div>
                            </div>
                        </div>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={() => { this.toggle() }}>Huy</Button>
                        <Button color="secondary" onClick={() => { this.handleUpdateHS() }}>Cap Nhat</Button>
                    </ModalFooter>
                </Modal>
            </div>
        );
    }
}

export default ModelEditHS;