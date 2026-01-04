  const songs = [
    { title: "Tum se", artist: "Outstation", src: "Tum Se.mp3" },
    { title: "Regardless", artist: "Asim Azhar", src: "REGARDLESS.mp3" },
    { title: "Naazni", artist: "Aashir Wajahat", src: "Naazni.mp3" }
  ];

  const audio = document.getElementById("audio");
  const title = document.getElementById("title");
  const artist = document.getElementById("artist");
  const playBtn = document.getElementById("play");
  const prevBtn = document.getElementById("prev");
  const nextBtn = document.getElementById("next");
  const progress = document.getElementById("progress");
  const progressContainer = document.getElementById("progress-container");
  const currentTimeEl = document.getElementById("current-time");
  const durationEl = document.getElementById("duration");
  const volumeSlider = document.getElementById("volume");
  const playlistEl = document.getElementById("playlist");

  let songIndex = 0;
  let isPlaying = false;

  function loadSong(index) {
    const song = songs[index];
    title.textContent = song.title;
    artist.textContent = song.artist;
    audio.src = song.src;
  }

  function playSong() {
    audio.play();
    isPlaying = true;
    playBtn.textContent = "⏸";
  }

  function pauseSong() {
    audio.pause();
    isPlaying = false;
    playBtn.textContent = "▶";
  }

  playBtn.addEventListener("click", () => {
    isPlaying ? pauseSong() : playSong();
  });

  prevBtn.addEventListener("click", () => {
    songIndex = (songIndex - 1 + songs.length) % songs.length;
    loadSong(songIndex);
    playSong();
  });

  nextBtn.addEventListener("click", () => {
    songIndex = (songIndex + 1) % songs.length;
    loadSong(songIndex);
    playSong();
  });

  audio.addEventListener("timeupdate", () => {
    const { currentTime, duration } = audio;
    progress.style.width = (currentTime / duration) * 100 + "%";

    currentTimeEl.textContent = formatTime(currentTime);
    durationEl.textContent = formatTime(duration);
  });

  progressContainer.addEventListener("click", (e) => {
    const width = progressContainer.clientWidth;
    const clickX = e.offsetX;
    audio.currentTime = (clickX / width) * audio.duration;
  });

  volumeSlider.addEventListener("input", () => {
    audio.volume = volumeSlider.value;
  });

  audio.addEventListener("ended", () => {
    nextBtn.click(); // autoplay
  });

  function formatTime(time) {
    if (isNaN(time)) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60).toString().padStart(2, "0");
    return `${minutes}:${seconds}`;
  }

  // Playlist
  songs.forEach((song, index) => {
    const li = document.createElement("li");
    li.textContent = `${song.title} - ${song.artist}`;
    li.addEventListener("click", () => {
      songIndex = index;
      loadSong(songIndex);
      playSong();
    });
    playlistEl.appendChild(li);
  });

  loadSong(songIndex);
  volumeSlider.value = 0.5;
  audio.volume = 0.5;
