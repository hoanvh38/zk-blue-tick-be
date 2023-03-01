export default class TimeUtil {
    static async sleep(ms) {
        return new Promise((resolve) => {
            setTimeout(resolve, ms)
        })
    }

    static getToday() {
        const date = new Date()
        date.setUTCHours(0, 0, 0, 0)
        return date
    }

    static toISOString(date: any) {
        return date ? new Date(date).toISOString() : null
    }
}
