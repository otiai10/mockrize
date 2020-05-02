
default: clean vendor

clean:
	rm -rf src/views/vendor

vendor: src/views/vendor/bootstrap src/views/vendor/highlight

src/views/vendor/bootstrap:
	mkdir -p src/views/vendor/bootstrap
	wget --quiet https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css --directory-prefix src/views/vendor/bootstrap

src/views/vendor/highlight:
	mkdir -p src/views/vendor/highlight
	wget --quiet https://cdnjs.cloudflare.com/ajax/libs/highlight.js/10.0.1/styles/default.min.css --directory-prefix src/views/vendor/highlight
	wget --quiet https://cdnjs.cloudflare.com/ajax/libs/highlight.js/10.0.1/highlight.min.js --directory-prefix src/views/vendor/highlight
