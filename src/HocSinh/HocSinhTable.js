import { Component } from "react";
import { getAllLop, addNewHS, deleteHS, updateHS, getPageHSBySearch} from "./HocSinhService";
import ModelHS from "./ModelHS"
import ModelEditHS from "./ModelEditHS"
class HocSinhTable extends Component {


    constructor(props) {
        super(props)
        this.state = {
            listHs: [],
            listLop: [],
            isOpenModelHS: false,
            isOpenModelEdit: false,
            HsEdit: {},
            totalPage: 0,
            page: 1,
            prePage: 1,
            limit: 3,
            preLimit: 3,
            type:'',
            search:'',
        };
    }

    getAllLopFromReact = async () => {
        let response = await getAllLop();
        this.setState({
            listLop: response.data
        })

    }

    getAllHSFromReact = async () => {
        //let response = await getAllHS();
        let response = await getPageHSBySearch(this.state.page, this.state.limit,this.state.type,this.state.search);
        this.setState({
            listHs: response.data.content,
            totalPage: response.data.totalPages
        })
        console.log(this.state.listHs)
    }

    async componentDidMount() {
        await this.getAllHSFromReact();
        await this.getAllLopFromReact();
        console.log(this.state)

    }

    async componentDidUpdate() {
        if (this.state.page !== this.state.prePage) {
            await this.getAllHSFromReact();
            await this.setState({
                prePage: this.state.page
            })
        } if (this.state.limit !== this.state.preLimit) {

            await this.setState({
                preLimit: this.state.limit,
                page: 1,
                prePage: 1,
            })
            await this.getAllHSFromReact();
        }
    }

    handleAddHocSinh = () => {
        this.setState({
            isOpenModelHS: true,
        })
    }

    toggleModel = () => {
        this.setState({
            isOpenModelHS: !this.state.isOpenModelHS,
        })
    }
    toggleModelEdit = () => {
        this.setState({
            isOpenModelEdit: !this.state.isOpenModelEdit,
        })
    }

    createNewHS = async (data) => {
        try {
            console.log("click add", data)
            await addNewHS(data);
            this.getAllHSFromReact();
            this.setState({
                isOpenModelHS: false,
            })
        } catch (e) {
            console.log(e);
        }
    }

    handleDeleteHS = async (item) => {
        console.log("hs data: ", item)
        if (window.confirm("Ban co muon xoa khong")) {
            try {
                await deleteHS(item.id);
                this.getAllHSFromReact();
            } catch (e) {
                console.log(e);
            }
        }
    }

    openUpdateHS = (item) => {
        this.setState({
            isOpenModelEdit: true,
            HsEdit: item,
        })
    }

    handleUpdateHS = async (data) => {
        console.log("click update", data)
        let response = await updateHS(data);
        console.log(response)
        this.getAllHSFromReact();
        this.setState({
            isOpenModelEdit: false,
        })

    }

    PreviousPage = () => {
        if (this.state.page > 1) {
            this.setState({
                page: this.state.page - 1
            })
            console.log(this.state.page)
        }
    }

    NextPage = () => {
        if (this.state.page < this.state.totalPage) {
            this.setState({
                page: this.state.page + 1
            })
            console.log(this.state.page)
        }
    }

    changeLimit = (event) => {
        this.setState({
            limit: event.target.value
        })
    }

    changeTimKiem = (event) => {
        this.setState({
            type:event.target.value,
        })
    }

    changInputTimKiem = (event) => {
        this.setState({
            search:event.target.value,
        })
    }

    handleOnChangeInput = (event, id) => {
        let copyState = { ...this.state };
        copyState[id] = event.target.value;
        this.setState({
            ...copyState
        });
    }

    render() {
        return (
            <div className="container">
                <h3>All HS</h3>
                <ModelHS
                    isOpen={this.state.isOpenModelHS}
                    toggleModel={this.toggleModel}
                    listLop={this.state.listLop}
                    createNewHS={this.createNewHS}

                />
                {
                    this.state.isOpenModelEdit &&
                    <ModelEditHS
                        isOpen={this.state.isOpenModelEdit}
                        toggleModel={this.toggleModelEdit}
                        listLop={this.state.listLop}
                        HsEdit={this.state.HsEdit}
                        editHS={this.handleUpdateHS}

                    />}
                <div className="row form-group">
                    <div className="col-sm-10">
                        <div className="form-row">

                            <input className="form-control col-sm-3 px-10" type="search" placeholder="Search" aria-label="Search"
                            onChange={(event) => this.handleOnChangeInput(event,"search")}/>
                            <select className="form-control custom-select col-sm-3" onChange={(event) => this.handleOnChangeInput(event,"type")}>
                                <option value=""></option>
                                <option value="name">Tim theo Ten</option>
                                <option value="lop">Tim theo Lop</option>
                                <option value="que">Tim theo Que Quan</option>
                            </select>
                            <button type="submit" className="form-control col-sm-1 btn btn-primary" onClick={() => this.getAllHSFromReact()}><i className="fas fa-search-plus"></i></button>
                        </div>
                    </div>
                    <div className="col-sm-2">
                        <button className="btn btn-success " onClick={() => this.handleAddHocSinh()}><i className="fas fa-plus"></i></button>
                    </div>
                </div>
                <div className="container">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Id</th>
                                <th>Ten</th>
                                <th>Lop</th>
                                <th>Ngay Sinh</th>
                                <th>Que Quan</th>
                                <th>Thao Tac</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.listHs.map((item, index) => {
                                    return (
                                        <tr key={index}>
                                            <td>{item.id}</td>
                                            <td>{item.name}</td>
                                            <td>{item.lop.ten}</td>
                                            <td>{item.ngaySinh}</td>
                                            <td>{item.queQuan}</td>
                                            <td>
                                                <button className="btn btn-primary" onClick={() => this.openUpdateHS(item)} ><i className="fas fa-pen"></i></button>
                                                <button className="btn btn-danger" onClick={() => this.handleDeleteHS(item)}><i className="fas fa-trash-alt"></i></button>
                                            </td>
                                        </tr>
                                    )
                                }

                                )
                            }
                        </tbody>
                    </table>
                </div>
                <div className="container">
                    <div className="row">

                        <nav aria-label="Page navigation example" className="col-3">
                            <ul className="pagination">
                                <li className="page-item">
                                    <a className="page-link" aria-label="Previous" onClick={() => this.PreviousPage()}>
                                        <span aria-hidden="true">&laquo;</span>
                                        <span className="sr-only">Previous</span>
                                    </a>
                                </li>
                                <li className="page-item"><a className="page-link" >{this.state.page} of {this.state.totalPage}</a></li>
                                <li className="page-item">
                                    <a className="page-link" aria-label="Next" onClick={() => this.NextPage()}>
                                        <span aria-hidden="true">&raquo;</span>
                                        <span className="sr-only">Next</span>
                                    </a>
                                </li>
                            </ul>
                        </nav>
                        <div className="input-group mb-3 col-3">
                            <div className="input-group-prepend">
                                <label className="input-group-text">Rows per pages</label>
                            </div>
                            <select className="custom-select" id="inputGroupSelect01" onChange={(event) => this.handleOnChangeInput(event,"limit")}>
                                <option defaultValue="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                                <option value="6">6</option>
                            </select>
                        </div>
                    </div>
                </div>


            </div>
        )
    }

}

export default HocSinhTable;