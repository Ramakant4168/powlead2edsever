
Given any URL server returns list of all anchor tags on web page with info of target urls in anchor tag
=================================================================

Heroku URL of server
====================
https://powlead2edserver.herokuapp.com

API end point
==============
/powlead2ed/crawler/get-page-info

Request Body
==============
{
 "url" : "https://example.com"
}

Response Body
================

Info captured for target urls is from header info sent from server

{
    "message": "Success",
    "data": [
        {
            "link": "https://github.com/winhtaikaung/react-tiny-link/blob/master/README.md#start-of-content",
            "text": "Skip to content",
            "isUrlRelative": "Yes",
            "contentEncoding": "chunked",
            "serverInfo": "GitHub.com",
            "contentLenght": 0
        }
      ]
]      

To run server locally
=====================
npm run dev


Improvements/ To do
===================

1. Fetch info of javascript rendered web pages from anchor tags
2. Handling of Error 429 (Too many requests) to access all anchor tags


