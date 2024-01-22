function updateInput(){
    updateAccessLvl();
    updateItemTitle(document.getElementById("inputItemTitle").value, document.getElementById("inputItemSubtitle").value);
    updateOnjectClass();
    updteDisrupionClass();
    updteRiskClass();
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
    let v = parseInt(document.getElementById("inputPrimaryObjectClass").value);
    if (v == -1){
        if (document.getElementById("inputPrimaryObjectClassCustomCont").classList.contains("disabled"))
            document.getElementById("inputPrimaryObjectClassCustomCont").classList.remove("disabled");
        primary = document.getElementById("inputPrimaryObjectClassCustom").value;
    }
    else {
        if (!document.getElementById("inputPrimaryObjectClassCustomCont").classList.contains("disabled"))
            document.getElementById("inputPrimaryObjectClassCustomCont").classList.add("disabled");
        primary = objClass.class[v].toUpperCase();
        color = "var("+objClass.color[v]+")";
        colorSecondary = "var("+objClass.colorSecondary[v]+")";
    }
    if (document.getElementById("acsObjectPrimaryTextTitle").innerHTML != primary)
        document.getElementById("acsObjectPrimaryTextTitle").innerHTML = primary;
    if (document.getElementById("acsObject").style.getPropertyValue("border-color") != color)
        document.getElementById("acsObject").style.setProperty("border-color", color);
    if (document.getElementById("acsObject").style.getPropertyValue("background-color") != colorSecondary)
        document.getElementById("acsObject").style.setProperty("background-color", colorSecondary);



    v = parseInt(document.getElementById("inputSecondaryObjectClass").value);
    if (v == 0 && !document.getElementById("acsObjectSecondaryText").classList.contains("disabled")){
        document.getElementById("acsObjectSecondaryText").classList.add("disabled");
        document.getElementById("acsObjectPrimaryTextSubtitle").classList.remove("em075");
        document.getElementById("acsObjectPrimaryTextTitle").classList.add("em2");
    }
    else if (v != 0 && document.getElementById("acsObjectSecondaryText").classList.contains("disabled")){
        document.getElementById("acsObjectSecondaryText").classList.remove("disabled");
        document.getElementById("acsObjectPrimaryTextSubtitle").classList.add("em075");
        document.getElementById("acsObjectPrimaryTextTitle").classList.remove("em2");
    }
    if (v == -1){
        if (document.getElementById("inputSecondaryObjectClassCustomCont").classList.contains("disabled"))
            document.getElementById("inputSecondaryObjectClassCustomCont").classList.remove("disabled");
        primary = document.getElementById("inputSecondaryObjectClassCustom").value;
    }
    else {
        if (!document.getElementById("inputSecondaryObjectClassCustomCont").classList.contains("disabled"))
            document.getElementById("inputSecondaryObjectClassCustomCont").classList.add("disabled");
        primary = objSecondaryClass.class[v].toUpperCase();
        color = "var("+objClass.color[v]+")";
        colorSecondary = "var("+objClass.colorSecondary[v]+")";
    }
    if (document.getElementById("acsObjectSecondaryTextTitle").innerHTML != primary)
        document.getElementById("acsObjectSecondaryTextTitle").innerHTML = primary;
}

function updteDisrupionClass(){
    let primary = "";
    let color = "";
    let colorSecondary = "";
    let v = parseInt(document.getElementById("inputDisruptionClass").value);
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
    }
    if (document.getElementById("acsDisrupionTextTitle").innerHTML != primary)
        document.getElementById("acsDisrupionTextTitle").innerHTML = primary;
    if (document.getElementById("acsDis").style.getPropertyValue("border-color") != color)
        document.getElementById("acsDis").style.setProperty("border-color", color);
    if (document.getElementById("acsDis").style.getPropertyValue("background-color") != colorSecondary)
        document.getElementById("acsDis").style.setProperty("background-color", colorSecondary);
}

function updteRiskClass(){
    let primary = "";
    let color = "";
    let colorSecondary = "";
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
    }
    if (document.getElementById("acsRiskTextTitle").innerHTML != primary)
        document.getElementById("acsRiskTextTitle").innerHTML = primary;
    if (document.getElementById("acsRisk").style.getPropertyValue("border-color") != color)
        document.getElementById("acsRisk").style.setProperty("border-color", color);
    if (document.getElementById("acsRisk").style.getPropertyValue("background-color") != colorSecondary)
        document.getElementById("acsRisk").style.setProperty("background-color", colorSecondary);
}

function updateUI(){
    updateInput();
}

setInterval(updateUI, 100);