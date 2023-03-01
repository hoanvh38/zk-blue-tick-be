export default class TextUtil {
    static fillText(baseStr: string, fillMap: Map<string, string>): string {
        let resultStr = baseStr
        for (const key of fillMap.keys()) {
            resultStr = resultStr.replaceAll(key, fillMap.get(key))
        }
        return resultStr
    }
}
