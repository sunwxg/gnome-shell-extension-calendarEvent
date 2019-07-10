// -*- mode: js2; indent-tabs-mode: nil; js2-basic-offset: 4 -*-

const Clutter = imports.gi.Clutter;

const Calendar = imports.ui.calendar;
const Util = imports.misc.util;

const ExtensionUtils = imports.misc.extensionUtils;
const Me = ExtensionUtils.getCurrentExtension();
const Convenience = Me.imports.convenience;


class Event {
    constructor() {
        this._formatEventTimeOrigin = Calendar.EventMessage.prototype._formatEventTime;
    }

    enable() {
        Calendar.EventMessage.prototype._formatEventTime = _formatEventTime;
    }

    disable() {
        Calendar.EventMessage.prototype._formatEventTime = this._formatEventTimeOrigin;
    }
}

function _formatEventTime() {
    let periodBegin = Calendar._getBeginningOfDay(this._date);
    let periodEnd = Calendar._getEndOfDay(this._date);
    let allDay = (this._event.allDay || (this._event.date <= periodBegin &&
        this._event.end >= periodEnd));
    let title;
    if (allDay) {
        /* Translators: Shown in calendar event list for all day events
         * Keep it short, best if you can use less then 10 characters
         */
        title = C_("event list time", "All Day");
    } else {
        let date = this._event.date >= periodBegin ? this._event.date
            : this._event.end;
        title = Util.formatTime(date, { timeOnly: true });
        // Add event time begin + end
        let begin = Util.formatTime(this._event.date, { timeOnly: true });
        let end = Util.formatTime(this._event.end, { timeOnly: true });
        title = begin + ' - ' + end;
    }

    let rtl = Clutter.get_default_text_direction() == Clutter.TextDirection.RTL;
    if (this._event.date < periodBegin && !this._event.allDay) {
        if (rtl)
            title = title + ELLIPSIS_CHAR;
        else
            title = ELLIPSIS_CHAR + title;
    }
    if (this._event.end > periodEnd && !this._event.allDay) {
        if (rtl)
            title = ELLIPSIS_CHAR + title;
        else
            title = title + ELLIPSIS_CHAR;
    }
    return title;
}

let event;

function init(metadata) {
    event = new Event();
}

function enable() {
    event.enable();
}

function disable() {
    event.disable();
}
