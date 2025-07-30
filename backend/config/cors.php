<?php

return [

    /*
    |--------------------------------------------------------------------------
    | Cross-Origin Resource Sharing (CORS) Configuration
    |--------------------------------------------------------------------------
    |
    | Here you may configure your settings for cross-origin resource sharing
    | or "CORS". This determines what cross-origin operations may execute
    | in web browsers. You are free to adjust these settings as needed.
    |
    | To learn more: https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS
    |
    */

<<<<<<< HEAD
  'paths' => ['api/*'],
  'allowed_methods' => ['*'],
  'allowed_origins' => ['http://localhost:3000'],
  'allowed_headers' => ['*', 'Authorization'],
  'exposed_headers' => [],
  'max_age' => 0,
  'supports_credentials' => false,
=======
    'paths' => ['api/*'],
    'allowed_methods' => ['*'],
    'allowed_origins' => ['http://localhost:3000'],
    'allowed_origins_patterns' => [],
    'allowed_headers' => ['*', 'Authorization'],
    'exposed_headers' => [],
    'max_age' => 0,
    'supports_credentials' => false,
>>>>>>> 7e3802d5a56e9b7358cd60bcbe0a349b40646d2a

];
