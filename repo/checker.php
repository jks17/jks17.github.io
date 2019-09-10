<?php
	// UNUSED

	function urlsafe_b64encode($string) {
		return str_replace(array('+','/','='), array('-','_',''), base64_encode($string));
	}

	function cydia_($url, $dict, $key) {
			ksort($dict);
			$query = http_build_query($dict);
			$ch = curl_init();
			curl_setopt ($ch, CURLOPT_URL, "$url?$query&signature=" . urlsafe_b64encode(hash_hmac("sha1", $query, $key, true)));
			curl_setopt ($ch, CURLOPT_CONNECTTIMEOUT, 5);
			curl_setopt ($ch, CURLOPT_RETURNTRANSFER, true);
			$response = curl_exec($ch);
			if(strpos($response,'state=completed') !== false)
				return true;
			else
				return false;
	}

	function cydia_check($vendor, $package, $version, $device, $host, $mode, $key) {
		if(cydia_("http://cydia.saurik.com/api/check", array('device' => $device, 'package' => $package, 'vendor' => $vendor, 'version' => $version, 'mode' => $mode, 'host' => $host, 'nonce' => uniqid(), 'timestamp' => time()), $key))
			return sign_UDID($device);
		else
			return false;
	}

	function check_UDID_and_sign($UDID) {
		if(checkUDID($UDID))
			return sign_UDID($UDID);
		else
			return false;
	}

	function sign_UDID($UDID) {
		$signature = nil;
		$private_Key = openssl_get_privatekey(file_get_contents('private/private.pem'));
		openssl_sign($UDID,$signature,$private_Key);
		return $signature;// base64_encode($signature);
	}

	if(isset($_GET['cydia_check'])){
		$vendor = "ifriggog";
		$secret_key = "739a6626a3d0b70297267f3da44d5b53";
		die(cydia_check($vendor,$_GET['package'],$_GET['version'],$_GET['device'],$_GET['host'],"local",$secret_key));
	}
	else if(isset($_GET['beta_check'])){
		die(check_UDID_and_sign($_GET['UDID']));
	}
?>
