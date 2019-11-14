const speak = text => new Promise(resolve => {
    const msg = new SpeechSynthesisUtterance(text);
    window.speechSynthesis.speak(msg);
    resolve()
});

export default {
    speak
}