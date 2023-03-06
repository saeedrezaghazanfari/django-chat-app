#!/bin/bash
# V2.1
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
PWD=$(pwd)
echo "Cureent dir:" $PWD
echo 
echo "#  1. Run"
echo "#  2. Git"
echo "#  3. Search"
echo "#  4. Translation"
echo "#  5. Install a package"
echo "#  6. Uninstall a package"
echo "#  7. Migrations & Migrate"
echo "#  8. Flush DB"
echo "#  9. Remove Migrations"
echo "# 10. Remove Pycaches"
echo "# 11. About"
echo "# 12. Exit"
echo
read -p "Enter your Selection: " FLAG
echo


# run django server on port 8000
if [ $FLAG = 1 ]; then
	
	clear
	PWD=$(pwd)
	echo "Cureent dir:" $PWD
	echo
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


# search in all of project
elif [ $FLAG = 3 ]; then

	clear
	echo 
	echo "# 1 => Search in file contents"
	echo "# 2 => Search in file names"
	echo "# 3 => Search in dir names"
	echo
	read -p "Enter your Selection: " METHOD

	if [ $METHOD = 1 ]; then

		clear
		echo "# Search in file Contents"
		echo
		read -p "Enter your string: " QUERY
		echo
		grep -nr $QUERY . 

	elif [ $METHOD = 2 ]; then

		clear
		echo "# Search in file Names"
		echo
		read -p "Enter your string: " QUERY
		echo
		find . -type f -iname "$QUERY"

	elif [ $METHOD = 3 ]; then

		clear
		echo "# Search in dir Names"
		echo
		read -p "Enter your string: " QUERY
		echo
		find . -type d -iname "$QUERY"

	else
		echo "Your input is invalid!"
	fi


# django project translation
elif [ $FLAG = 4 ]; then

	clear
	read -p "Your selection is 'Project Translation', Are you Sure? [n/Y] " SUREMENT

	if [ $SUREMENT = 'Y' ]; then

		clear
		echo 
		echo "tip: our Languages Are: EN AR RU"
		echo "# 1 => Create Base of files (.po)"
		echo "# 2 => Compile files, After end of translation (.mo)"
		echo
		read -p "Enter your Selection: " METHOD

		if [ $METHOD = 1 ]; then

			. venv/bin/activate
			
			for DIR in $(find . -type d -iname "chatapp")
			do
				cd $DIR
				mkdir locale
				echo
				django-admin makemessages -l en
				django-admin makemessages -l ar
				django-admin makemessages -l ru
				echo ".po files Generated in " $DIR " Directory." 
				cd ..
			done

		elif [ $METHOD = 2 ]; then

			. venv/bin/activate

			for DIR in $(find . -type d -iname "chatapp")
			do
				cd $DIR
				echo
				django-admin compilemessages -l en
				django-admin compilemessages -l ar
				django-admin compilemessages -l ru
				echo ".mo files Generated in " $DIR " Directory." 
				cd ..
			done

		else
			echo "Your input is invalid!"
		fi

	else
		echo "Your input is invalid!"
	fi

# install a package
elif [ $FLAG = 5 ]; then
	
	clear
	read -p "Enter Package Name to install: " PACKAGE

	. venv/bin/activate
	pip install $PACKAGE
	echo
	pip freeze
	pip freeze > ./requirements.txt


# uninstall a package
elif [ $FLAG = 6 ]; then
	
	clear

	read -p "Enter Package Name to uninstall: " PACKAGE

	. venv/bin/activate
	pip uninstall $PACKAGE
	echo
	pip freeze
	pip freeze > ./requirements.txt


# makemigrations and migrate db
elif [ $FLAG = 7 ]; then
	
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


# flush db
elif [ $FLAG = 8 ]; then

	clear
	read -p "Your selection is 'Flush DB', Are you Sure? [n/Y] " SUREMENT

	if [ $SUREMENT = 'Y' ]; then

		. venv/bin/activate
		python3 manage.py flush

		echo "at now, You must create superUser with this Command: "
		echo ". venv/bin/activate; python3 manage.py createsuperuser"

	else
		echo "Exited!"
	fi


# delete all of 00*.py files of migrations dir
elif [ $FLAG = 9 ]; then
	
	clear
	read -p "Your selection is 'Remove Migration Files', Are you Sure? [n/Y] " SUREMENT

	if [ $SUREMENT = 'Y' ]; then

		for FILE in $(find ./chatapp/migrations/ -type f -iname "00*.py")
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
elif [ $FLAG = 10 ]; then

	clear
	read -p "Your selection is 'Remove PyCache Files', Are you Sure? [n/Y] " SUREMENT

	if [ $SUREMENT = 'Y' ]; then

		for FILE in $(find ./chatapp/__pycache__/)
		do
			rm -rf $FILE
			echo "Dir '" $FILE "' is removed!"
		done

		for FILE in $(find ./chatapp/*/__pycache__/)
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
elif [ $FLAG = 11 ]; then

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
	cyan "creator: Peaka"
	sleep 0.5
	cyan "version: 2.1"
	sleep 0.5
	cyan "github: https://github.com/saeedrezaghazanfari/"
	sleep 0.5
	cyan "my id in some of social networks: @SaeedReza_WU"
	sleep 0.5
	echo

# exit from manager.sh
elif [ $FLAG = 12 ]; then

	clear
	echo "have good time!"

else
	echo "Your input is invalid!"
fi
