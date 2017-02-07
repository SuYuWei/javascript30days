const speed = document.querySelector(".speed");
const volume = document.querySelector(".volume");
const video = document.querySelector("video");
const speedBar = document.querySelector(".speed-bar");
const volumeBar = document.querySelector(".volume-bar");

function handleSpeedMove(e) {
  const y = e.pageY - this.offsetTop;
  const percent = y / this.offsetHeight;
  const min = 0.4;
  const max = 4;
  const height = Math.round(percent * 100) + '%';
  const playbackRate = percent * (max - min) + min;
  // console.log(playbackRate);
  speedBar.style.height = height;
  speedBar.textContent = playbackRate.toFixed(1) + '×';
  video.playbackRate = playbackRate;
}

function handleVolumeMove(e) {
  const y = e.pageY - this.offsetTop;
  const percent = y / this.offsetHeight;
  const min = 0;
  const max = 1;
  const height = Math.round(percent * 100) + '%';
  const playVolume = percent * (max - min) + min;
  console.log(y);
  volumeBar.style.height = height;
  volumeBar.textContent = playVolume.toFixed(1);
  video.volume = playVolume;
}


speed.addEventListener('mousemove',handleSpeedMove);
volume.addEventListener('mousemove',handleVolumeMove);