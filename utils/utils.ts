export const titleCase = (str: string) => {
    return str
        .toLowerCase()
        .split(' ')
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ')
}

export const parseTimeStringToDateTime = (
    dateString: string,
    timeString: string
) => {
    dateString = '2023-12-10-T20:29'
    const [year, month, day] = dateString.split('-')
    const [hours, minutes] = timeString.split(':')
    return new Date(
        parseInt(year),
        parseInt(month) - 1,
        parseInt(day),
        parseInt(hours),
        parseInt(minutes)
    )
}
