//下载图片到本地
function downloadIamge(imgsrc, name) {
    //下载图片地址和图片名
    var image = new Image();
    // 解决跨域 Canvas 污染问题
    image.setAttribute('crossOrigin', 'anonymous');
    image.onload = function () {
        var canvas = document.createElement('canvas');
        canvas.width = image.width;
        canvas.height = image.height;
        var context = canvas.getContext('2d');
        context.drawImage(image, 0, 0, image.width, image.height);
        var _dataURL = canvas.toDataURL('image/png'); //得到图片的base64编码数据

        var blob_ = dataURLtoBlob(_dataURL ); // 用到Blob是因为图片文件过大时，在一部风浏览器上会下载失败，而Blob就不会

        var url= {
            name: name || "哔哩哔哩封面.png", // 图片名称不需要加.png后缀名
            src: blob_
        };

        if (window.navigator.msSaveOrOpenBlob) {   // if browser is IE
            navigator.msSaveBlob(url.src, url.name );//filename文件名包括扩展名，下载路径为浏览器默认路径
        } else {
            var link = document.createElement("a");
            link.setAttribute("href", window.URL.createObjectURL(url.src));
            link.setAttribute("download", url.name + '.png');
            document.body.appendChild(link);
            link.click();
        }
    };
    image.src = imgsrc;

    function dataURLtoBlob(dataurl) {
        var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
            bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
        while (n--) {
            u8arr[n] = bstr.charCodeAt(n);
        }
        return new Blob([u8arr], { type: mime });
    }
}