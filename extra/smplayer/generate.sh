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


inkscape --file=$prefix/../../devices/16/input-mouse.svg -C -d 1024 -e $prefix/Evolvere/mouse.png
inkscape --file=$prefix/../../devices/16/drive-optical.svg -C -d 1024 -e $prefix/Evolvere/dvd.png

inkscape --file=$prefix/../../actions/16/show-menu.svg -C -d 1024 -e $prefix/Evolvere/playlist.png
inkscape --file=$prefix/../../actions/16/documentinfo.svg -C -d 1024 -e $prefix/Evolvere/info.png
inkscape --file=$prefix/../../actions/16/media-playlist-repeat.svg -C -d 1024 -e $prefix/Evolvere/repeat.png
inkscape --file=$prefix/../../actions/16/play.svg -C -d 1024 -e $prefix/Evolvere/play.png
inkscape --file=$prefix/../../actions/16/shuffle.svg -C -d 1024 -e $prefix/Evolvere/shuffle.png
inkscape --file=$prefix/../../actions/16/dialog-text-and-font.svg -C -d 1024 -e $prefix/Evolvere/sub.png
inkscape --file=$prefix/../../actions/16/kdenlive-show-markers.svg -C -d 1024 -e $prefix/Evolvere/pref_playlist.png
inkscape --file=$prefix/../../actions/16/gtk-open.svg -C -d 1024 -e $prefix/Evolvere/open.png
inkscape --file=$prefix/../../actions/16/document-edit.svg -C -d 1024 -e $prefix/Evolvere/title.png
inkscape --file=$prefix/../../actions/16/document-save.svg -C -d 1024 -e $prefix/Evolvere/save.png
inkscape --file=$prefix/../../actions/16/reload.svg -C -d 1024 -e $prefix/Evolvere/refresh.png
inkscape --file=$prefix/../../actions/16/reload.svg -C -d 1024 -e $prefix/Evolvere/pref_updates.png
inkscape --file=$prefix/../../actions/16/kdenlive-show-audio.svg -C -d 1024 -e $prefix/Evolvere/volume.png
inkscape --file=$prefix/../../actions/16/kdenlive-hide-audio.svg -C -d 1024 -e $prefix/Evolvere/mute.png
inkscape --file=$prefix/../../actions/16/media-playback-stop.svg -C -d 1024 -e $prefix/Evolvere/stop.png
inkscape --file=$prefix/../../actions/16/media-seek-forward.svg -C -d 1024 -e $prefix/Evolvere/next.png
inkscape --file=$prefix/../../actions/16/media-seek-backward.svg -C -d 1024 -e $prefix/Evolvere/previous.png
inkscape --file=$prefix/../../actions/16/up.svg -C -d 1024 -e $prefix/Evolvere/up.png
inkscape --file=$prefix/../../actions/16/up.svg -C -d 1024 -e $prefix/Evolvere/audio_up.png
inkscape --file=$prefix/../../actions/16/down.svg -C -d 1024 -e $prefix/Evolvere/down.png
inkscape --file=$prefix/../../actions/16/down.svg -C -d 1024 -e $prefix/Evolvere/audio_down.png
inkscape --file=$prefix/../../actions/16/edit-copy.svg -C -d 1024 -e $prefix/Evolvere/copy.png
inkscape --file=$prefix/../../actions/16/edit-clear.svg -C -d 1024 -e $prefix/Evolvere/clear_left.png
inkscape --file=$prefix/../../actions/16/download.svg -C -d 1024 -e $prefix/Evolvere/download_subs.png
inkscape --file=$prefix/../../actions/16/window-close.svg -C -d 1024 -e $prefix/Evolvere/close.png
inkscape --file=$prefix/../../actions/16/create-link.svg -C -d 1024 -e $prefix/Evolvere/url.png

inkscape --file=$prefix/../../apps/16/display.svg -C -d 1024 -e $prefix/Evolvere/monitor.png
inkscape --file=$prefix/../../apps/16/keyboard.svg -C -d 1024 -e $prefix/Evolvere/keyboard.png
inkscape --file=$prefix/../../apps/16/org.gnome.photos.svg -C -d 1024 -e $prefix/Evolvere/screenshot.png
inkscape --file=$prefix/../../apps/16/youtube.svg -C -d 1024 -e $prefix/Evolvere/tubebrowser.png
inkscape --file=$prefix/../../apps/16/tv.svg -C -d 1024 -e $prefix/Evolvere/type_television.png
inkscape --file=$prefix/../../apps/16/tv.svg -C -d 1024 -e $prefix/Evolvere/open_tv.png
inkscape --file=$prefix/../../apps/16/logviewer.svg -C -d 1024 -e $prefix/Evolvere/logs.png
inkscape --file=$prefix/../../apps/16/gtk-preferences.svg -C -d 1024 -e $prefix/Evolvere/pref_general.png
inkscape --file=$prefix/../../apps/16/gtk-preferences.svg -C -d 1024 -e $prefix/Evolvere/prefs.png
inkscape --file=$prefix/../../apps/16/preferences-desktop-effects.svg -C -d 1024 -e $prefix/Evolvere/video_filters.png
inkscape --file=$prefix/../../apps/16/chronometer.svg -C -d 1024 -e $prefix/Evolvere/speed.png

inkscape --file=$prefix/../../places/16/folder-videos.svg -C -d 1024 -e $prefix/Evolvere/type_video.png
inkscape --file=$prefix/../../places/16/favorites.svg -C -d 1024 -e $prefix/Evolvere/tips.png
inkscape --file=$prefix/../../places/16/favorites.svg -C -d 1024 -e $prefix/Evolvere/open_favorites.png
inkscape --file=$prefix/../../places/16/folder-musics.svg -C -d 1024 -e $prefix/Evolvere/audio_track.png

inkscape --file=$prefix/../../status/16/dialog-warning.svg -C -d 1024 -e $prefix/Evolvere/warning.png

exit
