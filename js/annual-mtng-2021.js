var modalKey = '2021_annual_mtng_modal_suppressed'
function closeModal(){
    console.log("Closing modal")
    var checked = $('#annualModalCheckbox2021').is(':checked')
    console.log("checked:", checked);
    if (checked) {
        $.cookie(modalKey, true, {expires: 2147483647});
    }
}
$(document).ready(function(){
    $('#annualModal2021').on('blur', closeModal);
    if ($.cookie(modalKey) == null) {
        console.log("Showing modal")
        $('#annualModal2021').modal('show');
    }
})
