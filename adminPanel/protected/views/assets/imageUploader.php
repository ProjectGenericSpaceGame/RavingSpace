<?php
/**
 * Created by PhpStorm.
 * User: RAndom MC
 * Date: 16/04/2016
 * Time: 10:56
 */
echo "<p style='font-weight:bold;font-size:150%;color:red'>$error</p>";
echo "<p style='font-weight:bold;font-size:150%;color:green'>$success</p>";
?>

<button onclick="window.location.href='<?php echo Yii::app()->request->baseUrl;?>/index.php?r=assets/'">Manage assets</button>
<button onclick="window.location.href='<?php echo Yii::app()->request->baseUrl;?>/index.php?r=assets/create'">Add new asset</button>
<button onclick="window.location.href='<?php echo Yii::app()->request->baseUrl;?>/index.php?r=assets/imageManager'">Manage server images</button>
<h1 class="uploaderH1">Upload picture to server</h1>
<form method="post" enctype="multipart/form-data" action="<?php echo Yii::app()->request->url; ?>">
    <h2>Select a file</h2>
    <input id="imgSelector" type="file" name="fileToUpload" id="fileToUpload" accept="image/*"><br>
    <img id="displayChosenImg" src="" alt="chosen image">
    <h2>Select folder</h2>
    <?php echo $dirList;

    ?>
    <button type="submit" name="submit">Save</button>
</form>
<script type="text/javascript">
    $(function() {
        $("input:file").change(function (){
            var fileName = $(this).val();
            var reader = new FileReader();
            // Closure to capture the file information.
            reader.onload = (function(theFile) {
                    // Render thumbnail.
                    $("#displayChosenImg").attr("src",theFile.target.result);
                    var span = document.createElement('span');
            });
            reader.readAsDataURL(document.getElementById("imgSelector").files[0]);
        });
    });
</script>