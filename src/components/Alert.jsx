function Alert({alertMessage, color}){
    return (
        <div className={color}>
            <p>{alertMessage}</p>
        </div>
    );
}

export default Alert;