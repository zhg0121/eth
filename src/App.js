import React from 'react';
//import Request from 'react-http-request';

//import logo from './logo.svg';
import './App.css';
import web3 from './web3';
// import ipfs from './ipfs';
import storehash from './storehash';

import { Button } from 'react-bootstrap';
import { Container } from 'react-bootstrap';
import { Form } from 'react-bootstrap';

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

        answer1: '',
        answer2: ''

    };

    constructor(props) {
        super(props);
        this.state =
            {
                value: "", //原始讀入值
                table: '',
                total: '', //紀錄至鏈上
                time: new Date().toLocaleTimeString(),
                getSurveyJson: '',
                getChoiceJson: '',

                survey: {
                    "surveyID": 2,
                    "surveyTitle": "無標題表單",
                    "surveyInfo": "表單說明",
                    "block": [
                        {
                            "blockTitle": "未命名的問題",
                            "blockID": 1,
                            "blockType": "choice",
                        },
                        {
                            "blockTitle": "未命名的問題",
                            "blockID": 2,
                            "blockType": "choice"
                        }
                    ]
                },

                choice: {
                    "matchBlock": [{
                        "blockID": 1,
                        "value": [
                            "選項1", "選項2", "選項3"
                        ]
                    }, {
                        "blockID": 2,
                        "value": [
                            "選項1", "選項2", "選項3"
                        ]
                    }
                    ]
                },

                answer: {
                    "matchBlock": [{
                        "blockID": 1,
                        "value": ""
                    }, {
                        "blockID": 2,
                        "value": ""
                    }
                    ]
                },


                surveyTitle: '未命名表單',
                surveyInfo: '表單說明',

                ques1: '未命名的問題',
                ques1Type: 'multipleChoice',
                ques1cho1: '選項1',
                ques1cho2: '選項2',
                ques1cho3: '選項3',


                ques2: '未命名的問題',
                ques2Type: 'multipleChoice',
                ques2cho1: '選項1',
                ques2cho2: '選項2',
                ques2cho3: '選項3',

                answer1: '',

                answer2: ''



            };
        // this.handleChange = this.handleChange.bind(this);


    }
    handleChange(event) {
        // event.target 是當前的 DOM elment
        // 從 event.target.value 取得 user 剛輸入的值
        // 將 user 輸入的值更新回 state
        this.setState({ value: event.target.value });
        console.log("Target Value:" + event.target.value)
    }

    setSurveyTitleChange(event) {
        this.setState({ surveyTitle: event.target.value })
    }

    setSurveyInfoChange(event) {
        this.setState({ surveyInfo: event.target.value })
    }

    setQues1Change(event) {
        this.setState({ ques1: event.target.value })
    }

    setQues1Cho1Change(event) {
        this.setState({ ques1cho1: event.target.value })

    }

    setQues1Cho2Change(event) {
        this.setState({ ques1cho2: event.target.value })

    }

    setQues1Cho3Change(event) {
        this.setState({ ques1cho3: event.target.value })

    }

    setQues2Change(event) {
        this.setState({ ques2: event.target.value })

    }

    setQues2Cho1Change(event) {
        this.setState({ ques2cho1: event.target.value })

    }

    setQues2Cho2Change(event) {
        this.setState({ ques2cho2: event.target.value })

    }

    setQues2Cho3Change(event) {
        this.setState({ ques2cho3: event.target.value })

    }

    answer1Change(event) {
        // check it out: we get the evt.target.name (which will be either "email" or "password")
        // and use it to target the key on our `state` object with the same name, using bracket syntax
        this.setState({ answer1: event.target.value });
    }
    answer2Change(event) {
        // check it out: we get the evt.target.name (which will be either "email" or "password")
        // and use it to target the key on our `state` object with the same name, using bracket syntax
        this.setState({ answer2: event.target.value });
    }


    async componentDidMount() {
        this.handleChange = this.handleChange.bind(this);

        // const total = await storehash.methods.getCount().call();
        const upTime = async () => {

            const total = await storehash.methods.getCount().call();
            this.setState({ total: total });
            //這裡面的setState()能夠重新設定state的值
            const accounts = await web3.eth.getAccounts();

            console.log({ total })

            fetch('http://localhost:3000/posts')
                .then(resp => resp.json())
                .then(data => {
                    // JSON.stringify(data) 
                    this.setState({
                        getSurveyJson: data
                    });
                    console.log
                        (
                            "value:" + JSON.stringify(this.state.getSurveyJson) + "\n" +
                            "typeOfValue:" + typeof (this.state.getSurveyJson) + "\n" +
                            "data:" + JSON.stringify(data) + "\n" +
                            "typeOfdata:" + typeof (data) + "\n" +
                            "typeof:" + typeof (JSON.stringify(data)) + "\n" +
                            "web3:" + accounts + "\n" +
                            "survey_length:" + this.state.survey.length + "\n" +
                            "block_length:" + this.state.survey.block.length + "\n" +
                            "block[0]:" + this.state.survey.block[0].length + "\n"
                            // "choice:" + this.state.choice.matchBlock.length + "\n" 
                            // "answerMatch1:" + this.state.answer.matchBlock[0].value + "\n" +
                            // "answerMatch2:" + this.state.answer.matchBlock[1].value
                        );
                });

            fetch('http://localhost:3000/choice')
                .then(resp => resp.json())
                .then(data => {
                    // JSON.stringify(data) 
                    this.setState({
                        getChoiceJson: data
                    });
                    console.log
                        (
                            "choiceJson" + JSON.stringify(this.state.getChoiceJson)
                        );
                });
        }
        // const getJson = async () => {
        //     console.log
        //         (
        //             // "value:" + JSON.stringify(this.state.value) + "\n" +
        //             // "typeOfValue:" + typeof (this.state.value) + "\n" +
        //             // // "data:" + JSON.stringify(data) + "\n" +
        //             // // "typeOfdata:" + typeof (data) + "\n" +
        //             // // "typeof:" + typeof (JSON.stringify(data)) + "\n" +
        //             // // "web3:" + accounts + "\n" +
        //             // "survey_length:" + this.state.survey.length + "\n" +
        //             // "block_length:" + this.state.survey.block.length + "\n" +
        //             // "block[0]:" + this.state.survey.block[0].length + "\n" +
        //             // "choice:" + this.state.choice.matchBlock.length + "\n" +
        //             // "answerMatch1:" + this.state.answer.matchBlock[0].value + "\n" +
        //             // "answerMatch2:" + this.state.answer.matchBlock[1].value
        //         );
        // }
        setTimeout(upTime)
        // setInterval(getJson, 1000)

        // setInterval(upTime, 1000)
    }
    async componentDidUpdate() {
        //執行內容
        // console.log('時間一分一秒...')

    }

    addBlock = () => {
        this.state.survey.block.push()

    }

    // //獲取照片
    // captureFile = (event) => {
    //     event.stopPropagation()
    //     event.preventDefault()
    //     const file = event.target.files[0]
    //     let reader = new window.FileReader()
    //     reader.readAsArrayBuffer(file)//將文件讀取為二進制
    //     reader.onloadend = () => this.convertToBuffer(reader)//讀取完成後,不管是成功或失敗.程式在onload或者onerror之後使用
    // };
    // convertToBuffer = async (reader) => {
    //     //文件被轉換為緩衝區以便上傳到IPFS
    //     const buffer = await Buffer.from(reader.result);
    //     //設置此緩衝區 - 使用es6語法
    //     this.setState({ buffer });
    // };

    // Transaction: 0xa4641809e2272d8c981d438e8ea53e40e7ee3b2801e2a3db60e44e93e67e8772
    // Gas usage: 44143
    // Block Number: 5
    // Block Time: Tue Apr 16 2019 17:06:36 GMT+0800 (GMT+08:00)


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

    updateJson = async () => {

    }

    createTable = () => {
        let table = []
        table.push(<label>{this.state.survey.surveyTitle}<br /></label>)
        table.push(<label>{this.state.survey.surveyInfo}<br /></label>)
        // Outer loop to create parent
        for (let i = 0; i < this.state.survey.block.length; i++) {
            let block = []
            block.push(<tr>{this.state.survey.block[i].blockTitle}</tr>)
            block.push(<tr>{this.state.survey.block[i].blockType}</tr>)

            // block.push(<input type="text"
            //     name={this.state.answer.matchBlock[0].value}
            //     onChange={this.handleChange}
            // />)
            //Inner loop to create children
            for (let j = 0; j < this.state.choice.matchBlock[i].value.length; j++) {
                let choice = []
                choice.push(
                    <td>

                        <input type="radio"
                            name="answer.matchBlock[0].value"
                            value={this.state.choice.matchBlock[i].value[j]}

                            onChange={
                                this.answerChange
                            }
                        />
                        <label>{this.state.choice.matchBlock[i].value[j]}</label>
                    </td>)
                block.push(<tr>{choice}</tr>)
            }
            // Create the parent and add the children
            table.push(<tr>{block}</tr>)
        }
        return table // 大括號需加上return
    }

    onSubmit = async (event) => {

        event.preventDefault();
        const accounts = await web3.eth.getAccounts();


        console.log('Sending from Metamask account: ' + accounts[0]); //從storehash.js獲取合同地址
        const ethAddress = await storehash.options.address;
        this.setState({ ethAddress });
        storehash.methods.add(JSON.stringify(this.state.value)).send({
            from: accounts[0]
        }, (error, transactionHash) => {
            console.log('add增加數量' + this.state.value + '\n')
            console.log('total' + this.state.total)
        });
        // }) //await ipfs.add
    }; //onSubmit

    sendAnswer = async (event) => {

        event.preventDefault();
        const accounts = await web3.eth.getAccounts();


        console.log('Sending from Metamask account: ' + accounts[0]); //從storehash.js獲取合同地址
        const ethAddress = await storehash.options.address;
        this.setState({ ethAddress });
        storehash.methods.getJSON(JSON.stringify(this.state.answer)).send({
            from: accounts[0]
        }, (error, transactionHash) => {
            console.log('add增加數量' + this.state.value + '\n')
            console.log('total' + this.state.total)
        });
        // }) //await ipfs.add
    }; //onSubmit

    render() {
        return (
            <div className="App" style={{ padding: 20 }} >

                <Container>
                    <Form onSubmit={this.onSubmit}>
                        {/* <input
                            type="file"
                            onChange={this.captureFile}
                        /> */}

                        <label>{this.state.value.surveyTitle}</label>
                        <br></br>
                        <label>{this.state.value.surveyInfo}</label>
                        <br></br>
                        {/* <label>{this.state.value.block.blockTitle[0]}</label> */}
                        <label>問卷Json</label>
                        <textarea id="surveyJson" name="surveyJson" cols="20" rows="20"
                            disabled="disabled"
                            value={
                                "surveyTitlle:" +JSON.stringify(this.state.surveyTitle) + "\n" +
                                "surveyTitlle:" +JSON.stringify(this.state.surveyTitle) + "\n"
                            }
                            onChange={this.handleChange}
                        />
                        {/* <input id="amount" name="amount"
                            disabled="disabled"
                            type="text" value={JSON.stringify(this.state.value)}
                            onChange={this.handleChange}
                        /> */}
                        <label>紀錄Json</label>
                        <textarea id="getJSON" name="getJSON" cols="20" rows="20"
                            disabled="disabled" value={this.state.total}
                        />
                        {/* <input id="amount2" name="amount2"
                            type="text" 
                            disabled="disabled"
                            value={this.state.total}
                            onChange={this.handleChange}
                        /> */}
                        <br></br>
                        <Button
                            bsstyle="primary"
                            type="submit">
                            Send it
                        </Button>
                        <hr />
                    </Form>


                </Container>

                <Container>
                    <div>
                        <input id="setSurveyTitle" name="setSurveyTitle"
                            type="text"
                            value={this.state.surveyTitle}
                            onChange={this.setSurveyTitleChange.bind(this)}
                        />
                        <br />
                        <textarea id="setSurveyInfo" name="setSurveyInfo"
                            value={this.state.surveyInfo}
                            onChange={this.setSurveyInfoChange.bind(this)}
                        />

                        <ul>
                            <li>
                                <input id='block1.title' name='block1.title'
                                    type='text'
                                    value={this.state.ques1}
                                    onChange={this.setQues1Change.bind(this)}
                                />
                                <ul>
                                    <li>
                                        <input type="text"
                                            name="ques1Cho1"
                                            value={this.state.ques1cho1}
                                            onChange={this.setQues1Cho1Change.bind(this)}
                                        />
                                    </li>

                                    <li>
                                        <li>
                                            <input type="text"
                                                name="ques1Cho2"
                                                value={this.state.ques1cho2}
                                                onChange={this.setQues1Cho2Change.bind(this)}
                                            />
                                        </li>
                                    </li>
                                    <li>
                                        <li>
                                            <input type="text"
                                                name="ques1Cho2"
                                                value={this.state.ques1cho2}
                                                onChange={this.setQues1Cho2Change.bind(this)}
                                            />
                                        </li>
                                    </li>
                                </ul>
                            </li>
                            <br />
                            <li>
                                <input id='block2.title' name='block2.title'
                                    type='text'
                                    value=  {this.state.ques2}
                                    onChange={this.setQues2Change.bind(this)}
                                />
                                <ul>
                                    <li>
                                        <input type="text"
                                            name="ques2Cho1"
                                            value={this.state.ques2cho1}
                                            onChange={this.setQues2Cho1Change.bind(this)}
                                        />
                                    </li>

                                    <li>
                                        <li>
                                            <input type="text"
                                                name="ques2Cho2"
                                                value={this.state.ques2cho2}
                                                onChange={this.setQues2Cho2Change.bind(this)}
                                            />
                                        </li>
                                    </li>
                                    <li>
                                        <li>
                                            <input type="text"
                                                name="ques2Cho2"
                                                value={this.state.ques2cho2}
                                                onChange={this.setQues2Cho2Change.bind(this)}
                                            />
                                        </li>
                                    </li>
                                </ul>
                            </li>
                        </ul>
                    </div>
                </Container>

                <hr />

                <Container >
                    {/* 回答問卷畫面 */}
                    <Form sendAnswer={this.sendAnswer} >
                        <label>{this.state.surveyTitle}</label>
                        <br />
                        <textarea
                            value={this.state.surveyInfo}
                            disabled="disabled"
                        />
                        <br />
                        <ul >
                            <li>
                                <label>{this.state.ques1}</label>
                                <ul>
                                    <li>
                                        <label>
                                            <input type="radio"
                                                name="answer1"
                                                value={this.state.ques1cho1}
                                                onChange={this.answer1Change.bind(this)}
                                            />
                                            {this.state.ques1cho1}
                                        </label>
                                    </li>

                                    <li>
                                        <label>
                                            <input type="radio"
                                                name="answer1"
                                                value={this.state.ques1cho2}
                                                onChange={this.answer1Change.bind(this)}
                                            />
                                            {this.state.ques1cho2}
                                        </label>
                                    </li>
                                    <li>
                                        <label>
                                            <input type="radio"
                                                name="answer1"
                                                value={this.state.ques1cho3}
                                                onChange={this.answer1Change.bind(this)}
                                            />
                                            {this.state.ques1cho3}
                                        </label>
                                    </li>
                                </ul>
                            </li>
                            <br />
                            <li>
                                <label>{this.state.ques2}</label>
                                <ul>
                                    <li>
                                        <label>
                                            <input type="radio"
                                                name="answer2"
                                                value={this.state.ques2cho1}
                                                onChange={this.answer2Change.bind(this)}
                                            />
                                            {this.state.ques2cho1}
                                        </label>
                                    </li>

                                    <li>
                                        <label>
                                            <input type="radio"
                                                name="answer2"
                                                value={this.state.ques2cho2}
                                                onChange={this.answer2Change.bind(this)}
                                            />
                                            {this.state.ques2cho2}
                                        </label>
                                    </li>
                                    <li>
                                        <label>
                                            <input type="radio"
                                                name="answer2"
                                                value={this.state.ques2cho3}
                                                onChange={this.answer2Change.bind(this)}
                                            />
                                            {this.state.ques2cho3}
                                        </label>
                                    </li>
                                </ul>
                            </li>
                        </ul>

                    </Form>
                </Container>
                <hr />
                <label>Answer1: {this.state.answer1}</label>
                <br />
                <label>Answer2: {this.state.answer2}</label>


                {/* <hr />
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
                <Button bsstyle="dark"
                    type="submit"
                    onClick={this.onClick}> Get Transaction Receipt </Button> */}
            </div>
        );
    } //render
} //App

export default App;