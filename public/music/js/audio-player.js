let play = document.getElementById('play');

let audio_player_trackname = document.querySelector('.audio_player_track .name');
let audio_player_trackauthor = document.querySelector('.audio_player_track .author');
let audio_player_tracktime = document.querySelector('.audio_player_track .time');
let audio_player_trackimg = document.querySelector('.audio_player_track .img');


const mixer = document.querySelector(".volume");
function getProgressBar(){
  let value = mixer.value;
  mixer.style.background = `linear-gradient(to right, #fff 0%, #fff ${value.toString()}%, #686868 ${value.toString()}%, #686868 100%)`;
}






play.onclick = () => {
  if (play.src.includes("img/play.png")) {
    play.src = "img/pause.png";
    if (currentAudio) {
      currentAudio.play();
    }
  } else {
    play.src = "img/play.png";
    if (currentAudio) {
      currentAudio.pause();
    }
  }
};

let obj = [
  {
  id: 0,
  name: 'Тёмно-оранжевый закат',
  author: 'Папин Олимпос',
  time: '2:29',
  img: 'img/image2.png',
  track: 'music/Papin_Olimpos_-_Tjomno-oranzhevyjj_zakat_64714980.mp3',
},
  {
  id: 1,
  name: 'Kasandra',
  author: 'Miyagi',
  time: '3:41',
  img: 'img/image2.png',
  track: 'music/test.mp3',
},
  {
  id: 2,
  name: 'Marlboro',
  author: 'Miyagi',
  time: '3:41',
  img: 'img/image2.png',
  track: 'music/Miyagi_-_Marlboro_65373356.mp3',
}
];

function renderAudios(obj) {
  const list = document.querySelector(".track_list .list");
  for (let itemKey in obj) {
    const item = obj[itemKey];
    const create = document.createElement("div");
    create.innerHTML = `<div class="item" data-track-key="${itemKey}">
                                <img src="${item.img}" alt="">
                                <div class="track_props">
                                <div class="wrap">
                                  <p class="name">
                                    ${item.name}
                                  </p>
                                  <p class="author">
                                    ${item.author}
                                  </p>
                                </div>
                                <div class="time">
                                    ${item.time}
                                    </div>
                                    
                                </div>
                          </div>
                </div>`;
    list.appendChild(create);
  }
}

let currentAudio;

function onTrackClick(e) {
  const item = e.target.closest(".item");
  if (!item) return;
  const trackKey = item.dataset.trackKey;

  const audioPlayerTrack = document.querySelector(".audio_player_track");
  const trackImg = audioPlayerTrack.querySelector("img");
  const trackName = audioPlayerTrack.querySelector(".name");
  const trackAuthor = audioPlayerTrack.querySelector(".author");
  const trackTime = audioPlayerTrack.querySelector(".time");

  trackImg.src = obj[trackKey].img;
  trackName.textContent = obj[trackKey].name;
  trackAuthor.textContent = obj[trackKey].author;
  trackTime.textContent = obj[trackKey].time;

  if (currentAudio) {
    if (currentAudio.src.endsWith(obj[trackKey].track)) {
      if (currentAudio.paused) {
        currentAudio.play();
        play.src = "img/pause.png";
      } else {
        currentAudio.pause();
        play.src = "img/play.png";
      }
      return;
    }
    const prevItemSelected = document.querySelector(".list .item.playing");
    if (prevItemSelected) prevItemSelected.classList.remove("playing");
    currentAudio.pause();
    currentAudio.currentTime = 0;
  }

  item.classList.add("playing");

  currentAudio = new Audio(obj[trackKey].track);
  currentAudio.play();
  play.src = "img/pause.png";
  currentAudio.addEventListener("ended", playNextTrack);
}


function playNextTrack() {
  const playingItem = document.querySelector(".list .item.playing");
  if (!playingItem) return;

  let currentTrackKey = parseInt(playingItem.dataset.trackKey, 10);
  let nextTrackKey = currentTrackKey + 1;
  const nextItem = document.querySelector(`.item[data-track-key="${nextTrackKey}"]`);

  if (nextItem) {
    nextItem.dispatchEvent(new Event("click"));
  } else {
    playingItem.classList.remove("playing");
    play.src = "img/play.png";
    currentAudio.pause();
    currentAudio.currentTime = 0;
  }
}




document.querySelector(".track_list .list").addEventListener("click", onTrackClick);

renderAudios(obj);

