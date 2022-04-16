<template>
  <div>
<!-- template HTML here  -->

    <div class="alert alert-danger" v-if="errors.length > 0">
      <ul>
        <li v-for="error in errors">{{error}}</li>
      </ul>
    </div>
    <div class="card add-student m-2 p-2">
      <h4 class="card-title">Add new student</h4>

      <div class="form-group">
        <label for="name">Name</label>
        <!--  v-model newStudentName -->
        <input id="name" class="form-control" v-model.trim="newStudentName">
      </div>
      <div class="form-group">
        <label for="starID">Star ID</label>
        <!--  v-model newStarID -->
        <input id="starID" class="form-control" v-model.trim="newStarID">
      </div>
      <!--  v-on:click event handler -->
      <button class="btn btn-primary" @click="addStudent">Add</button>
    </div>

  </div>

</template>

<script>
export default {
  name: "NewStudentForm",
  emits:['student-added'], // document the events this component can emmit
  data() {
    return {
      newStudentName: "",
      newStarID:"",
      errors:[]
    }
  },
  methods: {
    addStudent() {
      // found how to do regex test here
      // https://stackoverflow.com/questions/6603015/check-whether-a-string-matches-a-regex-in-js
      let starIDRegex = new RegExp("^[a-zA-Z]{2}[0-9]{4}[a-zA-Z]{2}$")
      this.errors=[]

      if (!this.newStudentName) {
        this.errors.push("Student name must be entered.")
      }
      if (!this.newStarID) {
        this.errors.push("StarID must be entered.")
      }
      if (!starIDRegex.test(this.newStarID)) {
        this.errors.push("StartID must have AA####BB format. ")
        console.log(starIDRegex.test(this.newStarID))
      }
      // found how to do this here
      // https://catalins.tech/array-of-objects-contains-a-value-in-javascript
      // if (this.students.some(student => student.starID === this.newStarID)) {
      //   this.errors.push("Students list contains StarID \"" + this.newStarID + "\" already! please use a differnt StarID.")
      // }
      if (this.errors.length === 0) {
        let student = {name: this.newStudentName, starID: this.newStarID, present: false}
        this.newStarID = ""
        this.newStudentName = ""
        // TODO emit message to parent with new student
        this.$emit("student-added",student)

      }
    }
  }
}
</script>

<style scoped>

</style>