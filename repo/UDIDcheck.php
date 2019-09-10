<?php
	function checkUDID($udid)
	{
	$acceptedUDID = array(/* pad */'2b8d9d2280f1dc899c70feb5576e10c577341510', /* 5s */'46d38e847bd05797a507f3653e6b3b5aa8ab0d0c', /* AAC dev */'8dcf6eaa12867af0f898a4f55550d1c04eadcac0');
		if (in_array($udid, $acceptedUDID))
			return true;
		else
			return false;
	}
?>
