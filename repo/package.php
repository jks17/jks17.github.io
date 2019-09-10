<?php

include_once 'UDIDcheck.php';

if (checkUDID($_SERVER['HTTP_X_UNIQUE_ID']))
	header('Location: http://chewitt.me/repo/packages_private.bz2');
else
	header('Location: http://chewitt.me/repo/packages_public.bz2');
	
?>
