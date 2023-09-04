import axios from "axios"

export class ContactService {
    static serviceURL = "http://localhost:9000"

    static getAllContact() {
        let dataURL = `${this.serviceURL}/contacts`
        return axios.get(dataURL);
    }

    static getContact(contactId) {
        let dataURL = `${this.serviceURL}/contacts/${contactId}`
        return axios.get(dataURL);
    }

    static createContact(contact) {
        let dataURL = `${this.serviceURL}/contacts/`
        return axios.post(dataURL,contact);
    }

    static updateContact(contact, contactId) {
        let dataURL = `${this.serviceURL}/contacts/${contactId}`
        return axios.put(dataURL,contact);
    }

    static deleteContact(contactId) {
        let dataURL = `${this.serviceURL}/contacts/${contactId}`
        return axios.delete(dataURL);
    }

    static getAllGroups() {
        let dataURL = `${this.serviceURL}/groups/`;
        return axios.get(dataURL);
    }


    static getGroup(contact)
    {
        let groupid = contact.groupid
        let dataURL = `${this.serviceURL}/groups/${groupid}`
        return axios.get(dataURL)
    }

    static getSearchContact(serchKeryword)
    {
        let dataURL = `${this.serviceURL}/contacts?q=${serchKeryword}`
        return axios.get(dataURL)
    }
}