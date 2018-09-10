import React from 'react'
import io from 'socket.io-client'
class Chat extends React.Component{
    componentDidMount () {
        const socket =  io('ws://localhost:9093')
            console.log(socket)
    }
    render () {
        console.log(this.props)
        return <div>
            {this.props.match.params.user}
        </div>
    }
}
export default Chat