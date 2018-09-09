import React from 'react'
import {Card, WhiteSpace, WingBlank} from 'antd-mobile'
import {connect} from 'react-redux'
import {getUserList} from '../../redux/chartuser'
@connect(
    state=>state.chatuser,
    {getUserList}
)
class Boss extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            data: []
        }
    }

    componentDidMount() {
        this.props.getUserList('boss')
    }

    render() {
        const Header = Card.Header
        const Body = Card.Body
        return <div>
            <WingBlank>
                <WhiteSpace/>
                {this.props.userlist.map(v => (
                    v.avatar ? (<Card key={v._id}>
                        <Header
                            title={v.user}
                            thumb={require(`../img/${v.avatar}.png`)}
                            extra={<span>{v.title}</span>}/>
                        <Body>
                        {v.type === 'boss' ? <div>公司:{v.company}</div> : null}

                        {v.desc.split('\n').map(d => (
                            <div key={d}>{d}</div>
                        ))}
                        {v.type === 'boss' ? <div>薪资:{v.money}</div> : null}
                        </Body>
                    </Card>) : null

                ))}
            </WingBlank>
        </div>
    }
}

export default Boss