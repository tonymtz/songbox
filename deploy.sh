cd ~/www/
rm clone.tar.gz
cat songbox.pid | xargs kill
export BEEGO_RUNMODE=prod
nohup ./songbox/clone > songbox.log 2>&1&
echo $! > songbox.pid
