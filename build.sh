# GIMME DAT DB
sudo docker pull mcr.microsoft.com/mssql/server:2019-CU3-ubuntu-18.04

# RUNNNNNNNN
sudo docker run -e "ACCEPT_EULA=Y" -e "SA_PASSWORD=WelcomeToTheJungle" -p 1433:1433 --name tegridy-db -d mcr.microsoft.com/mssql/server:2019-CU3-ubuntu-18.04
