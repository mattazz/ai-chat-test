import { useState, useEffect, useRef } from 'react';
import { Configuration, OpenAIApi } from 'openai';
import { MainLeft, MainRight } from './'



function Body() {
  const [messages, setMessages] = useState([]);
  const [aiMessages, setAiMessages] = useState([]);
  const [conversation, setConversation] = useState([]);
  const chatWindowRef = useRef(null);

  useEffect(() => {
    chatWindowRef.current.scrollTop = chatWindowRef.current.scrollHeight;
  }, [conversation]);

  async function handleClick(message) {
    setMessages([...messages, message]);
    setConversation([...conversation, { speaker: 'User', message }]);
    console.log(messages);

    const configuration = new Configuration({
      apiKey: import.meta.env.VITE_API_KEY,
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
      <div className="chat-window" ref={chatWindowRef}>
        <MainRight userMessages={messages} aiMessages={aiMessages} conversation={conversation} />
      </div>
      <MainLeft handleClick={handleClick} />
    </div>
  );
}

export default Body;
