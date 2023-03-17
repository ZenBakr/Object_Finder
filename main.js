video="";
status="";
objects=[];

function setup()
{
    canvas=createCanvas(450,450);
    canvas.center();
    video=createCapture(VIDEO);
    video.size(450,450);
    video.hide();
}

function start()
{
    objectDetector=ml5.objectDetector('cocossd',modelLoaded);
    document.getElementById("status").innerHTML="Status : Detecting Object";
    object_name=document.getElementById("object_name").value
}

function modelLoaded()
{
    console.log("Model Loaded");
    status=true;
}

function draw()
{
    image(video,0,0,450,450);
    if("?")
    {
        objectDetector.detect(gotResult);
        for(i=0; i<objects.length; i++)
        {
            document.getElementById("status").innerHTML="Detecting Object";
            document.getElementById("If_Found_or_Not").innerHTML="?";
            fill("#0000FF");
            percent=floor(objects[i].confidence*100);
            text(objects[i].label+" "+percent+" %",objects[i].x,objects[i].y);
            noFill();
            stroke("#0000FF");
            rect(objects[i].x,objects[i].y,objects[i].width,objects[i].height);
            if(objects[i].label==object_name)
            {
                video.stop();
                objectDetector.detect(gotResult);
                document.getElementById("If_Found_or_Not").innerHTML=object_name+"is found";
                synth=window.speechSynthesis;
                utterThis=new SpeechSynthesisUtterance(object_name+"is found");
                synth.speak(utterThis);
            }
            else
            {
                document.getElementById("If_FOund_or_Not").innerHTML=object_name+"is not found";
            }
        }
    }
}

function gotResult(error,results)
{
    if(error)
    {
        console.log(error);
    }
    console.log(results);
    objects=results;
}