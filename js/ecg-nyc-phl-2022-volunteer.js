var modalKey = 'ecg-nyc-phl-2022-volunteer-modal_suppressed'
var checkboxId = 'ecg-nyc-phl-2022-volunteer-checkbox'
var checkboxSelector = '#' + checkboxId
var modalId = 'ecg-nyc-phl-2022-volunteer-modal'
var modalSelector = '#' + modalId

function closeModal(){
    console.log("Closing modal")
    var checked = $(checkboxSelector).is(':checked')
    console.log("checked:", checked);
    if (checked) {
        $.cookie(modalKey, true, {expires: 2147483647});
    }
}

$(document).ready(function(){
    $(modalSelector).on('blur', closeModal);
    if ($.cookie(modalKey) == null) {
        console.log("Showing modal")
        $(modalSelector).modal('show');
    }
})
