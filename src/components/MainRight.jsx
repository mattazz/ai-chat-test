function MainRight({ userMessages, aiMessages }) {
    const conversation = [];

    for (let i = 0; i < userMessages.length || i < aiMessages.length; i++) {
        if (i < userMessages.length) {
        conversation.push({ speaker: 'User', message: userMessages[i] });
    }
    if (i < aiMessages.length) {
        conversation.push({ speaker: 'AI', message: aiMessages[i] });
    }
    }
    return (
    <div className="main-right">
        <ul>
            {conversation.map((entry, index) => {
            return (
            <p className={`chat-bubble ${entry.speaker.toLowerCase()}-bubble`} key={index}>
                {entry.speaker}: {entry.message}
                </p>
            );
            })}
        </ul>
        </div>
    );
}

export default MainRight;
