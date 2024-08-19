let progress = document.getElementById('progress');
let song = document.getElementById('song');
let ctrlIcon = document.getElementById('play');
let playPauseBtn = document.getElementById('playPause'); 
let isDragging = false;
let previousBtn = document.getElementById('previous');
let nextBtn = document.getElementById('next');
let songTitle = document.querySelector('.musicPlayer h2');
let songArtist = document.querySelector('.musicPlayer p');
let songImg = document.querySelector('.songImg');

const playlist = [
    {
        src: 'Audios/ss.mp3',
        title: 'SS',
        artist: 'Ken Carson',
        cover: 'Imgs/chaos.jpg',
    },
    {
        src: 'Audios/Mindless Self Indulgence3S.mp3',
        title: '3S',
        artist: 'Mindless Self Indulgence',
        cover: 'Imgs/msi.png'
    },
    {
        src: 'Audios/Dead n Gone.mp3',
        title: 'Dead N Gone',
        artist: 'Luci4',
        cover: 'Imgs/dead.jpg'
    }
];

let currentSongIndex = 0;

song.onloadedmetadata = function() {
    progress.max = song.duration;
};

playPauseBtn.addEventListener('click', function() {
    if (song.paused) {
        song.play();
        ctrlIcon.src = 'Imgs/pause.png';   
    } else {
        song.pause();
        ctrlIcon.src = 'Imgs/play.png';   
    }
});

song.addEventListener('timeupdate', function() {
    if (!isDragging) {
        progress.value = song.currentTime;
    }
});

progress.addEventListener('input', function() {
    song.currentTime = progress.value;
});

progress.addEventListener('mousedown', function() {
    isDragging = true;
});

progress.addEventListener('mouseup', function() {
    isDragging = false;
    song.currentTime = progress.value;   
});

progress.addEventListener('mousemove', function(e) {
    if (isDragging) {
        let rect = progress.getBoundingClientRect();
        let percent = (e.clientX - rect.left) / rect.width;
        song.currentTime = percent * song.duration;
    }
});

function loadSong(index) {
    song.src = playlist[index].src;
    songTitle.textContent = playlist[index].title;
    songArtist.textContent = playlist[index].artist;
    songImg.src = playlist[index].cover;
    progress.value = 0;
    song.load();  
}

previousBtn.addEventListener('click', function() {
    currentSongIndex = (currentSongIndex - 1 + playlist.length) % playlist.length;
    loadSong(currentSongIndex);
    song.play();
    ctrlIcon.src = 'Imgs/pause.png'; 
});

nextBtn.addEventListener('click', function() {
    currentSongIndex = (currentSongIndex + 1) % playlist.length;
    loadSong(currentSongIndex);
    song.play();
    ctrlIcon.src = 'Imgs/pause.png'; 
});

// Load the first song when the page loads
loadSong(currentSongIndex);
