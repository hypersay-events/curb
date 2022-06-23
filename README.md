# CurbCut

Captions and subtitles system

## Example

curl --request POST \
 --url http://localhost:4554/caption \
 --header 'Content-Type: application/json' \
 --data '{
"text": "This is an engligh text",
"lang": "en",
"roomName": "abc"
}'
