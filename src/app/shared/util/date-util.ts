export default class DateUtil {

    convertDateStringToJSON(objectInput: any, attributes: string[]): any {
        for (let attribute of attributes) {
            let tabDate: string[] = objectInput[attribute].split('-')
            let tempDate: Date = new Date(parseInt(tabDate[0]), parseInt(tabDate[1])-1, parseInt(tabDate[2]))
            objectInput[attribute] = tempDate
        }
        return objectInput
    }
}
