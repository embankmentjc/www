var modalKey = '2021_annual_mtng_modal_shown'
var alertKey = '2021_annual_mtng_alert_shown'
function closeModal(){
    console.log("Closing modal")
    $('#annualModal2021').modal('hide');
    $.cookie(modalKey, true, { expires: 2147483647 });
}
function closeAlert(){
    console.log("Closing alert")
    $('#annualAlert2021').hide();
    $.cookie(alertKey, true, { expires: 2147483647 });
}
$(document).ready(function(){
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
