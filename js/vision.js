$(document).ready(function() {
    const video = $('#vision-video-embed')
    const width = video.width()
    const height = parseInt(width * 9 / 16)
    video.attr('height', height)
})
