<template>
  <tr v-bind:class="{present: student.present, absent: !student.present}">
    <td>{{student.name}}</td>
    <td>{{student.starID}}</td>
    <td>
      <input type="checkbox" v-bind:checked="student.present" @change="arrivedOrLeft(student,$event.target.checked)">
    </td>
    <td v-show="editTableRow"><img src="@/assets/delete-icon.png" @click="deleteStudent"></td>
  </tr>
</template>

<script>
export default {
  name: "StudentRow",
  props: {
    student:Object,
    editTableRow:Boolean
  },
  methods: {
    arrivedOrLeft(student,present) {
      this.$emit("student-arrived-or-left-row",student, present)
    },
    deleteStudent() {
      if (confirm(`Are you sure you want to delete ${this.student.name}?`)) {
        this.$emit("delete-student-row", this.student)
      }
    }
  }
}
</script>

<style scoped>

img {
  height: 20px;
}
.absent {
  color: lightgray;
  font-style: italic;
  background-color: darkblue;
}

.present {
  color: black;
  font-weight: bold;
  background-color: mediumaquamarine;
}
</style>