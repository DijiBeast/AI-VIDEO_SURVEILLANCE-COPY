objects = [];
objectlength = objects.length;
status1 = "";
objects = "";
function preload()
{
}

function setup()
{
    canvas = createCanvas(500, 500);
    canvas.center();
    video = createCapture(VIDEO);
    video.size(500, 500)
    video.hide();
}

function draw()
{
    image(video, 0, 0, 500, 500);
    if(status1 != "")
    {
        objectDetector.detect(video, gotResults());
        console.log(objectlength);
        for(i=0; i < objectlength; i++)
        {
            document.getElementById("status").innerHTML = "Status : Object Detected!";
            fill("#14e0a7");
            percent = floor(objects[i].confidence*100);
            text(objects[i].label + " " + percent + "%", objects[i].x, objects[i].y);
            noFill();
            stroke("#303028");
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
        }
        if(objects[i].label == text1)
        {
            videoLiveView.stop()
            objectDetector.detect(gotResults);
            document.getElementById("number").innerHTML = text1 + " Found";
        }
        else
        {
            document.getElementById("number").innerHTML = text1 + " Not Found"; 
        }
    }
}

function start()
{
    objectDetector = ml5.objectDetector("cocossd", modelLoaded);
    document.getElementById("status").innerHTML = "Status: Detecting Objects";
    text1 = document.getElementById("input").value;
}

function modelLoaded()
{
    console.log("cocossd Model Loaded!");
    status1 = true;
}

function gotResults(results)
{
    console.log(results);
    objects = results;
}