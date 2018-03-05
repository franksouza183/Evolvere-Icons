#!/bin/bash

currentscriptpath()
{
local fullpath=`echo "$(readlink -f $0)"`
local fullpath_length=`echo ${#fullpath}`
local scriptname="$(basename $0)"
local scriptname_length=`echo ${#scriptname}`
local result_length=`echo $fullpath_length - $scriptname_length - 1 | bc`
local result=`echo $fullpath | head -c $result_length`
echo $result
}

prefix=`currentscriptpath`


inkscape --file=$prefix/../../actions/24/kdenlive-show-audio.svg -C -d 1024 -e $prefix/Evolvere/volume.png
inkscape --file=$prefix/../../actions/24/kdenlive-hide-audio.svg -C -d 1024 -e $prefix/Evolvere/mute.png
inkscape --file=$prefix/../../actions/24/media-playback-stop.svg -C -d 1024 -e $prefix/Evolvere/stop.png
inkscape --file=$prefix/../../actions/24/media-seek-forward.svg -C -d 1024 -e $prefix/Evolvere/next.png
inkscape --file=$prefix/../../actions/24/media-seek-backward.svg -C -d 1024 -e $prefix/Evolvere/previous.png
inkscape --file=$prefix/../../actions/24/up.svg -C -d 1024 -e $prefix/Evolvere/up.png
inkscape --file=$prefix/../../actions/24/up.svg -C -d 1024 -e $prefix/Evolvere/audio_up.png
inkscape --file=$prefix/../../actions/24/down.svg -C -d 1024 -e $prefix/Evolvere/down.png
inkscape --file=$prefix/../../actions/24/down.svg -C -d 1024 -e $prefix/Evolvere/audio_down.png
inkscape --file=$prefix/../../actions/24/edit-copy.svg -C -d 1024 -e $prefix/Evolvere/copy.png
inkscape --file=$prefix/../../actions/24/edit-clear.svg -C -d 1024 -e $prefix/Evolvere/clear_left.png
inkscape --file=$prefix/../../actions/24/download.svg -C -d 1024 -e $prefix/Evolvere/download_subs.png
inkscape --file=$prefix/../../actions/24/window-close.svg -C -d 1024 -e $prefix/Evolvere/close.png

inkscape --file=$prefix/../../apps/24/youtube.svg -C -d 1024 -e $prefix/Evolvere/tubebrowser.png

inkscape --file=$prefix/../../places/24/folder-musics.svg -C -d 1024 -e $prefix/Evolvere/audio_track.png

exit
