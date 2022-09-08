var modalKey = 'sept-8-video-modal_suppressed'
var checkboxId = 'sept-7-redevelopment-mtng-checkbox'
var checkboxSelector = '#' + checkboxId
var modalId = 'sept-7-redevelopment-mtng-modal'
var modalSelector = '#' + modalId

function setModalSuppressCookie() {
    var checked = $(checkboxSelector).is(':checked')
    console.log("checked:", checked);
    if (checked) {
        $.cookie(modalKey, true, {expires: 2147483647});
    } else {
        $.cookie(modalKey, null, {expires: 2147483647});
        $.removeCookie(modalKey);
    }
    console.log("set cookie:", $.cookie(modalKey))
}

$(document).ready(function(){
    $(checkboxSelector).on('click', function (e) {
        var checked = $(checkboxSelector).is(':checked')
        console.log("label click; checked:", checked);
        setModalSuppressCookie();
    })
    var modalSuppressedCookie = $.cookie(modalKey)
    if (!modalSuppressedCookie || modalSuppressedCookie == "null") {
        console.log("Showing modal")
        $(modalSelector).modal('show');
    }
})
