# marvel-clone
 Search Marvel heroes and villians!

# How To
You'll need to create an environment file named ".env" in the root folder, and define three variables:
PRIVATE_KEY
PUBLIC_KEY
BASE_URL="https://gateway.marvel.com:443/v1/public/characters"
You need to get the private and public keys from marvel's own website: https://developer.marvel.com/

After you've done so, "yarn dev" in the root file to start up the website in development mode.
Visit localhost:3000 to see the website.