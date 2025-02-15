echo 'jq ".name=\"@cptcr/pterodactyl-api-wrapper\"" package.json > package.tmp.json && mv package.tmp.json package.json' > set-github.sh
chmod +x set-github.sh
