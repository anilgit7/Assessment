<?php

return [
    'paths' => ['api/*'], // Apply CORS to all API routes

    'allowed_methods' => ['*'], // Allow all methods (GET, POST, etc.)

    'allowed_origins' => ['*'], // React frontend origin

    'allowed_origins_patterns' => [],

    'allowed_headers' => ['*'], // Allow all headers

    'exposed_headers' => [],

    'max_age' => 0,

    'supports_credentials' => true, // Required for cookies/sessions
];
