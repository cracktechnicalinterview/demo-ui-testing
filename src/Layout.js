import React, { Component } from "react";
import Table from "@material-ui/core/Table";
import "bootstrap/dist/css/bootstrap.min.css";

class Layout extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            name: undefined,
            roll: undefined,
            data: [],
            localURL: "https://demo-api-technicalinterview.herokuapp.com/demoapp"
        };
    }

    submit =() =>{
        let payload = {
            "rollNo": this.state.roll,
            "name": this.state.name
        }

        const requestOptions ={
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body : JSON.stringify(payload),
        }

        fetch(this.state.localURL+"/submit",requestOptions)
        .then(response => response.json())
        .then(data => {
            this.getData();
            this.name="";
            this.roll="";
        })
        .catch(error =>{

        })
    }

    getData = () => {
        fetch(this.state.localURL+"/")
            .then(response => response.json())
            .then(data => {
                this.setState({ data: data });
        });
    };

    componentDidMount() {
        this.getData();
    }

    render() {
        return (
            <div className="App">
                <div>
                    <br />
                    <input
                        onChange={(event) => {
                            this.state.roll = event.currentTarget.value;
                        }}
                        style={{
                            borderRadius: "5px",
                            height: "35px",
                            width: "220px",
                            border: "1px solid",
                            borderColor: "#dadada",
                            marginRight: "20px ",
                        }}
                        type="text"
                        placeholder="Enter Roll Number"
                    />
                    <input
                        onChange={(event) => {
                            this.state.name = event.currentTarget.value;
                        }}
                        style={{
                            borderRadius: "5px",
                            height: "35px",
                            width: "220px",
                            border: "1px solid",
                            borderColor: "#dadada",
                            marginRight: "20px ",
                        }}
                        type="text"
                        placeholder="Enter Name"
                    />
                    <input type="submit" onClick={this.submit} />
                </div>

                <div>
                    <br></br>
                    <center>
                        <Table style={{ width: "300px" }} striped bordered hover>
                            <thead>
                                <tr>
                                    <th>Serial No#</th>
                                    <th>Roll No.</th>
                                    <th>Name</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.data.map((row) => (
                                    <tr key={row.name}>
                                        <td>{row.id}</td>
                                        <td>{row.rollNo}</td>
                                        <td>{row.name}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </center>
                </div>
            </div>
        );
    }
}

export default Layout;
