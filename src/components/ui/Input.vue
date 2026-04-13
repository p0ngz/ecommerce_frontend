<script setup lang="ts">
defineProps<{
  modelValue?: string | number;
  label?: string;
  placeholder?: string;
  type?: string;
  error?: string;
  disabled?: boolean;
  required?: boolean;
}>();

defineEmits<{
  'update:modelValue': [value: string];
}>();
</script>

<template>
  <div class="form-group">
    <label v-if="label" class="form-label">
      {{ label }}
      <span v-if="required" class="required">*</span>
    </label>
    <input
      :value="modelValue"
      :type="type || 'text'"
      :placeholder="placeholder"
      :disabled="disabled"
      :required="required"
      :class="['form-input', { 'input-error': error }]"
      @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
    />
    <p v-if="error" class="error-text">{{ error }}</p>
  </div>
</template>

<style scoped>
.required { color: #ef4444; margin-left: 2px; }
.input-error { border-color: #ef4444; }
</style>
