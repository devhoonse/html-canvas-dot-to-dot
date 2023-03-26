var canvas = document.getElementById('myCanvas');

// returns a drawing context on the canvas,
// or null if the context identifier is not supported,
// or the canvas has already been set to a different context mode.
var context = canvas.getContext('2d');

/* -------------------------------------------
  Example : 선 이어 그리기 게임
 -------------------------------------------*/

// DOM 요소들
var image = document.getElementById('image'); // 초기 이미지 요소

// 게임 상태관리
var startLocation = { // 이전에 찍은 점의 좌표, 현재 그려야 할 직선의 시작 지점
  x: 0, //
  y: 0
};
var arrayCoordinates = []; // 지금까지 찍어온 점들의 좌표 목록
var totalPoints = 31; // 총 찍어야 하는 점의 갯수

// 완성된 이미지
var finishImage = new Image();
finishImage.src = 'images/dottodot_airplane_finish.png';

// 캔버스에 초기 이미지를 그리기
context.drawImage(image, 0, 0);

// 캔버스 내부를 클릭하면 발생하는 동작
context.canvas.addEventListener('click', function (event) {

  // 이미 총 포인트 갯수만큼 직선을 이어 그렸다면, 더 이상 게임을 진행시키지 않는다.
  if (arrayCoordinates.length >= totalPoints) return;

  // 곡선의 각 점을 중심으로 하는 원을 그릴 때 사용할 반지름 길이 값
  const pointRadius = 8;

  // 마우스가 클릭된 지점의 위치 좌표 파악
  const { clientX, clientY } = event; // 문서 내에서의 X, Y 좌표
  const { offsetLeft, offsetTop } = context.canvas; // 문서 내에서의 캔버스 위치
  const mouseX = clientX - offsetLeft; // 캔버스 내에서의 상대적 위치 X 좌표
  const mouseY = clientY - offsetTop; // 캔버스 내에서의 상대적 위치 Y 좌표

  // 곡선의 출발점과 도착점을 설정한다.
  if (arrayCoordinates.length === 0) { // 그리기를 처음 시작하는 경우에 대한 처리 방법
    startLocation.x = mouseX; // 시작 지점의 X 좌표를 기록한다.
    startLocation.y = mouseY; // 시작 지점의 Y 좌표를 기록한다.
    context.beginPath(); // 곡선 그리기를 시작한다.
    context.moveTo(startLocation.x, startLocation.y); // 곡선의 시작 지점을 설정한다.
  } else { // 처음 시작하는 게 아니면 처리 방법
    context.moveTo(startLocation.x, startLocation.y); // 이전에 찍은 점의 좌표에서 출발하여
    context.lineTo(mouseX, mouseY); // 현재 클릭한 점의 좌표로 도착하는 곡선을 그린다.
    // 현재 클릭한 점의 좌표는, 다음 곡선의 출발지점이다.
    startLocation.x = mouseX; // 다음 곡선의 출발 지점 X 좌표를 현재 클릭한 점의 X 좌표로 설정한다.
    startLocation.y = mouseY; // 다음 곡선의 출발 지점 X 좌표를 현재 클릭한 점의 Y 좌표로 설정한다.
  }
  context.stroke(); // 설정된 곡선의 출발점과 도착점 설정대로 선을 이어 그린다.

  // 현재 찍은 점 위치를 중심으로 하는 작은 원을 그린다.
  context.beginPath();
  context.arc(mouseX, mouseY, pointRadius, 0, 2*Math.PI);
  context.fillStyle = 'yellow';
  context.fill();
  context.stroke();

  // 현재 찍은 점 근처에 몇 번째로 찍은 점인지 번호를 적어 준다.
  const arrayCoordinatesCount = arrayCoordinates.length + 1;
  context.font = 'normal bold 8px Arial, sans-serif';
  context.fillStyle = '#000000';
  context.fillText(`${arrayCoordinatesCount}`, mouseX - 3, mouseY + 4);

  // 지금까지 곡선을 그리면서 지나온 지점들의 좌표에 현재 좌표를 추가한다.
  arrayCoordinates.push({
    x: mouseX,
    y: mouseY
  });

  //
  if (arrayCoordinates.length === totalPoints) {
    alert('Well Done!');
    drawFinishImage();
  }
});

/**
 * 모든 선을 이어 붙이고 완성된 비행기 이미지를 캔버스에 그립니다.
 */
function drawFinishImage() {
  context.drawImage(finishImage, 0, 0);
}
