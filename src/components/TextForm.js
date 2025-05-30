import React, { useState } from 'react';

export default function TextForm(props) {
    const [text, setText] = useState('');
    const [utterance, setUtterance] = useState(null); // State to hold the utterance object

    const handleUpClick = () => {
        let newText = text.toUpperCase();
        setText(newText);
        props.showAlert("Converted to uppercase!", "success");
    }

    const handleLoClick = () => { 
        let newText = text.toLowerCase();
        setText(newText);
        props.showAlert("Converted to lowercase!", "success");
    }

    const handleClearClick = () => { 
        let newText = '';
        setText(newText);
        props.showAlert("Text Cleared!", "success");
        stopSpeaking(); // Stop any speaking when clearing text
    }

    const handleOnChange = (event) => {
        setText(event.target.value);
    }

    const handleCopy = () => {
        navigator.clipboard.writeText(text); 
        props.showAlert("Copied to Clipboard!", "success");
    }

    const handleExtraSpaces = () => {
        let newText = text.split(/[ ]+/);
        setText(newText.join(" "));
        props.showAlert("Extra spaces removed!", "success");
    }

    // Start speaking
    const handleTextToSpeech = () => {
        if (utterance) {
            speechSynthesis.cancel(); // Cancel any ongoing speech
        }
        const newUtterance = new SpeechSynthesisUtterance(text);
        setUtterance(newUtterance);
        speechSynthesis.speak(newUtterance);
        props.showAlert("Playing text...", "success");
    }

    // Pause the speech
    const handlePause = () => {
        speechSynthesis.pause();
        props.showAlert("Speech paused.", "success");
    }

    // Resume the speech
    const handleResume = () => {
        speechSynthesis.resume();
        props.showAlert("Speech resumed.", "success");
    }

    // Stop the speech
    const stopSpeaking = () => {
        speechSynthesis.cancel();
        setUtterance(null); // Clear the utterance reference
        props.showAlert("Speech stopped.", "success");
    }

    return (
        <>
            <div className="container" style={{ color: props.mode === 'dark' ? 'white' : '#042743' }}> 
                <h1 className='mb-4'>{props.heading}</h1>
                <div className="mb-3"> 
                    <textarea 
                        className="form-control" 
                        value={text} 
                        onChange={handleOnChange} 
                        style={{ backgroundColor: props.mode === 'dark' ? '#13466e' : 'white', color: props.mode === 'dark' ? 'white' : '#042743' }} 
                        id="myBox" 
                        rows="8"
                    ></textarea>
                </div>
                <button disabled={text.length === 0} className="btn btn-primary mx-1 my-1" onClick={handleUpClick}>Convert to Uppercase</button>
                <button disabled={text.length === 0} className="btn btn-primary mx-1 my-1" onClick={handleLoClick}>Convert to Lowercase</button>
                <button disabled={text.length === 0} className="btn btn-primary mx-1 my-1" onClick={handleClearClick}>Clear Text</button>
                <button disabled={text.length === 0} className="btn btn-primary mx-1 my-1" onClick={handleCopy}>Copy Text</button>
                <button disabled={text.length === 0} className="btn btn-primary mx-1 my-1" onClick={handleExtraSpaces}>Remove Extra Spaces</button>
                <button disabled={text.length === 0} className="btn btn-primary mx-1 my-1" onClick={handleTextToSpeech}>Speak Text</button>
                <button disabled={text.length === 0} className="btn btn-secondary mx-1 my-1" onClick={handlePause}>Pause</button>
                <button disabled={text.length === 0} className="btn btn-secondary mx-1 my-1" onClick={handleResume}>Resume</button>
                <button disabled={text.length === 0} className="btn btn-danger mx-1 my-1" onClick={stopSpeaking}>Stop</button>
            </div>
            <div className="container my-3" style={{ color: props.mode === 'dark' ? 'white' : '#042743' }}>
                <h2>Your text summary</h2>
                <p>{text.split(/\s+/).filter((element) => { return element.length !== 0 }).length} words and {text.length} characters</p>
                <p>{0.008 * text.split(/\s+/).filter((element) => { return element.length !== 0 }).length} Minutes read</p>
                <h2>Preview</h2>
                <p>{text.length > 0 ? text : "Nothing to preview!"}</p>
            </div>
        </>
    );
}
