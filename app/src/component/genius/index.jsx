import React from 'react'
import {connect} from 'react-redux'
import {getUserList} from '../../redux/chartuser'
import UserCard from '../userCard/index'

@connect(
    state => state.chatuser,
    {getUserList}
)
class Genius extends React.Component {

    componentDidMount() {
        this.props.getUserList('boss')
    }

    render() {
        return <UserCard userlist={this.props.userlist}/>
    }
}

export default Genius