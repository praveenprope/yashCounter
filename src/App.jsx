import React, { useState, useEffect } from 'react';

const APP = () => {
  const [counter, setCounter] = useState(0);
  const [textValue, setTextValue] = useState('');
  const [message, setMessage] = useState('');
  const [voicesLoaded, setVoicesLoaded] = useState(false);

  // Array of restricted names
  const restrictedNames = ["praveen", "kapil", "yash", "parveen", "perveen"];

  // Load voices once at the start //ok
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
    speech.lang = 'hi-IN';  // You can adjust the language/voice here
    window.speechSynthesis.speak(speech);
  };

  // Check input value and show message if empty
  const checkInputAndSpeak = (action) => {
    if (textValue.trim() === '') {
      setMessage("Please fill the input box");
      return false; // Indicate that input is not valid
    }
    return true; // Indicate that input is valid
  };

  // Increment function with speech
  const inc = () => {
    if (!checkInputAndSpeak("increment")) return; // Validate input

    const newCounter = counter + 1;
    setCounter(newCounter);

    // Speak only on increment
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
    if (!checkInputAndSpeak("decrement")) return; // Validate input

    const newCounter = counter - 1;
    setCounter(newCounter);

    // Speak only on decrement
    if (restrictedNames.includes(textValue.toLowerCase())) {
      speakMessage("Not possible");
    } else {
      speakMessage(newCounter.toString());
    }
  };

  // Handle text input change
  const handleTextChange = (event) => {
    setTextValue(event.target.value);
    setMessage(''); // Clear message when user starts typing
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

  return (
    <>
      <input type="text" value={textValue} onChange={handleTextChange} />
      <button onClick={() => console.log(textValue)}>OK</button>
      <h1>{message}</h1>
      <button onClick={inc}>Increment</button>
      <button onClick={dec}>Decrement</button>
    </>
  );
};

export default APP;
