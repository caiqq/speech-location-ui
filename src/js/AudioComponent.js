import React, { Component } from 'react';
import "../stypes/AudioComponent.css"

class AudioComponentPanel extends Component {
    constructor(props){
        super(props)
        state = {
            backgroundUrl: null,
            player: "stopped",
            audioFIle: null
        };
    }

    componentWillUpdate(props){
        this.player.pause()
        this.setState({
            backgroundUrl: url("../image/button-sound-start.png"),
            player: "stopped",
            audioFile: props.audioFile
        })
    }

    onAudioClick = () =>{
        if(this.state.player === "stopped"){
            this.setState({
                backgroundUrl: url("../image/button-sound-stop.png")
            })
            this.player.play()
        }
        if(this.state.player === "playing"){
            this.setState({
                backgroundUrl: url("../image/button-sound-start.png")
            })
            this.player.pause()
        }
    }

    render(){
        return(
            <div class="btn-audio" style={{background:this.state.backgroundUrl}} onClick={this.onAudioClick.bind(this)}>
                <audio ref={ref => this.player = ref}>
                    <source src={this.state.audioFile} type={"audio/wav"} />
                </audio>
            </div>)
    }
}

export default AudioComponentPanel