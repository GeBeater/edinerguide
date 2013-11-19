<?php
/**
 * A gateway script to call the foursquare API with "OAuth" client credentials.
 *
 * This script serves the purpose to call the foursquare API from a client side
 * application without make the client secret public.
 *
 * Exemplary calls:
 * http://api.edinerguide.de/foursquare?ll=40.7,-74&query=sushi
 * http://api.edinerguide.de/foursquare?near=Hamburg&query=restaurant&limit=10&intent=match
 */
ini_set('display_errors', 1);
error_reporting(-1);

define('FOURSQUARE_API_CLIENT_ID', 'ISKII1C3BUIIXVT1QSC1RE10K4JXPI2M2WBSIWIZRW5VQ0PE');
define('FOURSQUARE_API_CLIENT_SECRET', '2G4JUM4EZJLVGSE5NBLNGZWMTLTWFERMF1ABZ2VAZP0PFH2U');
define('FOURSQUARE_API_VERSION', '20131119'); // https://developer.foursquare.com/overview/versioning
define('FOURSQUARE_API_LANGUAGE', 'de'); // https://developer.foursquare.com/overview/versioning
define('FOURSQUARE_API_BASE_URI', 'https://api.foursquare.com/v2');
define('FOURSQUARE_API_SEARCH_ENDPOINT', '/venues/search'); // https://developer.foursquare.com/overview/venues

$headers = array(
    'Accept: application/json',
    'Accept-Language: ' . FOURSQUARE_API_LANGUAGE,
);

$parameters = array(
    'client_id' => FOURSQUARE_API_CLIENT_ID,
    'client_secret' => FOURSQUARE_API_CLIENT_SECRET,
    'v' => FOURSQUARE_API_VERSION,
);

if(true === isset($_GET) && false === empty($_GET)) {
    $parameters = array_merge($parameters, $_GET);
}

$uri = FOURSQUARE_API_BASE_URI . FOURSQUARE_API_SEARCH_ENDPOINT . '?' . http_build_query($parameters);

$ch = curl_init();

curl_setopt($ch, CURLOPT_URL, $uri);
curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
curl_setopt($ch, CURLOPT_HEADER, false);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_HEADERFUNCTION, function($ch, $headerField) {
    header($headerField);
    return strlen($headerField);
});

$response = curl_exec($ch);

// TODO will not work if status code already set, however seems to be valid in this case
if(0 !== curl_errno($ch)) {
    header('HTTP/1.1 502 Bad Gateway', 502);
}

curl_close($ch);

echo $response;