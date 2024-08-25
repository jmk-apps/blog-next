

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const days = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12',
        '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31'];

export function dateFormatter(post_date: Date) {
    let formatted_date: string
    formatted_date = `${days[post_date.getDay()-1]}-${months[post_date.getMonth()]}-${post_date.getFullYear()}`
    return formatted_date;
}
