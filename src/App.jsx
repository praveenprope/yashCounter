import React, { useState, useEffect } from 'react';

const APP = () => {
  const [counter, setCounter] = useState(0);
  const [textValue, setTextValue] = useState('');
  const [message, setMessage] = useState('');
  const [voicesLoaded, setVoicesLoaded] = useState(false);

  // Array of restricted names
  const restrictedNames = ["praveen", "kapil", "yash", "parveen", "perveen","ankit"];

  // Load voices once at the start
  useEffect(() => {
    const loadVoices = () => {
      const voices = window.speechSynthesis.getVoices();
      if (voices.length > 0) {
        setVoicesLoaded(true); // Voices are ready to use
      } else {
        // Some browsers require an event listener for voices to load
        window.speechSynthesis.onvoiceschanged = () => setVoicesLoaded(true);
      }
    };
    loadVoices();
  }, []);

  // Function to handle text-to-speech using browser's SpeechSynthesis API
  const speakMessage = (msg) => {
    if (!voicesLoaded) {
      console.log('Voices not loaded yet');
      return;
    }

    const speech = new SpeechSynthesisUtterance(msg);
    speech.lang = 'hi-IN';
    window.speechSynthesis.speak(speech);
  };

  // Check input value and show message if empty
  const checkInputAndSpeak = (action) => {
    if (textValue.trim() === '') {
      setMessage("Please fill the input box");
      return false;
    }
    return true;
  };

  // Increment function with speech
  const inc = () => {
    if (!checkInputAndSpeak("increment")) return;

    const newCounter = counter + 1;
    setCounter(newCounter);

    if (restrictedNames.includes(textValue.toLowerCase())) {
      speakMessage("NOT POSSIBLE");
    } else if (newCounter >= 5) {
      speakMessage(`${textValue} ki gaand maro baar baar`);
    } else {
      speakMessage(newCounter.toString());
    }
  };

  // Decrement function with speech
  const dec = () => {
    if (!checkInputAndSpeak("decrement")) return;

    const newCounter = counter - 1;
    setCounter(newCounter);

    if (restrictedNames.includes(textValue.toLowerCase())) {
      speakMessage("Not possible");
    } else {
      speakMessage(newCounter.toString());
    }
  };

  // Handle text input change
  const handleTextChange = (event) => {
    setTextValue(event.target.value);
    setMessage('');
  };

  // Update message on counter or textValue change
  useEffect(() => {
    let newMessage;

    if (restrictedNames.includes(textValue.toLowerCase())) {
      newMessage = "Not possible";
    } else if (counter < 5) {
      newMessage = counter.toString();
    } else {
      newMessage = `${textValue} ki gaand maro baar baar`;
    }

    setMessage(newMessage);
  }, [counter, textValue]);

  // Inline styles for customization
  const styles = {
    container: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100vh',
      fontFamily: "'Poppins', sans-serif",
      backgroundColor: '#f0f4f8',
      color: '#333',
      padding: '20px'
    },
    input: {
      padding: '10px',
      fontSize: '1.2em',
      borderRadius: '8px',
      border: '1px solid #ccc',
      marginBottom: '20px',
      width: '80%',
      maxWidth: '400px',
    },
    button: {
      padding: '10px 20px',
      fontSize: '1em',
      borderRadius: '8px',
      margin: '5px',
      border: 'none',
      color: '#fff',
      backgroundColor: '#4CAF50',
      cursor: 'pointer',
    },
    message: {
      fontSize: '1.5em',
      fontWeight: 'bold',
      margin: '20px 0',
      // lest go finals
      color: '#333'
    },
  };

  return (
    <div style={styles.container}>
    <h1>The Yash Project</h1>
      <input
        type="text"
        value={textValue}
        onChange={handleTextChange}
        placeholder="Enter your text"
        style={styles.input}
      />
      <button onClick={() => console.log(textValue)} style={styles.button}>OK</button>
      <h1 style={styles.message}>{message}</h1>
      <div>
        <button onClick={inc} style={{ ...styles.button, backgroundColor: '#2196F3' }}>Increment</button>
        <button onClick={dec} style={{ ...styles.button, backgroundColor: '#f44336' }}>Decrement</button>
      </div>
    </div>
  );
};

export default APP;
