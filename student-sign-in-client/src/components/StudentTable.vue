<template>

  <div class="card student-list m-2 p-2">
    <h4 class="card-title">Student List</h4>
    <div class="edit-table-toggle form-check">
      <input id="edit-table" type="checkbox" class="form-check-input" v-model="editTable">
      <label for="edit-table">Edit table?</label>
    </div>

    <div id="student-table">
      <table class="table">
        <tr>
          <th>Name</th>
          <th>StarID</th>
          <th>Present?</th>
          <th v-show="editTable">Delete</th>
        </tr>
        <student-row
          v-for="student in students"
          v-bind:student="student"
          v-bind:edit-table-row="editTable"
          v-on:student-arrived-or-left-row="arrivedOrLeft"
          v-on:delete-student-row="deleteStudent"
        >
        </student-row>

        <!-- TODO create table rows
        Each row will have a checkbox, bound to the app's data
        When the checkbox is checked/unchecked, the student will be signed in/out -->

      </table>
    </div>
  </div>

</template>

<script>
import StudentRow from "@/components/StudentRow";
export default {
  name: "StudentTable",
  components: {StudentRow},
  emits:["student-arrived-or-left","delete-student-table"],
  props: {
    students:Array
  },
  data() {
    return {
      editTable:false
    }
  },
  methods: {
    arrivedOrLeft(student,present) {
      // emit message to parrent
      this.$emit("student-arrived-or-left",student, present)
    },
    deleteStudent(student) {
      this.$emit("delete-student-table",student)
    }
  }
}
</script>

<style scoped>
#student-table {
  max-height: 400px;
  overflow: scroll;
}
</style>