
clean:
	-rm -rf tmp
	-rm -rf dist
	-rm -rf node_modules

install:
	-rm -rf tmp
	-rm -rf dist
	broccoli build dist
	mocha tests
