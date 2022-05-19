export function longDateFormat(dateString: string): string {
    let date = new Date(dateString);
    let returnDateString: string;
    let day: string = formatNumberString(date.getDate());
    let month: string = formatNumberString(date.getMonth() + 1);
    let hours: string = formatNumberString(date.getHours());
    let minutes: string = formatNumberString(date.getMinutes());
    returnDateString = `${day}.${month}.${date.getFullYear()} ${hours}:${minutes}`;
    return returnDateString;
}

export function longLocaleDateFormat(dateString: string): string {
    let date: Date;
    try {
        if (!dateString.includes('z'))
            date = new Date(dateString + "z");
    }
    catch {
        // here dateString is a `Date` type! (really...)
        console.log(typeof (dateString) === 'object', typeof (dateString) === 'string')
        date = new Date(dateString)
    }
    let returnDateString: string;
    let day: string = formatNumberString(date.getDate());
    let month: string = formatNumberString(date.getMonth() + 1);
    let hours: string = formatNumberString(date.getHours());
    let minutes: string = formatNumberString(date.getMinutes());
    returnDateString = `${day}.${month}.${date.getFullYear()} ${hours}:${minutes}`;
    return returnDateString;
}

export function longLocaleDateFormatForDate(dateString: Date): string {
    if (dateString) {
        let date: Date = dateString
        date.setTime(date.getTime() - date.getTimezoneOffset() * 60 * 1000)
        let returnDateString: string;
        let day: string = formatNumberString(date.getDate());
        let month: string = formatNumberString(date.getMonth() + 1);
        let hours: string = formatNumberString(date.getHours());
        let minutes: string = formatNumberString(date.getMinutes());
        returnDateString = `${day}.${month}.${date.getFullYear()} ${hours}:${minutes}`;
        return returnDateString;
    }
    return ''
}

function formatNumberString(numberToFormat: number) {
    if (numberToFormat >= 10)
        return numberToFormat.toString()
    else
        return `0${numberToFormat.toString()}`;
}

