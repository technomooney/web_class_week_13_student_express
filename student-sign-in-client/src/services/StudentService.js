import "axios"
import axios from "axios";

let base_url = '/api/students'

export default {
    getAllStudents() {
        return axios.get(base_url).then(resp => {
            return resp.data
        })
    },
    addStudent(student) {
        return axios.post(base_url,student).then(resp => {
            return resp.data
        })
    },
    updateStudent(student) {
        return axios.patch(`${base_url}/${student.id}`, student).then((resp) => {
            return resp.data
        })
    },
    deleteStudent(id) {
        return axios.delete(`${base_url}/${id}`).then(resp => {
            return resp.data
        })
    }
}