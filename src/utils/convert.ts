export const ConverDateStringToTimeStamp = (date: string) =>{
    let result = Date.parse(date);
    return result
}

export const FormatTimestampToDate = (timestamp: number): string => {
    const date = new Date(timestamp * 1000);
    const options: Intl.DateTimeFormatOptions = {
      month: 'short',
      day: '2-digit',
      year: 'numeric',
    };
    return date.toLocaleDateString('en-US', options);
  }