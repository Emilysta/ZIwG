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

function formatNumberString(numberToFormat: number) {
    if (numberToFormat >= 10)
        return numberToFormat.toString()
    else
        return `0${numberToFormat.toString()}`;
}

