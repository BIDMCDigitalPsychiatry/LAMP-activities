#!/bin/bash 

# Optionally specify which directories only to build.
ALL_ARGS=${*:1} # Join all args as one big string.
UNIT_LIST=${ALL_ARGS:-*/} # If no args provided, use */ glob instead.

# All directories with a package.json are treated as build units.
for dir in $UNIT_LIST; do (
	if [ -f $dir/package.json ]; then 
		cd $dir

		# Enter the sub-project.
		name=$(basename "$PWD" | awk '{print tolower($0)}')
		echo "Building $name..."

		# Install & Build
		npm install --legacy-peer-deps || exit 1
		npm run build || exit 1

		# Compress for distribution and move to /dist/ directory.
		../compress_activity.sh || exit 1
		mv dist.html ../dist/in/$name.html
		mv dist.html.b64 ../dist/out/$name.html.b64
	fi
); done

# Patch for copying Jewels -> JewelsPro (if it was modified/built).
if [ -f ./dist/*/jewelspro.html.* ]; then 
	echo "Patching jewels..."
	cp ./dist/in/jewelspro.html ./dist/in/jewels.html
	cp ./dist/out/jewelspro.html.b64 ./dist/out/jewels.html.b64
fi
