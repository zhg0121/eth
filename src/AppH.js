import React from 'react';
//import Request from 'react-http-request';

//import logo from './logo.svg';
import './App.css';
import web3 from './web3';
import ipfs from './ipfs';
import storehash from './storehash';

import { Button } from 'react-bootstrap';
import { Container } from 'react-bootstrap';
import { Form } from 'react-bootstrap';
import { Table } from 'react-bootstrap';


class App extends React.Component {



    //預設值
    state = {
        total: '',
        

        ipfsHash: null,
        buffer: '',
        ethAddress: '',
        blockNumber: '',
        transactionHash: '',
        gasUsed: '',
        txReceipt: '',

        surveyTitle: "",
        surveyInfo: "",
        blockId: [],
        blockType: [],
        blockTitle: [],

    };



    constructor(props) {
        super(props);
        this.state =
            {
                value: "",
                total: '',

                time: new Date().toLocaleTimeString(),

                survey: {
                    "surveyID": 1,
                    "surveyTitle": "無標題表單",
                    "surveyInfo": "表單說明",
                    "block": [
                        {
                            "blockTitle": "未命名的問題",
                            "blockID": 1,
                            "blockType": "choice",
                            "choice:": [
                                1, 2, 3
                            ]
                        },
                        {
                            "blockTitle": "未命名的問題",
                            "blockID": 2,
                            "blockType": "choice",
                            "choice": [
                                1, 2, 3
                            ]
                        }
                    ]
                }
            };
        this.handleChange = this.handleChange.bind(this);


    }
    handleChange(event) {
        // event.target 是當前的 DOM elment
        // 從 event.target.value 取得 user 剛輸入的值
        // 將 user 輸入的值更新回 state
        this.setState({ value: event.target.value });
    }



    async componentDidMount() {
        this.handleChange = this.handleChange.bind(this);

        const total = await storehash.methods.getCount().call();
        if (total >= 200) { alert("目前蘋果總數已過量！"); }
        const upTime = async () => {

            const total = await storehash.methods.getCount().call();
            this.setState({ total: total });
            //這裡面的setState()能夠重新設定state的值

            // console.log({ total })
            this.setState({ total: total })

        }
        setInterval(upTime, 1000)
    }
    async componentDidUpdate() {
        //執行內容
        // console.log('時間一分一秒...')

    }




    //獲取照片
    captureFile = (event) => {
        event.stopPropagation()
        event.preventDefault()
        const file = event.target.files[0]
        let reader = new window.FileReader()
        reader.readAsArrayBuffer(file)//將文件讀取為二進制
        reader.onloadend = () => this.convertToBuffer(reader)//讀取完成後,不管是成功或失敗.程式在onload或者onerror之後使用
    };
    convertToBuffer = async (reader) => {
        //文件被轉換為緩衝區以便上傳到IPFS
        const buffer = await Buffer.from(reader.result);
        //設置此緩衝區 - 使用es6語法
        this.setState({ buffer });
    };

    onClick = async () => {

        try {
            this.setState({ blockNumber: "waiting.." });
            this.setState({ gasUsed: "waiting..." });
            await web3.eth.getTransactionReceipt(this.state.transactionHash, (err, txReceipt) => {
                console.log(err, txReceipt);
                this.setState({ txReceipt });
            }); //await for getTransactionReceipt
            await this.setState({ blockNumber: this.state.txReceipt.blockNumber });
            await this.setState({ gasUsed: this.state.txReceipt.gasUsed });
        } //try
        catch (error) {
            console.log(error);
        } //catch
    } //onClick



    onSubmit = async (event) => {

        event.preventDefault();
        const accounts = await web3.eth.getAccounts();
        // //json取數值
        // fetch('http://localhost:3000/posts')
        //   .then(resp => resp.json())
        //   .then(data => {
        //     // JSON.stringify(data) 
        //     this.setState({
        //       value: data.Quantity
        //     });
        //   });


        console.log('Sending from Metamask account: ' + accounts[0]);
        //從storehash.js獲取合同地址
        const ethAddress = await storehash.options.address;
        this.setState({ ethAddress });
        //將文檔保存到IPFS，返回其hash＃，並將hash＃設置為state
        //using ipfs.add() send buffered file to IPFS
        await ipfs.add(this.state.buffer, (err, ipfsHash) => {
            console.log(err, ipfsHash);
            //setState通過將ipfsHash設置為ipfsHash [0] .hash
            //  this.setState({ ipfsHash: ipfsHash[0].hash });
            //調用以太坊契約方法“sendHash”和.send IPFS哈希到etheruem契約
            //從以太坊契約中返回事務哈希
            //see, this https://web3js.readthedocs.io/en/1.0/web3-eth-contract.html#methods-mymethod-send
            storehash.methods.add(this.state.value).send({
                from: accounts[0]
            }, (error, transactionHash) => {
                // console.log('add增加數量')
            });
        }) //await ipfs.add
    }; //onSubmit

    render() {
        return (
            <div className="App" style={{ padding: 20 }} >

                <Container spacing={40}>
                    <div> {/*Survey */}
                        <input id="surveyTitle" name="surveyTitle"
                            style={{ width: "300px" }}
                            type="text" value={this.state.survey.surveyTitle}
                            onChange={this.handleChange}
                        />
                        <br />
                        <textarea id="surveyInfo" name="surveyInfo"
                            style={{ width: "300px" }}
                            value={this.state.survey.surveyInfo}
                            onChange={this.handleChange}
                        />
                        <br />
                    </div>
                    <div> {/*block1 */}
                        <div>
                            {/* 問題標題 ＆ 問題類型 */}
                            <input id="blockTitle" name="blockTitle"
                                type="text"
                                value={this.state.survey.block[0].blockTitle}
                                onChange={this.handleChange}
                            />
                            <label>{this.state.survey.block[0].blockType}</label>

                        </div>
                        <div>
                            {/* 問題選項 */}
                        </div>
                    </div>
                    <Form onSubmit={this.onSubmit}>

                        <label>表單JSON</label>
                        <textarea id="surveyJson" name="surveyJson" cols="20" rows="20"
                            disabled="disabled"
                            value={JSON.stringify(this.state.survey)} onChange={this.handleChange}
                        />
                        <label>讀取JSON</label>
                        <textarea id="getJSON" name="getJSON" cols="20" rows="20"
                            disabled="disabled" value={this.state.total}
                        />

                        <hr></hr>
                        <Button
                            bsstyle="Primary"
                            type="submit">
                            Send it
                        </Button>
                        <hr></hr>
                        
                    </Form>
                    <hr />

                    <Table bordered responsive>
                        <thead>
                            <tr>
                                <th>Tx Receipt Category</th>
                                <th>Values</th>
                            </tr>

                        </thead>

                        <tbody>
                            <tr>
                                <td>IPFS Hash # stored on Eth Contract</td>
                                <td>{this.state.ipfsHash}</td>
                            </tr>
                            <tr>
                                <td>Ethereum Contract Address</td>
                                <td>{this.state.ethAddress}</td>
                            </tr>
                            <tr>
                                <td>Tx Hash # </td>
                                <td>{this.state.transactionHash}</td>
                            </tr>
                            <tr>
                                <td>Block Number # </td>
                                <td>{this.state.blockNumber}</td>
                            </tr>
                            <tr>
                                <td>Gas Used</td>
                                <td>{this.state.gasUsed}</td>
                            </tr>


                        </tbody>
                    </Table>
                </Container>






            </div>

        );
    } //render
} //App

export default App;