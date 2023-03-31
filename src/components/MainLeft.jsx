import { useState } from "react"

function MainLeft({handleClick}){
    const [message, setMessage] = useState('')
    const [messages, setMessages] = useState([])

    function handleSubmit(e){
        e.preventDefault();
        handleClick(message);
        setMessage('');
    }

    function handleChange(e){
        setMessage(e.target.value)
        // console.log(message);
    }

    return (
        <div className="main-left">
            {/* <h1 className="chat-heading">Chat</h1> */}
            <form action="" onSubmit={handleSubmit}>
                <input className="input-box" type="text" value={message} onChange={handleChange} autoFocus />
                <button className="send-button" type="submit">Send</button>
            </form>
        </div>
    )
}

export default MainLeft;