onlyMainClass = false;

function updateInput(){
    checkOnlyMainClass();
    updateAccessLvl();
    updateItemTitle(document.getElementById("inputItemTitle").value, document.getElementById("inputItemSubtitle").value);
    updateOnjectClass();
    updteDisrupionClass();
    updteRiskClass();
    updateOpionalOptions();
}

function checkOnlyMainClass(){
    if (document.getElementById("inputPrimaryObjectClass").value == "0" || (
        document.getElementById("inputDisruptionClass").value == "0" &&
        document.getElementById("inputRiskClass").value == "0"
    )){
        onlyMainClass = true;
        if (!document.getElementById("acsDisRisk").classList.contains("disabled")){
            document.getElementById("acsDisRisk").classList.remove("grid");
            document.getElementById("acsDisRisk").classList.add("disabled");
            document.getElementById("acsObjDisRisk").style.setProperty("grid-template-columns", "auto")
        }
    }
    else{
        onlyMainClass = false;
        if (document.getElementById("acsDisRisk").classList.contains("disabled")){
            document.getElementById("acsDisRisk").classList.add("grid");
            document.getElementById("acsDisRisk").classList.remove("disabled");
            document.getElementById("acsObjDisRisk").style.setProperty("grid-template-columns", "auto auto")
        }
    }
}

function updateItemTitle(title, subtitle){
    if (document.getElementById("acsItemTitleText").innerHTML != title)
        document.getElementById("acsItemTitleText").innerHTML = title;
    if (document.getElementById("acsItemSubtitleText").innerHTML != subtitle)
        document.getElementById("acsItemSubtitleText").innerHTML = subtitle;
}

function updateAccessLvl(){
    let v = parseInt(document.getElementById("inputAccessLevel").value);

    if (v >= 0){
        setAccessLvlText("LEVEL"+v,accessLvl.subtitle[v].toUpperCase(),v,"var("+accessLvl.color[v]+")")
        if (!document.getElementById("accessLevelCustom").classList.contains("disabled"))
            document.getElementById("accessLevelCustom").classList.add("disabled");
        return;
    }

    document.getElementById("accessLevelCustom").classList.remove("disabled");

    switch (document.getElementById("inputAccessLevelLineAppearance").value){
        default:
            if (document.getElementById("inputAccessLevelLineColorCont").classList.contains("disabled"))
                document.getElementById("inputAccessLevelLineColorCont").classList.remove("disabled")
            if (!document.getElementById("inputAccessLevelLineBGImageCont").classList.contains("disabled"))
                document.getElementById("inputAccessLevelLineBGImageCont").classList.add("disabled")
            break;
        case "image":
            if (document.getElementById("inputAccessLevelLineBGImageCont").classList.contains("disabled"))
                document.getElementById("inputAccessLevelLineBGImageCont").classList.remove("disabled")
            if (!document.getElementById("inputAccessLevelLineColorCont").classList.contains("disabled"))
                document.getElementById("inputAccessLevelLineColorCont").classList.add("disabled")
            break;
    }

    setAccessLvlText(document.getElementById("inputAccessLevelTitle").value, 
        document.getElementById("inputAccessLevelSubtitle").value, 
        document.getElementById("inputAccessLevelLines").value, 
        document.getElementById("inputAccessLevelLineColor").value)
}

function setAccessLvlText(title, subtitle, lines, color){
    if (document.getElementById("acsLevelTitleText").innerHTML != title)
        document.getElementById("acsLevelTitleText").innerHTML = title;
    if (document.getElementById("acsLevelSubtitleText").innerHTML != subtitle)
        document.getElementById("acsLevelSubtitleText").innerHTML = subtitle;
    if (lines < 1){
        document.getElementById("acsLevelBarsCont").innerHTML = "";
        return;}
    if (document.getElementById("acsLevelBarsCont").children.length != lines || 
            document.getElementById("acsLevelBarsCont").getElementsByTagName("div")[0].style.getPropertyValue("background-color") != color)
    {
        document.getElementById("acsLevelBarsCont").innerHTML = "";
        for (let i = 0; i < lines; i++){
            document.getElementById("acsLevelBarsCont").innerHTML += "<div class='acsLevelBar' style='background-color: "+color+"'></div>"
        }
    }
}

function updateOnjectClass(){
    let primary = "";
    let color = "";
    let colorSecondary = "";
    let colorTertiary = "";
    let path = "";
    let pathSecondary = "";
    let v = parseInt(document.getElementById("inputPrimaryObjectClass").value);
    let v2 = parseInt(document.getElementById("inputSecondaryObjectClass").value);
    if (v == -1){
        if (document.getElementById("inputPrimaryObjectClassCustomCont").classList.contains("disabled"))
            document.getElementById("inputPrimaryObjectClassCustomCont").classList.remove("disabled");
        primary = document.getElementById("inputPrimaryObjectClassCustom").value;
        color = "black black black "+document.getElementById("inputPrimaryObjectClassColor").value+"";
        colorSecondary = ""+hexToRgbA(document.getElementById("inputPrimaryObjectClassColor").value, .25)+"";
        colorTertiary = ""+document.getElementById("inputPrimaryObjectClassColor").value+"";
    }
    else {
        if (!document.getElementById("inputPrimaryObjectClassCustomCont").classList.contains("disabled"))
            document.getElementById("inputPrimaryObjectClassCustomCont").classList.add("disabled");
        primary = objClass.class[v].toUpperCase();
        color = "black black black var("+objClass.color[v]+")";
        colorSecondary = "var("+objClass.colorSecondary[v]+")";
        colorTertiary = "var("+objClass.colorTertiary[v]+")";
        if (v2 == 0){
            path = objClass.path[v];
        }else{
            pathSecondary = objClass.path[v];
            if (v2 != -1){
                path = objSecondaryClass.path[v2];}
        }
    }
    if (document.getElementById("acsObjectImg").src != path && (v != -1 && v2 != -1))
        document.getElementById("acsObjectImg").src = path;
    if (document.getElementById("acsSecondaryObjectImg").src != pathSecondary && v != -1)
        document.getElementById("acsSecondaryObjectImg").src = pathSecondary;
    if (document.getElementById("acsObjectImageWrapper").style.getPropertyValue("background-color") != colorTertiary)
        document.getElementById("acsObjectImageWrapper").style.setProperty("background-color", colorTertiary);
    
    if (v2 == 0){
        if (document.getElementById("acsSmallObjectImg").src != path && v != -1)
            document.getElementById("acsSmallObjectImg").src = path;
            if (document.getElementById("acsBigObjectImg").src != path && v != -1)
                document.getElementById("acsBigObjectImg").src = path;
        if (!document.getElementById("acsSmallObjectSecondaryImageCont").classList.contains("disabled"))
            document.getElementById("acsSmallObjectSecondaryImageCont").classList.add("disabled");
        if (onlyMainClass){
            if (!document.getElementById("acsSmallObjectImageCont").classList.contains("disabled"))
                document.getElementById("acsSmallObjectImageCont").classList.add("disabled");
            if (!document.getElementById("acsObjectImageCont").classList.contains("disabled"))
                document.getElementById("acsObjectImageCont").classList.add("disabled");
            if (document.getElementById("acsBigObjectImageCont").classList.contains("disabled"))
                document.getElementById("acsBigObjectImageCont").classList.remove("disabled");
        }else{
            if (document.getElementById("acsSmallObjectImageCont").classList.contains("disabled"))
                document.getElementById("acsSmallObjectImageCont").classList.remove("disabled");
            if (document.getElementById("acsObjectImageCont").classList.contains("disabled"))
                document.getElementById("acsObjectImageCont").classList.remove("disabled");
            if (!document.getElementById("acsBigObjectImageCont").classList.contains("disabled"))
                document.getElementById("acsBigObjectImageCont").classList.add("disabled");
        }
    }
    else{
        if (document.getElementById("acsSmallObjectImg").src != pathSecondary && v2 != -1 && v != -1)
            document.getElementById("acsSmallObjectImg").src = pathSecondary;
        if (document.getElementById("acsBigObjectImg").src != pathSecondary)
            document.getElementById("acsBigObjectImg").src = pathSecondary;
        if (document.getElementById("acsSmallObjectSecondaryImageCont").classList.contains("disabled"))
            document.getElementById("acsSmallObjectSecondaryImageCont").classList.remove("disabled");
        if (document.getElementById("acsSmallObjectSecondaryImg").src != path && v2 != -1)
            document.getElementById("acsSmallObjectSecondaryImg").src = path;
        if (document.getElementById("acsSmallObjectImageCont").classList.contains("disabled"))
            document.getElementById("acsSmallObjectImageCont").classList.remove("disabled");
        if (!document.getElementById("acsBigObjectImageCont").classList.contains("disabled"))
            document.getElementById("acsBigObjectImageCont").classList.add("disabled");
        if (document.getElementById("acsObjectImageCont").classList.contains("disabled"))
            document.getElementById("acsObjectImageCont").classList.remove("disabled");
    }
    if (document.getElementById("acsSmallObjectImageWrapper").style.getPropertyValue("background-color") != colorTertiary)
        document.getElementById("acsSmallObjectImageWrapper").style.setProperty("background-color", colorTertiary);
    if (document.getElementById("acsBigObjectImageWrapper").style.getPropertyValue("background-color") != colorTertiary)
        document.getElementById("acsBigObjectImageWrapper").style.setProperty("background-color", colorTertiary);

    if (document.getElementById("acsObjectPrimaryTextTitle").innerHTML != primary)
        document.getElementById("acsObjectPrimaryTextTitle").innerHTML = primary;
    if (document.getElementById("acsObject").style.getPropertyValue("border-color") != color)
        document.getElementById("acsObject").style.setProperty("border-color", color);
    if (document.getElementById("acsObject").style.getPropertyValue("background-color") != colorSecondary)
        document.getElementById("acsObject").style.setProperty("background-color", colorSecondary);
    if (!onlyMainClass){
        if (document.getElementById("top-quad").style.getPropertyValue("background-color") != colorSecondary)
            document.getElementById("top-quad").style.setProperty("background-color", colorSecondary);
    }
    else{
        if (document.getElementById("top-quad").style.getPropertyValue("background-color") != "transparent")
            document.getElementById("top-quad").style.setProperty("background-color", "transparent");
    }

    
    if (v2 == 0 && !document.getElementById("acsObjectSecondaryText").classList.contains("disabled")){
        document.getElementById("acsObjectSecondaryText").classList.add("disabled");
        document.getElementById("acsObjectPrimaryTextSubtitle").classList.remove("em075");
        document.getElementById("acsObjectPrimaryTextTitle").classList.add("em2");
        document.getElementById("acsSecondaryObjectImageWrapper").classList.add("disabled");
        document.getElementById("acsObjectImageBGWrapper").classList.remove("bgblack");
    }
    else if (v2 != 0 && document.getElementById("acsObjectSecondaryText").classList.contains("disabled")){
        document.getElementById("acsObjectSecondaryText").classList.remove("disabled");
        document.getElementById("acsObjectPrimaryTextSubtitle").classList.add("em075");
        document.getElementById("acsObjectPrimaryTextTitle").classList.remove("em2");
        document.getElementById("acsSecondaryObjectImageWrapper").classList.remove("disabled");
        document.getElementById("acsObjectImageBGWrapper").classList.add("bgblack");
    }
    if (v2 == -1){
        if (document.getElementById("inputSecondaryObjectClassCustomCont").classList.contains("disabled"))
            document.getElementById("inputSecondaryObjectClassCustomCont").classList.remove("disabled");
        primary = document.getElementById("inputSecondaryObjectClassCustom").value;
    }
    else {
        if (!document.getElementById("inputSecondaryObjectClassCustomCont").classList.contains("disabled"))
            document.getElementById("inputSecondaryObjectClassCustomCont").classList.add("disabled");
        primary = objSecondaryClass.class[v2].toUpperCase();
    }
    if (document.getElementById("acsObjectSecondaryTextTitle").innerHTML != primary)
        document.getElementById("acsObjectSecondaryTextTitle").innerHTML = primary;
}

function updteDisrupionClass(){
    let primary = "";
    let color = "";
    let colorSecondary = "";
    let colorTertiary = "";
    let path = "";
    let v = parseInt(document.getElementById("inputDisruptionClass").value);
    let l = "";
    if (v == -1){
        if (document.getElementById("inputDisruptionClassCustomCont").classList.contains("disabled"))
            document.getElementById("inputDisruptionClassCustomCont").classList.remove("disabled");
        primary = document.getElementById("inputDisruptionClassCustom").value;
    }
    else {
        if (!document.getElementById("inputDisruptionClassCustomCont").classList.contains("disabled"))
            document.getElementById("inputDisruptionClassCustomCont").classList.add("disabled");
        primary = disruptionClass.class[v].toUpperCase();
        color = "var("+disruptionClass.color[v]+")";
        colorSecondary = "var("+disruptionClass.colorSecondary[v]+")";
        colorTertiary = "var("+disruptionClass.colorTertiary[v]+")";
        path = disruptionClass.path[v];
        l = v;
    }
    if (document.getElementById("acsDisImg").src != path)
        document.getElementById("acsDisImg").src = path;
    if (document.getElementById("acsDisImageWrapper").style.getPropertyValue("background-color") != colorTertiary)
        document.getElementById("acsDisImageWrapper").style.setProperty("background-color", colorTertiary);
    if (document.getElementById("acsDisrupionTextTitle").innerHTML != primary)
        document.getElementById("acsDisrupionTextTitle").innerHTML = primary;
    if (document.getElementById("acsDis").style.getPropertyValue("border-color") != color)
        document.getElementById("acsDis").style.setProperty("border-color", color);
    if (document.getElementById("acsDis").style.getPropertyValue("background-color") != colorSecondary)
        document.getElementById("acsDis").style.setProperty("background-color", colorSecondary);
    if (document.getElementById("acsDisPText").innerHTML != l)
        document.getElementById("acsDisPText").innerHTML = l;

    if (document.getElementById("acsSmallDisImg").src != path)
        document.getElementById("acsSmallDisImg").src = path;
    if (document.getElementById("acsSmallDisImageWrapper").style.getPropertyValue("background-color") != colorTertiary)
        document.getElementById("acsSmallDisImageWrapper").style.setProperty("background-color", colorTertiary);
    if (v == 0 || onlyMainClass){
        if (!document.getElementById("acsSmallDisImageCont").classList.contains("disabled"))
            document.getElementById("acsSmallDisImageCont").classList.add("disabled");
    }else{
        if (document.getElementById("acsSmallDisImageCont").classList.contains("disabled"))
            document.getElementById("acsSmallDisImageCont").classList.remove("disabled");
    }

    if (!onlyMainClass && v != 0){
        if (document.getElementById("left-quad").style.getPropertyValue("background-color") != colorSecondary)
            document.getElementById("left-quad").style.setProperty("background-color", colorSecondary);}
    else{
        if (document.getElementById("left-quad").style.getPropertyValue("background-color") != "transparent")
            document.getElementById("left-quad").style.setProperty("background-color", "transparent");}
}

function updteRiskClass(){
    let primary = "";
    let color = "";
    let colorSecondary = "";
    let colorTertiary = "";
    let path = "";
    let l = "";
    let v = parseInt(document.getElementById("inputRiskClass").value);
    if (v == -1){
        if (document.getElementById("inputRiskClassCustomCont").classList.contains("disabled"))
            document.getElementById("inputRiskClassCustomCont").classList.remove("disabled");
        primary = document.getElementById("inputRiskClassCustom").value;
    }
    else {
        if (!document.getElementById("inputRiskClassCustomCont").classList.contains("disabled"))
            document.getElementById("inputRiskClassCustomCont").classList.add("disabled");
        primary = riskClass.class[v].toUpperCase();
        color = "var("+riskClass.color[v]+")";
        colorSecondary = "var("+riskClass.colorSecondary[v]+")";
        colorTertiary = "var("+riskClass.colorTertiary[v]+")";
        path = riskClass.path[v];
        l = v;
    }
    if (document.getElementById("acsRiskImg").src != path)
        document.getElementById("acsRiskImg").src = path;
    if (document.getElementById("acsRiskImageWrapper").style.getPropertyValue("background-color") != colorTertiary)
        document.getElementById("acsRiskImageWrapper").style.setProperty("background-color", colorTertiary);
    if (document.getElementById("acsRiskTextTitle").innerHTML != primary)
        document.getElementById("acsRiskTextTitle").innerHTML = primary;
    if (document.getElementById("acsRisk").style.getPropertyValue("border-color") != color)
        document.getElementById("acsRisk").style.setProperty("border-color", color);
    if (document.getElementById("acsRisk").style.getPropertyValue("background-color") != colorSecondary)
        document.getElementById("acsRisk").style.setProperty("background-color", colorSecondary);
    if (document.getElementById("acsRiskPText").innerHTML != l)
        document.getElementById("acsRiskPText").innerHTML = l;

    if (document.getElementById("acsSmallRiskImg").src != path)
        document.getElementById("acsSmallRiskImg").src = path;
    if (document.getElementById("acsSmallRiskImageWrapper").style.getPropertyValue("background-color") != colorTertiary)
        document.getElementById("acsSmallRiskImageWrapper").style.setProperty("background-color", colorTertiary);
    if (v == 0 || onlyMainClass){
        if (!document.getElementById("acsSmallRiskImageCont").classList.contains("disabled"))
            document.getElementById("acsSmallRiskImageCont").classList.add("disabled");
    }else{
        if (document.getElementById("acsSmallRiskImageCont").classList.contains("disabled"))
            document.getElementById("acsSmallRiskImageCont").classList.remove("disabled");
    }
    
    if (!onlyMainClass && v != 0){
        if (document.getElementById("right-quad").style.getPropertyValue("background-color") != colorSecondary)
            document.getElementById("right-quad").style.setProperty("background-color", colorSecondary);}
    else{
        if (document.getElementById("right-quad").style.getPropertyValue("background-color") != "transparent")
            document.getElementById("right-quad").style.setProperty("background-color", "transparent");}
}

function updateOpionalOptions(){
    if (document.getElementById("gridCheckbox").checked == true &&
        document.getElementById("acsObjDisRisk").style.getPropertyValue("grid-template-columns") != "auto auto"){
            if (document.getElementById("acsObjDisRisk").style.getPropertyValue("grid-template-columns") == ""){
                document.getElementById("acsObjDisRisk").style.setProperty("grid-template-columns", "auto auto");}
            document.getElementById("acsDiamondImg").style.setProperty("width", "");
            if (!document.getElementById("acsbar").classList.contains("min715")){
                document.getElementById("acsbar").classList.remove("min560");
                document.getElementById("acsbar").classList.add("min715");
            }
    }
    else if (document.getElementById("gridCheckbox").checked == false &&
        document.getElementById("acsObjDisRisk").style.getPropertyValue("grid-template-columns") != ""){
            if (document.getElementById("acsObjDisRisk").style.getPropertyValue("grid-template-columns") == "auto auto"){
                document.getElementById("acsObjDisRisk").style.setProperty("grid-template-columns", "");}
            document.getElementById("acsDiamondImg").style.setProperty("width", "235px");
            if (!document.getElementById("acsbar").classList.contains("min560")){
                document.getElementById("acsbar").classList.remove("min715");
                document.getElementById("acsbar").classList.add("min560");
            }
    }
    
}

function updateUI(){
    updateInput();
}

setInterval(updateUI, 100);

var display = {
    setWidth: function(width){
        if (width < 0)
            width = document.getElementById("acsBarWidthInput").value;
        document.getElementById("acsbar").style.setProperty("width", width);
    }
}

function setWidth(width){
    if (width < 0)
        width = document.getElementById("acsBarWidthInput").value
    width = width + "px";
    document.getElementById("acsbar").style.width = width;
    console.log("hi")
}

function hexToRgbA(hex, alpha){
    var c;
    if(/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)){
        c= hex.substring(1).split('');
        if(c.length== 3){
            c= [c[0], c[0], c[1], c[1], c[2], c[2]];
        }
        c= '0x'+c.join('');
        return 'rgba('+[(c>>16)&255, (c>>8)&255, c&255].join(',')+','+alpha+')';
    }
    throw new Error('Bad Hex');
}

function readImage(input, imgID, secImgID) {
    const reader = new FileReader();
    reader.addEventListener('load', (event) => {
      document.getElementById(imgID).src = event.target.result;
      document.getElementById(secImgID).src = event.target.result;
    });
    reader.readAsDataURL(input.files[0]);
  }

function readObjectImage(input, imgID, secImgID) {
    let v = parseInt(document.getElementById("inputPrimaryObjectClass").value);
    let v2 = parseInt(document.getElementById("inputSecondaryObjectClass").value);
    if (v == -1 && v2 == -1 && imgID == "acsObjectImg") {
        readImage(input, "acsSecondaryObjectImg", secImgID);
    }
    else{
        readImage(input, imgID, secImgID);
    }
}