import * as CodeGenerator from 'voucher-code-generator'

export default class GenerateCode {
    static create(option: { length: number; charset: string }) {
        const { length, charset } = option
        return CodeGenerator.generate({
            length,
            count: 1,
            charset,
        })[0]
    }
}
