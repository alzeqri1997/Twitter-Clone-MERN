import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchMessages, removeMessage } from '../store/actions/messages';
import MessageItem from "../components/MessageItem";



class Messagelist extends Component {
    componentDidMount() {
        this.props.fetchMessages();
    }

    render() {
        const { messages, removeMessage, currentUser } = this.props;
        let messageList = messages.map( m => ( // m = message
            <MessageItem
                key={m._id}
                date={m.createAt}
                text={m.text}
                username={m.user.username}
                profileImageUrl={m.user.profileImageUrl}
                removeMessage={removeMessage.bind(this, m.user._id, m._id)}
                isCorrectUser={currentUser === m.user._id}
            />
        ));
        return (
            <div className="rew col-sm-8" >
                <ul className="list-group" id="messages">
                    {messageList}
                </ul>
            </div>
        );
    }


}

function mapStateToProps(state) {
    return {
        messages: state.messages,
        currentUser: state.currentUser.user._id
    }
}


export default connect(mapStateToProps, { fetchMessages, removeMessage })(Messagelist);