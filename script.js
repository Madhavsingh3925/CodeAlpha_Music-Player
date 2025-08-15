const songs = [
    { title: "Song One", artist: "Artist One", src: "music/song1.mp3" },
    { title: "Song Two", artist: "Artist Two", src: "music/song2.mp3" },
    { title: "Song Three", artist: "Artist Three", src: "music/song3.mp3" }
];

let songIndex = 0;
const audio = document.getElementById('audio');
const title = document.getElementById('title');
const artist = document.getElementById('artist');
const playBtn = document.getElementById('play');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const progress = document.getElementById('progress');
const progressContainer = document.getElementById('progress-container');
const currentTimeEl = document.getElementById('current-time');
const durationEl = document.getElementById('duration');
const volumeControl = document.getElementById('volume');

function loadSong(song) {
    title.textContent = song.title;
    artist.textContent = song.artist;
    audio.src = song.src;
}

function playSong() {
    audio.play();
    playBtn.innerHTML = '&#10074;&#10074;'; // pause icon
}

function pauseSong() {
    audio.pause();
    playBtn.innerHTML = '&#9654;'; // play icon
}

playBtn.addEventListener('click', () => {
    if (audio.paused) {
        playSong();
    } else {
        pauseSong();
    }
});

nextBtn.addEventListener('click', nextSong);
prevBtn.addEventListener('click', prevSong);

function nextSong() {
    songIndex = (songIndex + 1) % songs.length;
    loadSong(songs[songIndex]);
    playSong();
}

function prevSong() {
    songIndex = (songIndex - 1 + songs.length) % songs.length;
    loadSong(songs[songIndex]);
    playSong();
}

audio.addEventListener('timeupdate', updateProgress);

function updateProgress(e) {
    const { duration, currentTime } = e.srcElement;
    const progressPercent = (currentTime / duration) * 100;
    progress.style.width = progressPercent + '%';

    let mins = Math.floor(currentTime / 60);
    let secs = Math.floor(currentTime % 60);
    if (secs < 10) secs = '0' + secs;
    currentTimeEl.textContent = `${mins}:${secs}`;

    if (duration) {
        let dMins = Math.floor(duration / 60);
        let dSecs = Math.floor(duration % 60);
        if (dSecs < 10) dSecs = '0' + dSecs;
        durationEl.textContent = `${dMins}:${dSecs}`;
    }
}

progressContainer.addEventListener('click', setProgress);

function setProgress(e) {
    const width = this.clientWidth;
    const clickX = e.offsetX;
    const duration = audio.duration;
    audio.currentTime = (clickX / width) * duration;
}

volumeControl.addEventListener('input', (e) => {
    audio.volume = e.target.value;
});

audio.addEventListener('ended', nextSong); // autoplay next

// Init
loadSong(songs[songIndex]);
