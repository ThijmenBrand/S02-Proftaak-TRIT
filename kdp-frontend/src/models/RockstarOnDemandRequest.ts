export default interface RockstarOnDemandRequest {
    receiverEmail: String,
    senderEmail: String,
    name: String,
    message: String,
    date: String | Date
}
