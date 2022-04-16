<template>
  <new-student-form v-on:student-added="newStudentAdded"></new-student-form>
  <student-table
      v-bind:students="students"
      v-on:student-arrived-or-left="studentArrivedOrLeft"
      v-on:delete-student-table="studentDeleted"
  ></student-table>
  <student-message v-bind:student="mostRecentStudent"></student-message>

</template>

<script>
import NewStudentForm from "@/components/NewStudentForm";
import StudentMessage from "@/components/StudentMessage";
import StudentTable from "@/components/StudentTable";


export default {
  name: 'App',
  components: {
    StudentMessage,
    StudentTable,
    NewStudentForm,
  },
  data() {
    return {
      students:[],
      mostRecentStudent: {}
    }
  },mounted() {
    //load all students -- make request to api
    this.updateStudents()
  },
  methods: {
    updateStudents() {
      this.$student_api.getAllStudents().then(students_list => {
        this.students = students_list
      }).catch(() => alert("Unable to fetch student list."))
      // this.$student_api.getAllStudents().then(students_list => {
      //   console.log(students_list)
      // })
    },
    newStudentAdded(student) {
      this.$student_api.addStudent(student).then(() => {
        this.updateStudents()
      }).catch(err => {
        // not an error array... only giving a generic error message
        let msg =err.response.data
        alert(`Error adding student ${student.name}! \n ${msg}`)
      })
    }
    ,
    studentArrivedOrLeft(student,present) {
      student.present = present // update
      this.$student_api.updateStudent(student).then(() => {
        this.mostRecentStudent = student
        this.updateStudents()
      }).catch(() => alert("Unable to update student.") )
    },
    studentDeleted(student) {
      this.$student_api.deleteStudent(student.id).then(() => {
        this.updateStudents()
        this.mostRecentStudent = {} // clear welcome/goodbye message
      }).catch(() => alert("Unable to delete student."))
    }
  }
}
</script>

<style>
@import "https://cdn.jsdelivr.net/npm/bootstrap@4.6.1/dist/css/bootstrap.min.css";


th, tr {
  width: 33%;
}


[v-cloak] {
  display: none;
}
</style>
