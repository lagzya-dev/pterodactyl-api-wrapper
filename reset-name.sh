echo 'jq ".name=\"pterodactyl-api-wrapper\"" package.json > package.tmp.json && mv package.tmp.json package.json' > reset-name.sh
chmod +x reset-name.sh
