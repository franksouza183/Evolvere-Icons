#!/bin/sh


echo "Running ..."


replace_strings()
{
	
	replace_1='style="fill-opacity:.75;fill:currentColor" class="ColorScheme-Text"'
	replace_1_1='style="fill:none;stroke-linecap:round;stroke-linejoin:round;stroke-opacity:.75;stroke-width:2;stroke:currentColor" class="ColorScheme-Text"'
	replace_1_2='style="fill:none;stroke-opacity:.75;stroke-width:1.1;stroke:currentColor" class="ColorScheme-Text"'
	
	replace_2='style="fill-opacity:.5;fill:currentColor" class="ColorScheme-Background"'
	replace_2_1='style="fill:none;stroke-opacity:.5;stroke-width:1.1;stroke:currentColor" class="ColorScheme-Background"'
	
	replace_3='style="'
	
	data=( \
	'style="color:#000000;fill-opacity:.76621;fill:#090d11;paint-order:normal"-----------'"$replace_1" \
	'style="color:#000000;fill-opacity:.75328;fill:#27303a"-----------'"$replace_1" \
	'color="#000000" fill="#0c1218" fill-opacity=".72157" style="paint-order:normal"-----------'"$replace_1" \
	'style="fill-opacity:.75328;fill:#27303a"-----------'"$replace_1" \
	'style="block-progression:tb;color:#000000;fill-opacity:.75328;fill:#27303a;text-indent:0;text-transform:none"-----------'"$replace_1" \
	'style="color:#000000;fill:none;stroke-linecap:round;stroke-linejoin:round;stroke-opacity:.76471;stroke-width:2;stroke:#090d11"-----------'"$replace_1_1" \
	'style="fill:none;paint-order:normal;stroke-opacity:.76471;stroke-width:1.1;stroke:#090d11"-----------'"$replace_1_2" \
	
	'style="color:#090d11;-----------'"$replace_3" \
	
	'style="color:#000000;fill-opacity:.90289;fill:#f1f3f5"-----------'"$replace_2" \
	'color="#000000" fill="url(#b)" style="block-progression:tb;fill:#ffffff;font-variant-east_asian:normal;paint-order:normal;text-indent:0;text-transform:none"-----------'"$replace_2" \
	'style="block-progression:tb;color:#000000;fill-opacity:.90289;fill:#f1f3f5;text-indent:0;text-transform:none"-----------'"$replace_2" \
	'style="color:#000000;fill-opacity:.90289;fill:#f1f3f5;text-decoration-line:none;text-indent:0;text-transform:none"-----------'"$replace_2" \
	'style="fill:none;paint-order:normal;stroke-opacity:.76471;stroke-width:1.1;stroke:url(#b)"-----------'"$replace_2_1" \
	'style="color:#ffffff;-----------'"$replace_3" \
	'style="color:#000000;fill-opacity:.90289;fill:#f1f3f5;text-indent:0;text-transform:none"-----------'"$replace_2" \
	)
	
# 	echo "Running"
	
	string="$1"
	
	for elt in "${data[@]}"
	do
		
			#replace [spaces] with %20
			elt=${elt//" "/"%20"}
			#replace , with [space]
			elt=${elt//'"'/'[][][]'}
			elt=${elt//"-----------"/"\" \""}
			
		echo "Running line \"$elt\""
		
		#create the array with main values
		eval "array=(\"$elt\")"
		str_find="${array[0]}"
			str_find=${str_find//"%20"/" "}
			str_find=${str_find//"/"/"\/"}
			str_find=${str_find//"[][][]"/'"'}
			
		str_replace="${array[1]}"
			str_replace=${str_replace//"%20"/" "}
			str_replace=${str_replace//"/"/"\/"}
			str_replace=${str_replace//"[][][]"/'"'}

		echo "str_find: \"$str_find\""
		echo "str_replace: \"$str_replace\""
		
		sed -i "s/$str_find/$str_replace/g" $f;
		
# 		echo "everwriting now"
		
	done

}

count=`ls -1 "$1/"*.svg 2>/dev/null | wc -l`
if [ $count != 0 ]; then 
	
	for f in "$1/"*.svg; do \
		
		echo "File: $f"
		
		if [[ ! -L "$f" ]] ; then
			
			replace_strings $f;
			
		fi

	done

fi


exit
