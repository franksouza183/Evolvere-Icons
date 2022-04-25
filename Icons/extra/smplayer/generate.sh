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


inkscape -C -d 1024 --export-filename="$prefix/Evolvere/mouse.png" $prefix/../../devices/16/input-mouse.svg
inkscape -C -d 1024 --export-filename="$prefix/Evolvere/dvd.png" $prefix/../../devices/16/drive-optical.svg

inkscape -C -d 1024 --export-filename="$prefix/Evolvere/playlist.png" $prefix/../../actions/16/show-menu.svg
inkscape -C -d 1024 --export-filename="$prefix/Evolvere/info.png" $prefix/../../actions/16/documentinfo.svg
inkscape -C -d 1024 --export-filename="$prefix/Evolvere/repeat.png" $prefix/../../actions/16/media-playlist-repeat.svg
inkscape -C -d 1024 --export-filename="$prefix/Evolvere/play.png" $prefix/../../actions/16/play.svg
inkscape -C -d 1024 --export-filename="$prefix/Evolvere/shuffle.png" $prefix/../../actions/16/shuffle.svg
inkscape -C -d 1024 --export-filename="prefix/Evolvere/sub.png" $prefix/../../actions/16/dialog-text-and-font.svg
inkscape -C -d 1024 --export-filename="$prefix/Evolvere/pref_playlist.png" $prefix/../../actions/16/kdenlive-show-markers.svg

inkscape -C -d 1024 --export-filename="$prefix/Evolvere/open.png" $prefix/../../actions/16/gtk-open.svg
inkscape -C -d 1024 --export-filename="$prefix/Evolvere/title.png" $prefix/../../actions/16/document-edit.svg
inkscape -C -d 1024 --export-filename="$prefix/Evolvere/save.png" $prefix/../../actions/16/document-save.svg
inkscape -C -d 1024 --export-filename="$prefix/Evolvere/refresh.png" $prefix/../../actions/16/reload.svg
inkscape -C -d 1024 --export-filename="$prefix/Evolvere/pref_updates.png" $prefix/../../actions/16/reload.svg

inkscape -C -d 1024 --export-filename="$prefix/Evolvere/volume.png" $prefix/../../status/16/audio-volume-high-panel.svg
inkscape -C -d 1024 --export-filename="$prefix/Evolvere/mute.png" $prefix/../../status/16/audio-volume-muted-panel.svg
inkscape -C -d 1024 --export-filename="$prefix/Evolvere/stop.png" $prefix/../../actions/16/media-playback-stop.svg
inkscape -C -d 1024 --export-filename="$prefix/Evolvere/next.png" $prefix/../../actions/16/media-seek-forward.svg
inkscape -C -d 1024 --export-filename="$prefix/Evolvere/previous.png" $prefix/../../actions/16/media-seek-backward.svg
inkscape -C -d 1024 --export-filename="$prefix/Evolvere/up.png" $prefix/../../actions/16/up.svg
inkscape -C -d 1024 --export-filename="$prefix/Evolvere/audio_up.png" $prefix/../../actions/16/up.svg
inkscape -C -d 1024 --export-filename="$prefix/Evolvere/down.png" $prefix/../../actions/16/down.svg
inkscape -C -d 1024 --export-filename="$prefix/Evolvere/audio_down.png" $prefix/../../actions/16/down.svg
inkscape -C -d 1024 --export-filename="$prefix/Evolvere/copy.png" $prefix/../../actions/16/edit-copy.svg
inkscape -C -d 1024 --export-filename="$prefix/Evolvere/clear_left.png" $prefix/../../actions/16/edit-clear.svg
inkscape -C -d 1024 --export-filename="$prefix/Evolvere/download_subs.png" $prefix/../../actions/16/download.svg
inkscape -C -d 1024 --export-filename="$prefix/Evolvere/close.png" $prefix/../../actions/16/window-close.svg
inkscape -C -d 1024 --export-filename="$prefix/Evolvere/url.png" $prefix/../../actions/16/create-link.svg

inkscape -C -d 1024 --export-filename="$prefix/Evolvere/monitor.png" $prefix/../../apps/16/display.svg
inkscape -C -d 1024 --export-filename="$prefix/Evolvere/keyboard.png" $prefix/../../apps/16/keyboard.svg
inkscape -C -d 1024 --export-filename="$prefix/Evolvere/screenshot.png" $prefix/../../apps/16/org.gnome.photos.svg
inkscape -C -d 1024 --export-filename="$prefix/Evolvere/tubebrowser.png" $prefix/../../apps/16/youtube.svg
inkscape -C -d 1024 --export-filename="$prefix/Evolvere/type_television.png" $prefix/../../apps/16/tv.svg
inkscape -C -d 1024 --export-filename="$prefix/Evolvere/open_tv.png" $prefix/../../apps/16/tv.svg
inkscape -C -d 1024 --export-filename="$prefix/Evolvere/logs.png" $prefix/../../apps/16/logviewer.svg
inkscape -C -d 1024 --export-filename="$prefix/Evolvere/pref_general.png" $prefix/../../apps/16/gtk-preferences.svg
inkscape -C -d 1024 --export-filename="$prefix/Evolvere/prefs.png" $prefix/../../apps/16/gtk-preferences.svg
inkscape -C -d 1024 --export-filename="$prefix/Evolvere/video_filters.png" $prefix/../../apps/16/preferences-desktop-effects.svg
inkscape -C -d 1024 --export-filename="$prefix/Evolvere/speed.png" $prefix/../../apps/16/chronometer.svg

inkscape -C -d 1024 --export-filename="$prefix/Evolvere/type_video.png" $prefix/../../places/16/folder-videos.svg
inkscape -C -d 1024 --export-filename="$prefix/Evolvere/tips.png" $prefix/../../places/16/favorites.svg
inkscape -C -d 1024 --export-filename="$prefix/Evolvere/open_favorites.png" $prefix/../../places/16/favorites.svg
inkscape -C -d 1024 --export-filename="$prefix/Evolvere/audio_track.png" $prefix/../../places/16/folder-musics.svg

inkscape -C -d 1024 --export-filename="$prefix/Evolvere/warning.png" $prefix/../../status/16/dialog-warning.svg
inkscape -C -d 1024 --export-filename="$prefix/Evolvere/exit.png" $prefix/../../actions/16/system-shutdown.svg
inkscape -C -d 1024 --export-filename="$prefix/Evolvere/rewind10s.png" $prefix/../../actions/16/media-seek-backward.svg
inkscape -C -d 1024 --export-filename="$prefix/Evolvere/forward10s.png" $prefix/../../actions/16/media-seek-forward.svg
inkscape -C -d 1024 --export-filename="$prefix/Evolvere/rotate.png" $prefix/../../actions/16/object-rotate-left.svg
inkscape -C -d 1024 --export-filename="$prefix/Evolvere/mirror.png" $prefix/../../actions/16/object-flip-horizontal.svg
inkscape -C -d 1024 --export-filename="$prefix/Evolvere/flip.png" $prefix/../../actions/16/object-flip-vertical.svg
inkscape -C -d 1024 --export-filename="$prefix/Evolvere/minus.png" $prefix/../../actions/16/remove.svg
inkscape -C -d 1024 --export-filename="$prefix/Evolvere/ok.png" $prefix/../../actions/16/dialog-ok.svg
inkscape -C -d 1024 --export-filename="$prefix/Evolvere/fullscreen.png" $prefix/../../actions/16/fullscreen.svg
inkscape -C -d 1024 --export-filename="$prefix/Evolvere/audio_filters.png" $prefix/../../actions/16/view-filter.svg
inkscape -C -d 1024 --export-filename="$prefix/Evolvere/pref_performance.png" $prefix/../../apps/16/launcher.svg
inkscape -C -d 1024 --export-filename="$prefix/Evolvere/hearth.png" $prefix/../../apps/16/preferences-system-windows.svg
inkscape -C -d 1024 --export-filename="$prefix/Evolvere/compact.png" $prefix/../../apps/16/preferences-system-windows.svg
inkscape -C -d 1024 --export-filename="$prefix/Evolvere/ontop.png" $prefix/../../apps/16/window-duplicate.svg
inkscape -C -d 1024 --export-filename="$prefix/Evolvere/type_audio.png" $prefix/../../apps/16/audio-editor.svg
inkscape -C -d 1024 --export-filename="$prefix/Evolvere/pref_subtitles.png" $prefix/../../apps/16/subtitles.svg
inkscape -C -d 1024 --export-filename="$prefix/Evolvere/sub.png" $prefix/../../apps/16/subtitles.svg
inkscape -C -d 1024 --export-filename="$prefix/Evolvere/pref_advanced.png" $prefix/../../categories/16/applications-science.svg
inkscape -C -d 1024 --export-filename="$prefix/Evolvere/recents.png" $prefix/../../actions/16/document-open-recent.svg
inkscape -C -d 1024 --export-filename="$prefix/Evolvere/plus.png" $prefix/../../actions/16/add.svg
inkscape -C -d 1024 --export-filename="$prefix/Evolvere/delete.png" $prefix/../../actions/16/edit-delete.svg

exit
