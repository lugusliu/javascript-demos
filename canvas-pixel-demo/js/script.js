var canvasa = document.getElementById('canvasa');
var contexta = canvasa.getContext('2d');
canvasa.width = 768;
canvasa.height = 432;

var canvasb = document.getElementById('canvasb');
var contextb = canvasb.getContext('2d');
canvasb.width = 768;
canvasb.height = 432;

var image = new Image();

var buttons = document.getElementsByTagName('button');

var grey = function () {
    var imageData = contexta.getImageData(0, 0, canvasa.width, canvasa.height);
    var pixelData = imageData.data;

    for ( var i = 0; i < canvasa.width * canvasa.height; i++ ) {
        var r = pixelData[ 4 * i + 0 ];
        var g = pixelData[ 4 * i + 1 ];
        var b = pixelData[ 4 * i + 2 ];

        var grey = r * 0.3 + g * 0.59 + b * 0.11;

        pixelData[ 4 * i + 0 ] = grey;
        pixelData[ 4 * i + 1 ] = grey;
        pixelData[ 4 * i + 2 ] = grey;        
    }
    contextb.putImageData(imageData, 0, 0, 0, 0, canvasb.width, canvasb.height);
}

var blackWhite = function () {
    var imageData = contexta.getImageData(0, 0, canvasa.width, canvasa.height);
    var pixelData = imageData.data;

    for ( var i = 0; i < canvasa.width * canvasa.height; i++ ) {
        var r = pixelData[ 4 * i + 0 ];
        var g = pixelData[ 4 * i + 1 ];
        var b = pixelData[ 4 * i + 2 ];

        var colorValue = (r * 0.3 + g * 0.59 + b * 0.11) > (255 / 2) ? 255 : 0;

        pixelData[ 4 * i + 0 ] = colorValue;
        pixelData[ 4 * i + 1 ] = colorValue;
        pixelData[ 4 * i + 2 ] = colorValue;        
    }
    contextb.putImageData(imageData, 0, 0, 0, 0, canvasb.width, canvasb.height);
}

var reverse = function () {
    var imageData = contexta.getImageData(0, 0, canvasa.width, canvasa.height);
    var pixelData = imageData.data;

    for ( var i = 0; i < canvasa.width * canvasa.height; i++ ) {
        var r = pixelData[ 4 * i + 0 ];
        var g = pixelData[ 4 * i + 1 ];
        var b = pixelData[ 4 * i + 2 ];

        pixelData[ 4 * i + 0 ] = 255 - r;
        pixelData[ 4 * i + 1 ] = 255 - g;
        pixelData[ 4 * i + 2 ] = 255 - b;        
    }
    contextb.putImageData(imageData, 0, 0, 0, 0, canvasb.width, canvasb.height);
}

var blur = function () {
    var imageData = contexta.getImageData(0, 0, canvasa.width, canvasa.height);
    var pixelData = imageData.data;

    var tmpImageData = contexta.getImageData(0, 0, canvasa.width, canvasa.height);
    var tmpPixelData = tmpImageData.data;

    var blurRadius = 5;
    var totalBlurPixel = ( 2 * blurRadius + 1 ) * ( 2 * blurRadius + 1 );

    for ( var i = blurRadius; i < canvasa.height - blurRadius; i++ ) {
        for ( var j = blurRadius; j < canvasa.width -blurRadius; j++ ) {
            var totalr = 0;
            var totalg = 0;
            var totalb = 0;
            for ( var dx = -blurRadius; dx <= blurRadius; dx++ ) {
                for ( var dy = -blurRadius; dy <= blurRadius; dy++) {
                    var x = i + dx;
                    var y = j + dy;
                    var p = x * canvasa.width + y;
                    totalr += tmpPixelData[ p * 4 + 0];
                    totalg += tmpPixelData[ p * 4 + 1];
                    totalb += tmpPixelData[ p * 4 + 2];                    
                }
            }

            var p = i * canvasa.width + j;
            pixelData[ p * 4 + 0] = totalr / totalBlurPixel;
            pixelData[ p * 4 + 1] = totalg / totalBlurPixel;
            pixelData[ p * 4 + 2] = totalb / totalBlurPixel;            
        }
    }
    contextb.putImageData(imageData, 0, 0, 0, 0, canvasb.width, canvasb.height);
}

var mosaic = function () {
    var imageData = contexta.getImageData(0, 0, canvasa.width, canvasa.height);
    var pixelData = imageData.data;

    var tmpImageData = contexta.getImageData(0, 0, canvasa.width, canvasa.height);
    var tmpPixelData = tmpImageData.data;

    var blurWidth = 12;

    for ( var i = 11; i < canvasa.height; i = i + 12 ) {
        for ( var j = 11; j < canvasa.width; j = j + 12 ) {
            var totalr = 0;
            var totalg = 0;
            var totalb = 0;
            for ( var dx = -11; dx <= 0; dx++ ) {
                for ( var dy = -11; dy <= 0; dy++) {
                    var x = i + dx;
                    var y = j + dy;
                    var p = x * canvasa.width + y;
                    totalr += tmpPixelData[ p * 4 + 0];
                    totalg += tmpPixelData[ p * 4 + 1];
                    totalb += tmpPixelData[ p * 4 + 2];
                }
            }
            for ( var dx = -11; dx <= 0; dx++ ) {
                for ( var dy = -11; dy <= 0; dy++) {
                    var x = i + dx;
                    var y = j + dy;
                    var p = x * canvasa.width + y;
                    pixelData[ p * 4 + 0] = totalr / 144;
                    pixelData[ p * 4 + 1] = totalg / 144;
                    pixelData[ p * 4 + 2] = totalb / 144;
                }
            }
        }
    }
    contextb.putImageData(imageData, 0, 0, 0, 0, canvasb.width, canvasb.height);
}

window.onload = function () {
    image.src = "img/snow.jpg";
    
    image.onload = function () {
        contexta.drawImage(image, 0, 0, canvasa.width, canvasa.height);
    }

    buttons[0].onclick = grey;
    buttons[1].onclick = blackWhite;
    buttons[2].onclick = reverse;
    buttons[3].onclick = blur;
    buttons[4].onclick = mosaic;
};