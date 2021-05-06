#!/bin/bash 

# All directories with a package.json are treated as build units.
for dir in */; do
	if [ -f $dir/package.json ]; then
		pushd $dir

		# Enter the sub-project.
		name=$(basename "$PWD" | awk '{print tolower($0)}')
		echo "Building $name..."

		# Install & Build
		npm install 
		npm run build

		# Compress for distribution and move to /dist/ directory.
		../dist/compress_activity.sh
		mv dist.html ../dist/in/$name.html
		mv dist.html.b64 ../dist/out/$name.html.b64

		popd
	fi
done

# Patch for Jewels -> JewelsPro
cp ./dist/in/jewelspro.html ./dist/in/jewels.html
cp ./dist/out/jewelspro.html.b64 ./dist/out/jewels.html.b64
