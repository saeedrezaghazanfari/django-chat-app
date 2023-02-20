#!/bin/bash
# V1.0
# creator: Peaka
# this file is for remove all migration files in Django application #
# this file must be in root dir of django application #


# define color functions
black() { 
	echo "\e[30m${1}\e[0m" 
}
red() { 
	echo "\e[31m${1}\e[0m" 
}
green() { 
	echo "\e[32m${1}\e[0m" 
}
yellow() { 
	echo "\e[33m${1}\e[0m" 
}
blue() { 
	echo "\e[34m${1}\e[0m" 
}
magenta() { 
	echo "\e[35m${1}\e[0m" 
}
cyan() { 
	echo "\e[36m${1}\e[0m" 
}
gray() { 
	echo "\e[90m${1}\e[0m" 
}

clear
echo 
echo "# 1 => run server"
echo "# 2 => git add and commit"
echo "# 3 => install a package"
echo "# 4 => uninstall a package"
echo "# 5 => make migrations and migrate db"
echo "# 6 => remove all migrations files"
echo "# 7 => remove all pycache files"
echo "# 8 => about manager.sh"
echo "# 9 => exit from manager.sh"
echo
read -p "Enter your Selection: " FLAG
echo


# run django server on port 8000
if [ $FLAG = 1 ]; then
	
	clear
	. venv/bin/activate
	python3 manage.py runserver 8000


# git add . and git commit -m "$"
elif [ $FLAG = 2 ]; then
	
	clear
	echo "Enter your comment of this Commit:"
	read -p "> " COMMENT

	git add .
	echo
	git commit -m "$COMMENT"


# install a package
elif [ $FLAG = 3 ]; then
	
	clear
	read -p "Enter Package Name to install: " PACKAGE

	. venv/bin/activate
	pip install $PACKAGE
	echo
	pip freeze
	pip freeze > ./requirements.txt


# uninstall a package
elif [ $FLAG = 4 ]; then
	
	clear

	read -p "Enter Package Name to uninstall: " PACKAGE

	. venv/bin/activate
	pip uninstall $PACKAGE
	echo
	pip freeze
	pip freeze > ./requirements.txt


# makemigrations and migrate db
elif [ $FLAG = 5 ]; then
	
	clear
	read -p "Your selection is 'Make Migrations & Migrate', Are you Sure? [n/Y] " SUREMENT

	if [ $SUREMENT = 'Y' ]; then

		. venv/bin/activate
		python3 manage.py makemigrations
		echo
		python3 manage.py migrate

	else
		echo "Exited!"
	fi


# delete all of 00*.py files of migrations dir
elif [ $FLAG = 6 ]; then
	
	clear
	read -p "Your selection is 'Remove Migration Files', Are you Sure? [n/Y] " SUREMENT

	if [ $SUREMENT = 'Y' ]; then

		for FILE in $(find ./chat_*/migrations/ -type f -iname "00*.py")
		do
			rm $FILE
			echo "File '" $FILE "' is removed!"
		done

		rm -f ./db.sqlite3
		echo "File ' db.sqlite3 ' is removed!"

		echo "done!"

	else
		echo "Exited!"
	fi


# delete all of *.pyc files in this dir
elif [ $FLAG = 7 ]; then

	clear
	read -p "Your selection is 'Remove PyCache Files', Are you Sure? [n/Y] " SUREMENT

	if [ $SUREMENT = 'Y' ]; then

		for FILE in $(find ./chat_*/__pycache__/)
		do
			rm -rf $FILE
			echo "Dir '" $FILE "' is removed!"
		done

		for FILE in $(find ./chat_*/*/__pycache__/)
		do
			rm -rf $FILE
			echo "Dir '" $FILE "' is removed!"
		done

		rm -rf ./extentions/__pycache__/
		echo "Dir ' ./extentions/__pycache__/ ' is removed!"

		echo "done!"

	else
		echo "Exited!"
	fi


# about manager.sh
elif [ $FLAG = 8 ]; then

	clear
	sleep 1
	echo
	cyan "This script is for all django applications."
	cyan "If you can use shis, just add this script to root of application."
	cyan "Open terminal and go to dir of your application. then, run the bellow command:"
	echo
	red "$ sh manager.sh"
	echo	
	cyan "Use from it and be Fun :)"
	echo
	sleep 0.5
	cyan "Creator: Peaka"
	sleep 0.5
	cyan "Github: https://github.com/saeedrezaghazanfari/"
	cyan "MyId in tel, insta: @SaeedReza_WU"
	echo

# exit from manager.sh
elif [ $FLAG = 9 ]; then

	clear
	echo "have good time!"

else
	echo "Your input is invalid!"
fi
