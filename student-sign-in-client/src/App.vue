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
  },
  methods: {
    newStudentAdded(student) {
      this.students.push(student)
      this.students.sort(function (s1,s2) {
        return s1.name.toLowerCase() > s2.name.toLowerCase() ? 1:-1
      })
    },
    studentArrivedOrLeft(student,present) {
      //find the student in the array
      //update presence atrribute

      let updateStudent = this.students.find(function (s) {
        if (s.name === student.name && s.starID === student.starID) {
          return true
        }
      })
      if (updateStudent) {
        updateStudent.present = present
        this.mostRecentStudent = updateStudent
      }
    },
    studentDeleted(student) {
      //filter returns a new array of all studnets for whom the funtion returns true
      this.students = this.students.filter(function (s) {
        if (s !== student) {
          return true
        }
      })
      this.mostRecentStudent = {}
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
