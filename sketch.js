let video;

let bodyPose;
let poses = [];

function preload() {
  bodyPose = ml5.bodyPose("MoveNet", { flipped: true });
}

function mousePressed() {
  console.log(poses);
}
function gotPoses(results) {
  poses = results;
}

function setup() {
  createCanvas(640, 480);
  video = createCapture(VIDEO, { flipped: true });
  video.hide();

  bodyPose.detectStart(video, gotPoses);
}

function draw() {
  image(video, 0, 0);

  if (poses.length > 0) {
    let pose = poses[0];

    let x = pose.nose.x;
    let y = pose.nose.y;

    fill(255, 0, 0);
    circle(x, y, 20);

    for (let i = 1; i < pose.keypoints.length; i++) {
      let keypoint = pose.keypoints[i];
      if (keypoint.confidence > 0.2) {
        fill(0, 0, 255);
        circle(keypoint.x, keypoint.y, 12);
      }
    }
  }
}
