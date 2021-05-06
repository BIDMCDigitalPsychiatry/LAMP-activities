#!/bin/bash
npx --yes --package inline-source-cli inline-source --attribute "" --compress false --root ./build ./build/index.html > dist.html
openssl base64 -in dist.html -out dist.html.b64