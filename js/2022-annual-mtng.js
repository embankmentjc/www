var modalKey = '2022-annual-mtng_suppressed'
var checkboxId = '2022-annual-mtng-checkbox'
var checkboxSelector = '#' + checkboxId
var modalId = '2022-annual-mtng-modal'
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
