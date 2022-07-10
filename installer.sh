### Install NPM v8.11.4
wget https://nodejs.org/dist/v8.11.4/node-v8.11.4-linux-armv6l.tar.gz
tar -xzf node-v8.11.4-linux-armv6l.tar.gz
sudo cp -R node-v8.11.4-linux-armv6l/* /usr/local/
rm -rf node-v*
node -v

### Update the config for node-gyp to install successfully
echo 'npm set prefix ~/.npm' >> ~/.bashrc
echo 'PATH="$HOME/.npm/bin:$PATH"' >> ~/.bashrc
echo 'PATH="./node_modules/.bin:$PATH"' >> ~/.bashrc
source ~/.bashrc
 
### Install node-gyp
npm i -g node-gyp

# Download controller code from GIT
sudo apt install git
git clone https://github.com/luxdvie/WS2812Controller.git
cd WS2812Controller
npm install --python=pypy

# Run code
sudo node app.js
