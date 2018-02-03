(function($){
    // Attach this new method to jQuery
    // This is where you write your plugin's name
    
    $.fn.extend({
        createCaptcha: function(options) {
      // Iterate over the current set of matched elements

        var lt = 0,
        rt = 0,
        tp = 10;
        $(document).ready(function() {
           // renderCaptchaDialog();
            if (!isCanvasSupported()) {
                return;

            } else {
                validateForm();
                initCap();
            }
       });
        // function canvasSupport() {
        //     return Modernizr.canvas;
        // }
        function renderCaptchaDialog(){
           var $str =  '<div id="captcha-form" class="wrp">'+
                        '<canvas id="c" style="display:block"> </canvas>'+
                        '<canvas id="dgclone"> </canvas>'+
                        '<div id="dropHere" class="dest"></div>'+
                        '<div id="scroll-cont">'+
                            '<div id="scroller">'+
                                '<div id="dragThis" data-id-group="wc">'+
                                '</div>'+
                            '</div>'+
                        '</div>'+
                    '</div>'
            //html = $.parseHTML( str )
            $( "body" ).append($str);
        }
        function isCanvasSupported() {
            var elem = document.createElement('canvas');
            return !!(elem.getContext && elem.getContext('2d'));
        }

        function getRandomInt(min, max) {
            return Math.floor(Math.random() * (max - min + 1)) + min;
        }
        var captchDlg, form;


        function initCap() {
            validateForm(false);
            // init left position
            // lt = Math.abs(Math.random() * $(".wrp").width() / 2 - 20);
            getRandomImages();


            captchDlg = $("#captcha-form").dialog({
            autoOpen: false,
            modal: true
           });
        }
        $('#'+options.actionElement).button().click(function(e) {
        e.preventDefault();

        if (!isValidate())
            captchDlg.dialog("open");
            return false;
        });

    function getRandomImages() {
        $.ajax({
            type: 'GET',
            url: options.apiURL, //'http://localhost:52724/data/getRandomImage',
            dataType: 'json',
            processData: false,
            contentType: false,
            success: function(data) {

            var canvas = document.getElementById("c");
            var ctx = canvas.getContext("2d");

            lt = Math.floor(Math.random() * (canvas.width / 2 - 50));
            rt = Math.floor(Math.random() * (canvas.width / 2 - 50));

            //random top
            tp = getRandomInt(10, canvas.height - 50)

            // rt = Math.floor(Math.random() * (canvas.width / 2));
            // rt = Math.random() * (canvas.width - (canvas.width / 2) + 1) + ((canvas.width / 2) + 40);
            console.log(" left : " + lt);
            console.log(" right : " + rt);

            $("#dgclone").css("left", lt);
            $("#dropHere").css("left", (canvas.width / 2) + lt);


            $("#dgclone").css("top", tp);
            $("#dropHere").css("top", tp);

            // if want to get left of scroller handle then use below
            //$("#dragThis").offset().left- $(".wrp").offset().left ; 


            var xy = 20;
            var image = new Image();
            image.onload = function() {
            ctx.drawImage(image, 0, 0);
            //context.drawImage(image, 30, 30, 40, 40, 30, 30, 40, 40)
            // comment it not required to static 
            //$(".dgclone").css('background-image','url('+data.DropImageUrl+')');

            var dgclone = document.getElementById('dgclone');
            dgclone.width = 50;
            dgclone.height = 50;
            var dgcontext = dgclone.getContext('2d');
            //get random x,y from half of widht to end of width.
            var rnd_st = canvas.width / 2 - dgclone.width;
            var main_wdt = canvas.width - dgclone.width;
            // var rnd_x = Math.floor(Math.random() * (main_wdt - rnd_st) + rnd_st);
            //var rnd_x = getRandomInt(rnd_st, (main_wdt - rnd_st));
            //console.log("rnd_x : " + rnd_x);

            //var rnd_y = getRandomInt(20, 100);
            var rnd_y = tp,
            rnd_x = (canvas.width / 2) + lt;
            console.log("rnd_x : " + rnd_x);
            console.log("rnd_y : " + rnd_y);

            // dgcontext.drawImage(canvas, 0, 0, dgclone.width, dgclone.height, rnd_x, rnd_x, 40, 40);
            //dgcontext.drawImage(canvas, 0, 0, 40, 40, 0, 0, 40, 40);
            //dgcontext.drawImage(canvas, 0, 0, 40, 40);
            // dgcontext.drawImage(canvas, 0, 0, 40, 40, 0, 0, 40, 40);
            dgcontext.drawImage(image, rnd_x, rnd_y, 50, 50, 0, 0, 50, 50);
            console.log("dgclone.width : " + dgclone.width);
            console.log("dgclone.height : " + dgclone.height);

            //    var elem = document.createElement('canvas');
            // elemContext = elem.getContext('2d');
            // // elemContext.drawImage(canvas, 32, 0, 32, 32, 0, 0, 32, 32);
            // elemContext.drawImage(canvas, 0, 0, 40, 40, 0, 0, 40, 40);
            // $("body").append(elem);

            };
            image.src = data.ImageUrl; // "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRAw2u99xzwKs8CaXW62rxMvQhO5skGzDDaH6KJ6TNUUC9y9UAN";
            image.width = '100%';
            }

            });
            }
        
            function validateForm(isValidate) {
                var isvalid = isValidate === undefined ? false : isValidate;
                $("form").attr("validate", isvalid);
                $("form").attr('onsubmit', 'return ' + isvalid + ';');
            }

            function isValidate() {
               return $("form").attr("validate") == "false" ? false : true;
            }
            $('#dragThis').draggable({
            containment: $('.wrp'),

            drag: function() {
                var offset = $(this).offset();
                var xPos = offset.left;
                var yPos = offset.top;
                $('#posX > span').text(xPos);
                $('#posY > span').text(yPos);
                // $(".dgclone").css("top", yPos);

                console.log($('.wrp').position().left);
                //$(".dgclone").css("left", xPos - $('.wrp').offset().left);
                $("#dgclone").css("left", lt + xPos - $('.wrp').offset().left);

                console.log(" dgclone: left =>" + $("#dgclone").offset().left);
                console.log(" dest: left =>" + $(".dest").offset().left);

                if ($("#dgclone").offset().left === $(".dest").offset().left) {
                console.log("isvalidate: true");
                $("#dgclone").attr("data-id-group", "wc");
                }
            },
            stop: function() {
                var finalOffset = $(this).offset();
                var finalxPos = finalOffset.left;
                var finalyPos = finalOffset.top;

                //  $('#finalX > span').text(finalxPos);
                // $('#finalY > span').text(finalyPos);
                //  $('#width > span').text($(this).width());
                // $('#height > span').text($(this).height());

                //  console.log(" dgclone: left =>" + $(".dgclone").offset().left);
                // console.log(" dest: left =>" + $(".dest").offset().left);
                if ($("#dgclone").offset().left === $(".dest").offset().left) {
                // console.log("isvalidate: true");
                   $("#dgclone").attr("data-id-group", "wc")
                //$(document).trigger("verified",["Custom","Event"]);
                   $(this).closest('.ui-dialog-content').dialog('close'); 
                   alert("Successful.Broadcast event here to login");
                } else {
                    $("#dgclone").css("left", lt);
                    $("#dgclone").attr("data-id-group", "");
                 }
                },
                revert: 'invalid',
                axis: "x"
            });

            $('#dropHere').droppable({
                activeClass: "ui-state-hover",
                hoverClass: "ui-state-active",
                // accept: '#dragThis',

                accept: function(draggable) {
                var id_group_drop, id_group_drag;
                //get the "id_group" stored in a data-attribute of the draggable
                id_group_drag = $(draggable).attr("data-id-group");

                //get the "id_group" stored in a data-attribute of the droppable
                id_group_drop = $("#dgclone").attr("data-id-group");
                //compare the id_groups, return true if they match or false otherwise
                return id_group_drop == id_group_drag;
                },
                drop: function() {
                alert("Dropped!");
                // awesome code that works and handles successful drops...

            },

            over: function() {
            $(this).animate({
                'border-width': '5px',
                'border-color': '#0f0'
                }, 500);
                ///            $('#dragThis').draggable('option', 'containment', $(this));
                $('#dgclone').draggable('option', 'containment', $(this));
            }
        });
     }
   });
  
  // pass jQuery to the function, 
  // So that we will able to use any valid Javascript variable name 
  // to replace "$" SIGN. But, we'll stick to $ (I like dollar sign: ) )
})(jQuery);