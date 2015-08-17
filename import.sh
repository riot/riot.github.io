# store the riot submodules in an array
SUBMODULES=(router observable)

# clone the riot submodules in a temporary folder
function clone {
  git clone git@github.com:riot/$1.git tmp/$1
}

# update the doc files merging the doc files from each single submodule
function update {
  tmp_file=api/$1-tmp.md
  # take the header from the old api file
  sed -n -e  "1,/{% include api-tabs.html %}/w $tmp_file" api/$1.md
  # print the doc/api.md of each submodule after the files headers
  tail -n +2 tmp/$1/doc/api.md >> $tmp_file
  # prefix the submodule api methods using riot (observable => riot.observable)
  sed -i '' "s/$1/riot.$1/g" $tmp_file
  # replace the old api file
  mv $tmp_file api/$1.md
}

# loop all the submodules
for sumbodule in ${SUBMODULES[@]}; do
  clone ${sumbodule}
  update ${sumbodule}
done

# remove the temporary folder
rm -rf tmp
