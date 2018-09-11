import React from 'react'
// import io from 'socket.io-client'
import {List, InputItem, NavBar, Icon, Grid} from 'antd-mobile'
import {connect} from 'react-redux'
import {getMsgList, sendMsg, recvMsg, readMsg} from '../../redux/chat'
import {getChatId} from '../../util'

@connect(
    state => state,
    {getMsgList, sendMsg, recvMsg, readMsg}
)

class Chat extends React.Component {
    constructor(props) {
        super(props)
        this.state = {text: '', msg: [], showEmoji: false}
    }

    fixCarousel() {
        setTimeout(function () {
            window.dispatchEvent(new Event('resize'))
        }, 0)
    }

    componentDidMount() {
        // console.log(this.props)
        if (!this.props.chat.chatmsg.length) {
            this.props.getMsgList()
            this.props.recvMsg()
            console.log(this.props.user._id, 'from来自20')
            console.log(this.props.match.params.user, 'to发送给20')
        }
        setTimeout(function () {
            window.dispatchEvent(new Event('resize'))
        }, 0)
        // socket.on('recvmsg', (data) => {
        //     console.log(this.state.msg);
        //     this.setState({
        //         msg: [...this.state.msg, data.text]
        //     })
        // })
    }

    componentWillUnmount(){ // 组件移除触发
        const to = this.props.match.params.user
        this.props.readMsg(to)
    }

    handleSubmit() {
        // socket.emit('sendmsg', {text: this.state.text})
        const from = this.props.user._id; // 发送者
        const to = this.props.match.params.user; // 接收者
        const msg = this.state.text; // 发送的信息
        this.props.sendMsg({from, to, msg})
        this.state = {
            text: ''
        }
    }

    render() {
        const userid = this.props.match.params.user; // 匹配Id
        const users = this.props.chat.users; // 用户列表
        const chatid = getChatId(userid, this.props.user._id) // 当前登陆用户id
        const chatmsgs = this.props.chat.chatmsg.filter(v => v.chatid === chatid);
        const emoji = '😀 😃 😄 😁 😆 😅 😂 😊 😇 🙂 🙃 😉 😌 😍 😘 😗 😙 😚 😋 😜 😝 😛 🤑 🤗 🤓 😎 😏 😒 😞 😔 😟 😕 🙁 😣 😖 😫 😩 😤 😠 😡 😶 😐 😑 😯 😦 😧 😮 😲 😵 😳 😱 😨 😰 😢 😥 😭 😓 😪 😴 🙄 🤔 😬 🤐 😷 🤒 🤕 😈 👿 👹 👺 💩 👻 💀 ☠️ 👽 👾 🤖 🎃 😺 😸 😹 😻 😼 😽 🙀 😿 😾 👐 🙌 👏 🙏 👍 👎 👊 ✊ 🤘 👌 👈 👉 👆 👇 ✋  🖐 🖖 👋  💪 🖕 ✍️  💅 🖖 💄 💋 👄 👅 👂 👃 👁 👀 '
            .split(' ')
            .filter(v => v)
            .map(v => ({text: v}));
        // console.log(emoji)
        if (!users[userid]) {
            return null
        }
        const Item = List.Item;
        return <div id='chat-page'>
            <NavBar
                mode='dark'
                icon={<Icon type="left"/>}
                onLeftClick={() => {
                    this.props.history.goBack()
                }}>
                {users[userid].name}
            </NavBar>
            {chatmsgs.map(v => {
                const avatar = require(`../img/${users[v.from].avatar}.png`)
                return v.from === userid ? (
                    <List key={v._id}>
                        <Item
                            thumb={avatar}
                        >{v.content}</Item>
                    </List>
                ) : (
                    <List key={v._id}>
                        <Item
                            extra={<img src={avatar}/>}
                            className='chat-me'
                        >{v.content}</Item>
                    </List>
                )
            })}
            <div className="stick-footer">
                <List>
                    <InputItem placeholder='请输入'
                               value={this.state.text}
                               onChange={v => {
                                   this.setState({text: v})
                               }}

                               extra={
                                   <div>
									<span
                                        style={{marginRight: 15}}
                                        onClick={() => {
                                            this.setState({
                                                showEmoji: !this.state.showEmoji
                                            })
                                            this.fixCarousel()
                                        }}
                                    >😃</span>
                                       <span onClick={() => this.handleSubmit()}>发送</span>
                                   </div>
                               }/>
                </List>
                {this.state.showEmoji ? <Grid
                    data={emoji}
                    columnNum={9}
                    carouselMaxRow={4}
                    isCarousel={true}
                    onClick={el => {
                        this.setState({
                            text: this.state.text + el.text
                        })
                    }}
                /> : null}
            </div>
        </div>
    }
}

export default Chat
