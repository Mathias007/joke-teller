const audioElement = document.getElementById("audio");
const button = document.getElementById("button");

// Disable/Enable Button
function toggleButton() {
    button.disabled = !button.disabled;
}

// Passing Joke to VioceRSS API
function tellMe(joke) {
    console.log("tell me:", joke);
    const jokeString = joke.trim().replace(/ /g, "%20");
    VoiceRSS.speech({
        key: "850db4c8cbe741109d76871678da9843",
        src: jokeString,
        hl: "en-us",
        v: "Linda",
        r: 0,
        c: "mp3",
        f: "44khz_16bit_stereo",
        ssml: false,
    });
}

// Get Jokes from Joke API
async function getJokes() {
    let joke = "";
    const apiUrl =
        "https://v2.jokeapi.dev/joke/Programming?blacklistFlags=nsfw,religious,political,racist,sexist";

    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        if (data.setup) {
            joke = `${data.setup} ... ${data.delivery}`;
        } else {
            joke = data.joke;
        }
        // Text-to-Speech
        tellMe(joke);
        // Disable Button
        toggleButton();
    } catch (error) {
        // Catch Errors Here
        console.log("Whoops", error);
    }
}

// Event Listeners
button.addEventListener("click", getJokes);
audioElement.addEventListener("ended", toggleButton);
