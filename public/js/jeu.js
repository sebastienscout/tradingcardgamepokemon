/**
 * Created by sebastien on 09/06/2016.
 */

$('.interaction').click(function(event){
    event.stopPropagation();
    var src = $(this).attr('src');
    $('#zoomed-card img').attr('src', src);
    $('#zoomed-card').show();
});

$('body').click(function() {
    $('#zoomed-card').hide();
});