song1 = "";
song2 = "";
leftWristX = 0;
leftWristY = 0;
rightWristX = 0;
rightWristY = 0;
scoreleftWrist = 0;
scorerightWrist = 0;
song_1 = "";
song_2 = "";

function setup(){
    canvas = createCanvas(600,530);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}

function gotPoses(results){
    if(results.length > 0){
        console.log(results);

        scoreleftWrist = results[0].pose.keypoints[9].score;
        console.log(scoreleftWrist);

        scorerightWrist = results[0].pose.keypoints[10].score;
        console.log(scorerightWrist);

        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        console.log("leftWristX = " + leftWristX + "leftWristY = " + leftWristY);

        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        console.log("rightWristX = " + rightWristX + "rightWristY = " + rightWristY);


    }
}

function modelLoaded(){
    console.log('PoseNet is Initialized');
}


function preload(){
    song1 = loadSound("Believer.mp3");
    song2 = loadSound("Bones.mp3");
}

function draw(){
    image(video,0,0,600,530);

    fill("#00ff00");
    stroke("#ff0000");

    song_1 = song1.isPlaying();
    console.log(song_1);

    song_2 = song2.isPlaying();
    console.log(song_2);

    if(scoreleftWrist > 0.2){
        circle(leftWristX,leftWristY,20);
        song2.stop();
        if(song_1 == false){
            song1.play();
        }
        else{
            console.log("Song Name: Believer Song");
            document.getElementById("song_id").innerHTML = "Song Name: Believer Song";
        }
    }

    if(scorerightWrist > 0.2){
        circle(rightWristX,rightWristY,20);
        song1.stop();
        if(song_2 == false){
            song2.play();
        }
        else{
            console.log("Song Name: Harry Potter Theme Song");
            document.getElementById("song_id").innerHTML = "Song Name: Harry Potter Theme Song";
        }
    }

}

function play(){
    song1.play();
    song2.play();
}