function takePicTab()
{
    // tab 1
    var tabBtn = document.getElementById("tab1");
    //console.log(tabBtn.innerText);
    if (tabBtn.className == "active")
    {

    }
    else
    {
        document.getElementsByClassName("active")[0].className = "inactive";
        tabBtn.className = "active";
    }
}

function uploadPicTab()
{
    // tab 2
    var tabBtn = document.getElementById("tab2");
    //console.log(tabBtn.innerText);
    if (tabBtn.className == "active")
    {

    }
    else
    {
        document.getElementsByClassName("active")[0].className = "inactive";
        tabBtn.className = "active";
    }
}

function helpTab()
{
    // tab 3
    var tabBtn = document.getElementById("tab3");
    //console.log(tabBtn.innerText);
    if (tabBtn.className == "active")
    {

    }
    else
    {
        document.getElementsByClassName("active")[0].className = "inactive";
        tabBtn.className = "active";
    }
}