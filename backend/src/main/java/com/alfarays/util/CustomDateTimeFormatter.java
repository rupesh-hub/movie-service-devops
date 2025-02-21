package com.alfarays.util;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.ZonedDateTime;
import java.time.ZoneId;
import java.time.format.FormatStyle;
import java.time.format.DateTimeFormatter;
import java.util.Locale;

public final class CustomDateTimeFormatter {

    private CustomDateTimeFormatter() {
    }

    public static String formatDate(LocalDate date, Locale locale) {
        if (date == null) {
            return "";
        }
        DateTimeFormatter formatter = DateTimeFormatter.ofLocalizedDate(FormatStyle.LONG).withLocale(locale);
        return date.format(formatter);
    }

    public static String formatDateTime(LocalDateTime dateTime, Locale locale) {
        if (dateTime == null) {
            return "";
        }
        // Convert LocalDateTime to ZonedDateTime using system default timezone
        ZonedDateTime zonedDateTime = dateTime.atZone(ZoneId.systemDefault());
        DateTimeFormatter formatter = DateTimeFormatter.ofLocalizedDateTime(FormatStyle.LONG).withLocale(locale);
        return zonedDateTime.format(formatter);
    }

    // Overloaded methods for default locale (if needed)
    public static String formatDate(LocalDate date) {
        return formatDate(date, Locale.getDefault());
    }

    public static String formatDateTime(LocalDateTime dateTime) {
        return formatDateTime(dateTime, Locale.getDefault());
    }

}
