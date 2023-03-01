export default class Utility {
    static createSlugFromString(str: string, forSearch = false): string {
        str = str.toLowerCase()

        // xóa dấu
        str = str.replace(/(à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ)/g, 'a')
        str = str.replace(/(è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ)/g, 'e')
        str = str.replace(/(ì|í|ị|ỉ|ĩ)/g, 'i')
        str = str.replace(/(ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ)/g, 'o')
        str = str.replace(/(ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ)/g, 'u')
        str = str.replace(/(ỳ|ý|ỵ|ỷ|ỹ)/g, 'y')
        str = str.replace(/(đ)/g, 'd')

        // Xóa ký tự đặc biệt
        if (!forSearch) {
            str = str.replace(/([^0-9a-z-\s])/g, '')
        }

        // Xóa khoảng trắng thay bằng ký tự -
        str = str.replace(/(\s+)/g, '-')

        // xóa phần dự - ở đầu
        str = str.replace(/^-+/g, '')

        // xóa phần dư - ở cuối
        str = str.replace(/-+$/g, '')

        return str
    }

    static splitWord(str: string): string {
        return str.split(/(?=[A-Z])/).join(' ')
    }

    static findHashtags(str: string) {
        const regexp = /\B\#\w+\b/g
        return str.match(regexp)
    }

    static convertArrayToMap(key: string, arr: any[]): Map<any, any> {
        return new Map(
            arr
                .filter((object) => object)
                .map((object) => {
                    return [object[key], object]
                })
        )
    }

    static uniqueArray(arr: any[]): any[] {
        return [...new Set(arr)]
    }
}
