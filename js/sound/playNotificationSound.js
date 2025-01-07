export function playNotificationSound() {
    const audioContext = new (window.AudioContext ||
        window.webkitAudioContext)();
    fetch("notification3.mp3")
        .then((response) => response.arrayBuffer())
        .then((buffer) => audioContext.decodeAudioData(buffer))
        .then((decodedData) => {
            const source = audioContext.createBufferSource();
            source.buffer = decodedData;
            source.connect(audioContext.destination);
            source.start(0);
        })
        .catch((error) => {
            console.warn("Audio playback failed:", error);
        });
}
