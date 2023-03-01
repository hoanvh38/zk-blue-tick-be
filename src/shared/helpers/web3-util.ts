import { isAddress, toChecksumAddress } from 'web3-utils'

export default class Web3Utils {
    //Use only for search
    static checksumAddress(address: string): string {
        try {
            return toChecksumAddress(address)
        } catch (error) {
            return address
        }
    }

    static filterInvalidAddresses(addresses: string[]): string[] {
        return addresses.filter((address) => !isAddress(address))
    }
}
