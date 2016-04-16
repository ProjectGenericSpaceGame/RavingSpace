/**
 * Created by RAndom MC on 07/04/2016.
 */
$(document).ready(function() {
    $(".fa-pulse, .fa-check").hide();
    currentIndex = -1;
    $(".assetSelect").on("change",function(){
        $(this).parent().parent().find("img").attr("src","../"+$(this).val());
    });
    $("#assetField").find("select").on("change",function(){
        $("#chosenAsset").attr("src","../"+$(this).val());
    });
    $("input[type=submit]").click(function(){
        currentIndex = parseInt($(this).attr("name").substring(2));
    })
});



