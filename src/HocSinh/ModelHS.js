import { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

class ModelHS extends Component {

    constructor(props) {
        super(props)
        this.state = {
            name: '',
            ngaySinh: '',
            queQuan: '',
            lop: {
                id: '',
                ten: '',
            }

        }
    }


    componentDidMount() { }


    toggle = () => {
        this.props.toggleModel();
    }

    handleOnChangeInput = (event, id) => {
        let copyState = { ...this.state };
        copyState[id] = event.target.value;
        this.setState({
            ...copyState
        });
        console.log(this.state)
    }

    handleOnChangeLopInput = (event, id) => {
        this.setState({
            lop: { id: event.target.value }
        })
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

    handleAddNewHS = () => {
        let valid = this.checkValid();
        console.log("check data", this.state)
        if (valid) {
            this.props.createNewHS(this.state);
            this.setState({
                name: '',
                ngaySinh: '',
                queQuan: '',
                lop: {
                    id: '',
                    ten: '',
                }

            })
        }
    }


    render() {
        return (

            <div>

                <Modal
                    isOpen={this.props.isOpen}
                    toggle={() => { this.toggle() }}
                    className={"abcclassName"}
                    size="lg"
                    centered
                >
                    <ModalHeader toggle={() => { this.toggle() }}>Them Hoc Sinh</ModalHeader>
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
                                        value={this.state.lop.ten}
                                        onChange={(event) => { this.handleOnChangeLopInput(event, "lop") }}>
                                        {this.props.listLop.map((item, index) => {
                                            return (
                                                <option key={index} value={item.id}>{item.ten}</option>
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
                        <Button color="secondary" onClick={() => { this.handleAddNewHS() }}>Them</Button>
                    </ModalFooter>
                </Modal>
            </div>
        );
    }
}

export default ModelHS;