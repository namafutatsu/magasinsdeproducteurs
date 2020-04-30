include node_modules/systematic/mk/main.mk

deploy:
	rsync -avz --delete -e ssh dist/ myserver:projects/mdp.laflaque.fr/dist/
