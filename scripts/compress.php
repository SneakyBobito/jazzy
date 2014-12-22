#!/usr/bin/php
<?php

define("ROOT_DIR", __DIR__ . "/..");

$resources = json_decode(file_get_contents(ROOT_DIR . "/build.json"),true);

if(!$resources){
    echo "No build.json file. Abotring..." . PHP_EOL;
}

$js = $resources["js"];

$string = "";

$publicDir = rtrim($js["public-dir"],"/");

foreach ($js["files"] as $jsFile){
    $string.=file_get_contents(ROOT_DIR . "/" . trim($publicDir . "/") . "/" . trim($jsFile , "/"));
}

$licence = file_get_contents(ROOT_DIR . "/src/LICENSE");

$string = "
    
    $licence

    var Jazzy = function($){

        $string

        return Jazzy;

    }();";

$tmpFile = "/tmp/" . time() . "-jazzy-compression.js";

file_put_contents($tmpFile, $string);

exec('java -jar "' . ROOT_DIR . '/scripts/closure-compiler.jar" --language_in ECMASCRIPT5 --js "' . $tmpFile . '" --js_output_file "' . ROOT_DIR . '/Jazzy.min.js"');

unlink($tmpFile);