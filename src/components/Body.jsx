import { useState, useEffect, useRef } from 'react';
import { Configuration, OpenAIApi } from 'openai';
import { MainLeft, MainRight, Alert } from './'

var api_key = '';



function Body() {
  // For messaging system
  const [messages, setMessages] = useState([]);
  const [aiMessages, setAiMessages] = useState([]);
  const [conversation, setConversation] = useState([]);
  const [key_set, setKeySet] = useState(false);
  // For alert
  const [alertMessage, setAlertMessage] = useState('')
  const [alertColor, setAlertColor] = useState('white')
  // Doesn't work, whatever
  const chatWindowRef = useRef(null);

  function applyAPI(e) {
    e.preventDefault();
    api_key = e.target[0].value;
    console.log('API: ' + api_key);

    const configuration = new Configuration({
      apiKey:  api_key,
      organization: 'org-YqkSoqf18JKiZxGkdJpc0NSW',
    })

    const openai = new OpenAIApi(configuration);
    const aiResponse = openai.listModels().then((response) => {
      setKeySet(true);  
      setAlertMessage('Key set. Ready to go!');
      setAlertColor('green');
      document.getElementById('api-button').classList.add('hide')
      document.getElementById('api-input').classList.add('hide')
    }).catch((error) => {
      setKeySet(true);
      setAlertMessage('Invalid API Key. Please try again.');
      setAlertColor('red');
    })
  }

  useEffect(() => {
    chatWindowRef.current.scrollTop = chatWindowRef.current.scrollHeight;
  }, [conversation]);

  async function handleClick(message) {
    setMessages([...messages, message]);
    setConversation([...conversation, { speaker: 'User', message }]);
    console.log(messages);

    const configuration = new Configuration({
      apiKey:  api_key,
      organization: 'org-YqkSoqf18JKiZxGkdJpc0NSW',
    });
    const openai = new OpenAIApi(configuration);
    const aiResponse = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: message,
      max_tokens: 200,
      temperature: 0.7,
    }).then((response) => {
      console.log(response.data.choices[0].text);
      setAiMessages([...aiMessages, response.data.choices[0].text]);
      setConversation([...conversation, { speaker: 'AI', message: response.data.choices[0].text }]);
    }).catch((error) => {
      console.log(error);
    });
  }

  return (
    <div className="main-body">
      <h1 className="chat-heading">AI Chat</h1>
      <form action="" onSubmit={applyAPI}>
        <input id='api-input' className='input-box' type="password" placeholder='Input your API Key here' />
        <button className='send-button' id='api-button'>Submit</button>
        {key_set ? <Alert alertMessage={alertMessage} color={alertColor} /> : null}
      </form>
      <div className="chat-window" ref={chatWindowRef}>
        <MainRight userMessages={messages} aiMessages={aiMessages} conversation={conversation} />
      </div>
      <MainLeft handleClick={handleClick} />
    </div>
  );
}

export default Body;
