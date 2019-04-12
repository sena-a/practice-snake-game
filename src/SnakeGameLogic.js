import { ROWS, COLS } from "./config";

// NOTE: ROWS, COLS에는 행의 개수, 열의 개수가 저장되어 있습니다.
// 이 변수를 활용해서 코드를 작성하세요!

function SnakeGameLogic() {
  // 각 마디의 좌표를 저장하는 배열
  // 배열 앞쪽이 머리, 뒷쪽이 꼬리
  this.joints = [{ x: 2, y: 0 }, { x: 1, y: 0 }, { x: 0, y: 0 }];

  // 먹이의 좌표
  this.fruit = { x: 3, y: 5 };

  // 내가 지금 어느 방향을 바라보고 있는지에 대한 상태
  this.direction = "right";
}

// 키보드 클릭시 해당 키보드 이벤트로 실행되는 함수
SnakeGameLogic.prototype.up = function() {
  // 방향 상태 변경
  this.direction = "up";
};

SnakeGameLogic.prototype.down = function() {
  // 방향 상태 변경
  this.direction = "down";
};

SnakeGameLogic.prototype.left = function() {
  // 방향 상태 변경
  this.direction = "left";
};

SnakeGameLogic.prototype.right = function() {
  // 방향 상태 변경
  this.direction = "right";
};

SnakeGameLogic.prototype.nextState = function() {
  // 한 번 움직여야 할 타이밍마다 실행되는 함수
  // 게임이 아직 끝나지 않았으면 `true`를 반환
  let newHead;
  if (this.direction === "right") {
    newHead = {
      x: this.joints[0].x + 1,
      y: this.joints[0].y
    };
  } else if (this.direction === "left") {
    newHead = {
      x: this.joints[0].x - 1,
      y: this.joints[0].y
    };
  } else if (this.direction === "up") {
    newHead = {
      x: this.joints[0].x,
      y: this.joints[0].y - 1
    };
  } else if (this.direction === "down") {
    newHead = {
      x: this.joints[0].x,
      y: this.joints[0].y + 1
    };
  }
  // this.joints.unshift(newHead) 위치 변경!
  // 먹이의 좌표와 현재 머리 위치가 동일하면
  // 먹이를 안먹었을 때 뱀 길이 늘림
  if (newHead.x !== this.fruit.x || newHead.y !== this.fruit.y) {
    // 먹이를 안먹었을 때 꼬리 한칸 씩 없애기 - 길이 고정
    this.joints.pop();
  } else {
    // 먹이를 먹었을 때 먹이 새로 생성 + 꼬리 없애지 않기 - 길이 한 칸 씩 추가
    this.fruit.x = Math.floor(Math.random() * COLS);
    this.fruit.y = Math.floor(Math.random() * ROWS);
  }
  // 벽에 부딪혔을 때 false 반환 - 게임 종료
  if (
    newHead.x < 0 ||
    newHead.x >= COLS ||
    newHead.y < 0 ||
    newHead.y >= ROWS
  ) {
    return false;
  }
  // 몸통에 부딪힌 상황 - 게임 종료
  if (this.joints.some(j => j.x === newHead.x && j.y === newHead.y)) {
    return false;
  }

  // for(const j of this.joints){
  //   if(j.x === newHead.x && j.y === newHead.y){
  //     return false
  //   }
  // } 이렇게 하면 게임 시작함과 동시에 게임이 끝남
  // 이미 몸통에 newHead가 있기 때문에 항상 true가 되는 조건문임. = 항상 false가 반환됨.
  // 저 newHead를 몸통에 넣는 걸 이 수식 뒤에 놓으면 됨.

  this.joints.unshift(newHead);
  return true;
};

export default SnakeGameLogic;
