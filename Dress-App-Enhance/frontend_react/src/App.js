import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField'

import Card from '@material-ui/core/Card';
//import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button'
import './App.css';
import Divider from '@material-ui/core/Divider';
import InputAdornment from '@material-ui/core/InputAdornment';
import RecordVoiceOver from '@material-ui/icons/RecordVoiceOver'
import Help from '@material-ui/icons/Help'
import axios from "axios"
import data from "./data.json"


const StaticIp  = ""
const PostUrl = "http://10.19.102.166:8000/play_sound"

const keys = Object.keys(data)
class App extends Component {
  
  constructor(props) {
    super(props)
    this.state = {
        currentClothes: 'Shirt',
        recording: false,
        ip: "192.168.1.3",
        numDots: 0,
        dotsInterval: null,
       
    }
  }




  componentWillMount = () => {
  
    document.addEventListener("keydown", this.spaceFunction, false);
    document.addEventListener("keyup", this.spaceFunction, false);
  }

  stopRecording = () => {
    clearInterval(this.state.dotsInterval)
    this.setState({
      recording: false
    })
  }

  startRecording = () => {
    this.setState({
        recording: true
    })
    let dotsInterval = setInterval(() => {
      this.setState({
        numDots: (this.state.numDots + 1) % 3
      })
    }, 500)
    this.setState({
      dotsInterval
    })
  }

  toggleRecording = () => {
    if (this.state.recording) {
      this.stopRecording()
    } else {
      this.startRecording()
    }
    window.open("http://10.19.102.166:8000/","blank")
  }

  spaceFunction = (event) => {
    //console.log(event)
    if (event.keyCode === 32 && event.type === "keyup") {
      this.stopRecording()
      event.preventDefault()
    } else if (event.keyCode === 32 && !this.state.recording) {
      this.startRecording()
      event.preventDefault()
    } else {
      //console.log(event.key)
    }
  }

  getDots = () => {
    return ".".repeat(this.state.numDots + 1)
  }

  onClothesClick = (id) => {
    console.log(id)
  
    this.setState({currentClothes: id})
  }

  playSound(file,cloth){
    
    let fileName=`./audio/${cloth}/${file}`
    /*
    const soundfile = require(`./audio/${cloth}/${file}`)
    let audio = new Audio(soundfile)
    audio.play()*/
    
    axios.post(PostUrl,{sound:fileName})
  

  }

  onActionClick = (id,cloth) => {
    console.log(id)
    //alert(e.target.getAttribute('id'))
    this.setState({currentAction: id})
    this.playSound(id,cloth)
  }

  generateInstruction(){
  
     
    
 
    let ins = data[this.state.currentClothes]
  
    return ins.map((info,ind)=>{
      return <div>
      <Button 
      key = {ind}
      id={info.file}
      variant='contained' 
      color={this.getColor('open-drawer-button')} 
      style={{margin: 10}} 
      onClick={(e) => this.onActionClick(`${info.file}`,`${this.state.currentClothes}`)}
      >{info.order}</Button></div>
    })
  }
  


  getColor = (id) => {
    if (this.state.currentClothes === id) {
      return "secondary"
    } else if (this.state.currentAction === id) {
      return "secondary"
    } else {
      return "default"
    }
  }

  getCurrentClothing = () => {
    switch (this.state.currentClothes) {
      case "tops-button":
        return "shirt"
      case "bottoms-button":
        return "pants"
      case "socks-button":
        return "socks"
      case "shoes-button":
        return "shoes"
      case "others-button":
        return "clothing"
      default:
        return ""
    }
  }



  render() {
    return (
      <div className='background' style={{padding: 20}}>
        <Card>
          <CardContent>
            <Typography className="App" style={{fontSize: 40}}>
              DRESS
            </Typography>
            <Typography className="App" color="textSecondary" style={{fontSize: 12}}>
              Currently connected to: {this.state.ip}
            </Typography>
            <Divider inset style={{margin: 10}}/>
            <div className="side-by-side" style={{paddingTop: 20}}>
              <div>
                <Typography style={{marginLeft: 10, fontSize: 30}}>Clothing</Typography>
                <Typography style={{marginLeft: 10, fontSize: 12}} color="textSecondary">Select clothing below</Typography>
                <div style={{marginTop: 15}}>

                {keys.map((key,ind)=>{
                   return <div>
                    <Button
                    color={this.getColor(`${key}`)} 
                    id={key} 
                    key={ind}
                    variant='contained' 
                    style={{margin: 10}} 
                    onClick={(e) => this.onClothesClick(`${key}`)}>{key}</Button>
                    </div>

                })}
                  
                 
                </div>
              </div>
              <div className='divider' style={{padding: 50, marginLeft: 'auto'}}/>
              <div style={{minWidth: 200}}>
                <Typography style={{marginLeft: 10, fontSize: 30}}>Instruction</Typography>
                <Typography style={{marginLeft: 10, fontSize: 12}} color="textSecondary">Select instruction below</Typography>
                <div style={{marginTop: 15}}>
                  {this.generateInstruction()}

                    
                 
                </div>
              </div>
              <div className='divider' style={{padding: 50, marginLeft: 'auto'}}/>
              <div style={{minWidth: 150}}>
                <Typography style={{fontSize: 30}}>Notes</Typography>
                <TextField
                  placeholder="How is the patient doing? Are they struggling? Are they frustrated?"
                  multiline
                  style={{minWidth: 500, marginTop: 15}}
                  rows="4"
                  InputProps={{
                    endAdornment: (
                      <InputAdornment>
                        <Button style={{}} color='secondary'>Save</Button>
                      </InputAdornment>
                    ),
                  }}
                ></TextField><br/>
                <Button onClick={this.toggleRecording} style={{color: 'red', marginTop: 10, marginBottom: 5, minWidth: 300, textAlign: 'left'}}>
                  <RecordVoiceOver />
                  <div style={{marginLeft: 10}}>{this.state.recording ? <div>Currently recording{this.getDots()}</div> : <div>>Talk to patient (or hold space)</div>}</div>
                </Button><br/>
                <Button>
                  <Help />
                  <div style={{marginLeft: 10}}>Help</div>
                </Button>
              </div>
            </div><br/>
            Created at the NYU-X Lab in the NYU Rory Meyers College of Nursing in collaboration with the NYU Tandon School of Engineering.
          </CardContent>
        </Card>

      </div>
    );
  }
}



export default App;

/*
 <Button 
                    id="open-drawer-button" 
                    variant='contained' 
                    color={this.getColor('open-drawer-button')} 
                    style={{margin: 10}} 
                    onClick={(e) => this.onActionClick('open-drawer-button')}
                    >Open the drawer with green light</Button><br/>
                  <Button 
                    id="take-out-button" 
                    variant='contained'
                    color={this.getColor('take-out-button')} 
                    style={{margin: 10}} 
                    onClick={(e) => this.onActionClick('take-out-button')}
                    >Take out the {this.getCurrentClothing()}</Button><br/>
                  <Button 
                    id="sit-on-chair-button" 
                    variant='contained' 
                    color={this.getColor('sit-on-chair-button')} 
                    style={{margin: 10}} 
                    onClick={(e) => this.onActionClick('sit-on-chair-button')}
                    >Sit on the chair</Button><br/>
                  <Button 
                    id="put-on-shoes-button" 
                    variant='contained' 
                    color={this.getColor('put-on-shoes-button')} 
                    style={{margin: 10}} 
                    onClick={(e) => this.onActionClick('put-on-shoes-button')}
                    >Put on the {this.getCurrentClothing()}</Button><br/>

*/