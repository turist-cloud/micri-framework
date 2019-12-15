# Config
NCC := "./node_modules/.bin/ncc"
ENDPOINTS := \
	api-a
# End of Config

# NCC build
# BUILD_DIR := the base directory of a microservice
define build-command
	rm -rf "$(BUILD_DIR)/dist"
	mkdir -p "$(BUILD_DIR)/dist"
	$(NCC) build "$(BUILD_DIR)/src/index.ts" -m -s -o "$(BUILD_DIR)/dist"
endef

# Automagic
ENDPOINTS_JS := $(patsubst %, %/dist/index.js, $(ENDPOINTS))

all: $(ENDPOINTS_JS)
.PHONY: all clean

node_modules:
	yarn install

$(ENDPOINTS): %: %/dist/index.js

$(ENDPOINTS_JS): %/dist/index.js: node_modules $(wildcard %/src/*.ts) $(wildcard lib/*/*.ts)
	$(eval BUILD_DIR := $(subst /dist/,,$(dir $@)))
	@echo "Build $(BUILD_DIR)"
	$(build-command)

clean:
	$(eval DIRS := $(dir $(ENDPOINTS_JS)))
	rm -rf $(DIRS)
