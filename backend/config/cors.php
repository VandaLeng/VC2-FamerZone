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
    'paths' => ['api/*', 'sanctum/csrf-cookie'],
    'allowed_methods' => ['*'],
    'allowed_origins' => ['http://localhost:3000'],
    'allowed_headers' => ['*'],
    'exposed_headers' => [],
    'max_age' => 0,
    'supports_credentials' => true,
=======
  'paths' => ['api/*'],
  'allowed_methods' => ['*'],
  'allowed_origins' => ['http://localhost:3000'],
  'allowed_headers' => ['*', 'Authorization'],
  'exposed_headers' => [],
  'max_age' => 0,
  'supports_credentials' => false,
>>>>>>> 1f3c2f04c229ff4bbea80f7c98d648c2e47ffef6

];
