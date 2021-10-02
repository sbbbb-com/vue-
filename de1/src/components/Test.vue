<template>
  <el-form
      ref="ruleForm"
      :model="ruleForm"
      :rules="rules"
      label-width="120px"
  >
    <el-form-item label="Activity name" prop="name">
      <el-input v-model="ruleForm.name"></el-input>
    </el-form-item>

  </el-form>
</template>

<script lang="ts">
export default {
  data() {
    return {
      ruleForm: {
        name: '',
      },
      rules: {
        name: [
          {required: true, message: 'Please input Activity name', trigger: 'blur',},
          {min: 3, max: 5, message: 'Length should be 3 to 5', trigger: 'blur',}
        ],
      },
    }
  },
  methods: {

  },
}
</script>
