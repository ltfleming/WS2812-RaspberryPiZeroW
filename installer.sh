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
git clone https://github.com/ltfleming/WS2812-RaspberryPiZeroW.git

mkdir /home/pi/share
mv WS2812-RaspberryPiZeroW/ /home/pi/share/LightController

# Set up Share
sudo apt-get install samba -y
sudo apt-get install samba-common-bin -y
sudo cp -p /etc/samba/smb.conf /etc/samba/smb.conf.original

sudo -s

echo '[PiShare]
comment=Raspberry Pi Share Directory
path=/home/pi/share
browseable=yes
guest ok=yes
read only=no
create mask=0777
force create mode=0777
directory mask=0777
force directory mode=02777
force user=pi' >> /etc/samba/smb.conf
 
exit

sudo service smbd stop
sudo service smbd start


# Run code
cd /home/pi/share/LightController
npm install --python=pypy
sudo node app.js
