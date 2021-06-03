var video = document.querySelector("#videoElement");
var strBtn = document.querySelector("#startButton");
var stpBtn = document.querySelector("#stopButton");
var stTime = 0;
var endTime = 0;
var timerStart;
var hour;
var min;
var sec;



function strBtnEvent(event){ 
  if (navigator.mediaDevices.getUserMedia) {
    navigator.mediaDevices.getUserMedia({ video: true })
      .then(function (stream) {
        video.srcObject = stream;
      })
      .catch(function (err0r) {
        console.log("Something went wrong!");
      });
  }
  if (!stTime) {
    stTime = Date.now() // 처음 시작할 때
} else {
    stTime += (Date.now() - endTime) // 재시작할 때
}
  timerStart = setInterval(function () {
      var nowTime = new Date(Date.now() - stTime);
      hour = addZero(nowTime.getHours() - 9);
      min = addZero(nowTime.getMinutes());
      sec = addZero(nowTime.getSeconds());
      document.getElementById('postTestHour').innerText = hour;
      document.getElementById('postTestMin').innerText = min;
      document.getElementById('postTestSec').innerText = sec;
  }, 1)
}

function stpBtnEvent(event){
  var stream = video.srcObject;
  var tracks = stream.getTracks();

  for (var i = 0; i < tracks.length; i++) {
    var track = tracks[i];
    track.stop();
  }

  video.srcObject = null;
  
  if (timerStart) {
    clearInterval(timerStart)
    endTime = Date.now() // STOP시점의 시간 저장
}}

function addZero(num) {
  return (num < 10 ? '0' + num : '' + num)
}

strBtn.addEventListener('click', strBtnEvent);
stpBtn.addEventListener('click', stpBtnEvent);