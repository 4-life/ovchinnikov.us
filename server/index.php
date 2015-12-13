<?php
	$file = 'app.zip';
	$zip = new ZipArchive;
	$res = $zip->open($file);
	if ($res === TRUE) {
		$zip->extractTo($_SERVER['DOCUMENT_ROOT']);
		$zip->close();
		echo 'unzip complete';
		unlink($file);
	} else {
		echo 'failed';
	}
?>
