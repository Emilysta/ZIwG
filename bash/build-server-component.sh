#!/bin/bash

prjName=$1
if [ -z "$prjName" ]; then
    echo "No project name"
    exit 1
fi

buildPath="~build"
codePath="."
# root="$( cd "$( dirname "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )/.."
root="."
# todo root dir problem

outputPath="$root/$buildPath/$prjName"
prjPath="$root/$codePath/$prjName"

mkdir "$outputPath" -p;

echo "----------------------------------"
echo "Building $prjName"
echo "$prjPath to $outputPath"
echo "----------------------------------"

dotnet publish "$prjPath" -o "$outputPath" --runtime linux-x64 --self-contained false;

function update_version {
    here=$(pwd)
    cd "$1"
    version=$(git describe --tags $(git rev-list --tags --max-count=1))
    cd "$here"

    property="AppVersion"
    sed -i "s/\"$property\": \"\"/\"$property\": \"$version\"/g" "$1/appsettings.Development.json"
}

# update_version "$outputPath"
