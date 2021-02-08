#!/bin/sh

# Replace env vars in JavaScript files
echo "Replacing env vars in JS"
for file in  /usr/share/nginx/html/js/app.*.js;
do
  echo "Processing $file ...";

  # Use the existing JS file as template
  if [ ! -f $file.tmpl.js.map ]; then
    cp $file $file.tmpl.js.map
  fi

  envsubst '$VUE_APP_BACKEND_HOST' < $file.tmpl.js.map > $file
done

for file in  /usr/share/nginx/html/js/app.*.js.map;
do
  echo "Processing $file ...";

  # Use the existing JS file as template
  if [ ! -f $file.tmpl.js.map ]; then
    cp $file $file.tmpl.js.map
  fi

  envsubst '$VUE_APP_BACKEND_HOST' < $file.tmpl.js.map > $file
done

for file in  /usr/share/nginx/html/js/chunk-vendors.*.js.map;
do
  echo "Processing $file ...";

  # Use the existing JS file as template
  if [ ! -f $file.tmpl.js.map ]; then
    cp $file $file.tmpl.js.map
  fi

  envsubst '$VUE_APP_BACKEND_HOST' < $file.tmpl.js.map > $file
done

for file in  /usr/share/nginx/html/js/chunk-vendors.*.js;
do
  echo "Processing $file ...";

  # Use the existing JS file as template
  if [ ! -f $file.tmpl.js.map ]; then
    cp $file $file.tmpl.js.map
  fi

  envsubst '$VUE_APP_BACKEND_HOST' < $file.tmpl.js.map > $file
done

echo "Finish"
