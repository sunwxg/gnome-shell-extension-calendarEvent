
submit:
	cd calendarEvent@sun.wxg@gmail.com/ && zip -r ~/calendarEvent.zip *

install:
	rm -rf ~/.local/share/gnome-shell/extensions/calendarEvent@sun.wxg@gmail.com
	cp -r calendarEvent@sun.wxg@gmail.com ~/.local/share/gnome-shell/extensions/

