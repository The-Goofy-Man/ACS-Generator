var imageConverter = {
    convert: function(){
        html2canvas(document.getElementById("acsbar")).then(function(canvas) {
            var link = document.createElement("a");
            document.body.appendChild(link);
            link.download = "acsbar.png";
            link.href = canvas.toDataURL();
            link.target = '_blank';
            link.click();
          });
    }
}
