var modalKey = 'ecg-nyc-phl-2022-volunteer-modal_suppressed'
var checkboxId = 'ecg-nyc-phl-2022-volunteer-checkbox'
var checkboxSelector = '#' + checkboxId
var modalId = 'ecg-nyc-phl-2022-volunteer-modal'
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
    $(modalSelector).on('blur', setModalSuppressCookie);
    if (!$.cookie(modalKey) || $.cookie(modalKey) == "null") {
        console.log("Showing modal")
        $(modalSelector).modal('show');
    }
})
