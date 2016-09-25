function addLoadEvent(func) {
    var oldevent = window.onload;
    if (typeof oldevent != 'function') {
        window.onload = func;
    } else {
        window.onload = function() {
            oldevent();
            func();
        }
    }
}

function insertAfter(newElement, targetElement) {
    var parent = targetElement.parentNode;
    if (parent.lastNode == targetElement) {
        parent.appendChild(newElement);
    } else {
        parent.insertBefore(newElement, targetElement.nextSibling);
    }
}

function moveElement(elementID, final_x, final_y, interval) {
    var elem = document.getElementById(elementID);
    var xpos = parseInt(elem.style.left);
    var ypos = parseInt(elem.style.top);
    var step = 30;

    if (elem.movement)
        clearTimeout(elem.movement);

    if (final_x == xpos && final_y == ypos) return true;
    if (xpos < final_x)
        xpos += Math.ceil((final_x - xpos) / step);
    if (xpos > final_x)
        xpos -= Math.ceil((xpos - final_x) / step);
    if (ypos < final_y)
        ypos += Math.ceil((final_y - ypos) / step)
    if (ypos > final_y)
        ypos -= Math.ceil((ypos - final_y) / step);

    elem.style.left = xpos + "px";
    elem.style.top = ypos + "px"; 
    var repeat = "moveElement('"+elementID+"',"+final_x+","+final_y+","+interval+")";
    elem.movement = setTimeout(repeat, interval);
}

function flushJournalList() {
    var squenceNum = 1;
    var $lists = $("#journal-list");
    var $journal;
    var date = new Date();
    var datestring = date.getFullYear() + "-" + (date.getMonth() +1) + "-" + date.getDate() + "/" + date.getHours() + ":" + date.getMinutes();

    for (var squenceNum = 1; squenceNum <= 20; ++squenceNum) {
        $lists.append("<tr></tr>");
        $journal = $("#journal-list tr:eq(" + squenceNum + ")");
        $journal.append("<td>" + squenceNum + "</td>");
        $journal.append("<td><a href='#'>Bootstrap passage" + squenceNum + "</a></td>");
        $journal.append("<td>" + datestring + "</td>");
        $journal.append("<td><span class='badge'>" + parseInt(Math.random() * 100 + 1) + "</span></td>");
        $journal.append("<td><span class='badge'>" + parseInt(Math.random() * 100 + 1) + "</span></td>");
    }
}

function loginInit() {
    $("button#login-btn").on('click', function() {
        var addcontent = "<div class='alert alert-warning alert-dismissable'>" + "<button class='close' data-dismiss='alert'>&times;</button>" + "Password Error" + "<div>";
        $("#login-form .form-group:first").before(addcontent);
    });
}

function loveitInit() {
    $(".loveit").click(function() {
        if ($(this).find("span").hasClass('loveit'))
            $(this).find("span").removeClass("loveit");
        else
            $(this).find("span").addClass("loveit");
    });
}

function ablumInit() {
    var addphoto = '<div class="col-md-3 col-sm-6 col-xs-12">'+
            '<div class="thumbnail">'+
               '<img src="images/01.jpg" alt="">'+
                '<div class="caption">'+
                    '<h3>A puppy</h3>'+
                    '<p>Do you like it?</p>'+
                    '<button class="btn btn-success pull-right">View</button>'+
                    '<a href="#" class="loveit"><span class="glyphicon glyphicon-heart"></span></a>'+
                    '<div class="clear"></div>'+
                '</div>'+
            '</div>'+
        '</div>';
    var $albumList = $(".album-list");
    for (var i = 0; i < 16; ++i)
        $albumList.append(addphoto);
    loveitInit();
}

addLoadEvent(flushJournalList);
addLoadEvent(loginInit);
// addLoadEvent(loveitInit);
addLoadEvent(ablumInit);