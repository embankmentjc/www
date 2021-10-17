var modalKey = '2021_annual_mtng_modal_shown'
function closeModal(){
    console.log("Closing modal")
    // rv = false;
    // event.defaultPrevented = rv;
    //$('#annualModal2021').modal('hide');
    // $('#annualModal2021').trigger('click');
    // $('#annualModal2021').hide();
    $.cookie(modalKey, true, { expires: 2147483647 });
    // return rv;
}
// var alertKey = '2021_annual_mtng_alert_shown'
// function closeAlert(){
//     console.log("Closing alert")
//     $('#annualAlert2021').hide();
//     $.cookie(alertKey, true, { expires: 2147483647 });
// }
$(document).ready(function(){
    //$('.modal-header .close').on('click', closeModal);
    $('#annualModal2021').on('blur', closeModal);
    if ($.cookie(modalKey) == null) {
        console.log("Showing modal")
        $('#annualModal2021').modal('show');  //show modal pop up
        // console.log("Hiding alert")
        // $('#annualAlert2021').hide();  //show modal pop up
    } /*else if ($.cookie(alertKey) == null) {
      console.log("Showing alert")
      $('#annualAlert2021').show();  //show modal pop up
    } else {
      console.log("Hiding alert")
      $('#annualAlert2021').hide();  //show modal pop up
    }*/
})
