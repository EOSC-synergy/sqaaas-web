<template>
  <div class="form-group"
       :class="{
          'input-group': hasIcon,
          'input-group-focus': focused
       }">
    <slot name="label">
      <label v-if="label" class="control-label">
        {{label}}
      </label>
        <!-- <div class="custom-div-append"> -->
            <button v-if="help == true" style="padding: 0.3rem 0.75rem;margin-bottom: 0 !important;font-size: 1rem !important;font-weight: 400 !important;color: #495057 !important;border: none !important;
                                        height: 40px !important;"
            type="button" class="btn" data-toggle="tooltip" data-html="true" data-placement="top" :title="message + ' ' + '<a target=`blank` href=' + link + '>more info</a>'">
              <i class="fa fa-question-circle"></i>
            </button>
          <!-- </div> -->
    </slot>
    <slot name="addonLeft">
      <span v-if="addonLeftIcon" class="input-group-prepend">
        <div class="input-group-text">
          <i :class="addonLeftIcon"></i>
        </div>
      </span>
    </slot>
    <slot>
      <input
        :value="value"
        v-bind="$attrs"
        v-on="listeners"
        class="form-control"
        aria-describedby="addon-right addon-left">
    </slot>
    <slot name="addonRight">
      <span v-if="addonRightIcon" class="input-group-append">
        <div class="input-group-text">
          <i :class="addonRightIcon"></i>
        </div>
      </span>
    </slot>
    <slot name="helperText"></slot>
  </div>
</template>
<script>
  export default {
    inheritAttrs: false,
    name: "base-input",
    props: {
      label: {
        type: String,
        description: "Input label"
      },
      help:{
        type: Boolean,
      },
      message:{
        type: String,
      },
      link:{
        type: String,
      },
      value: {
        type: [String, Number],
        description: "Input value"
      },
      addonRightIcon: {
        type: String,
        description: "Input icon on the right"
      },
      addonLeftIcon: {
        type: String,
        description: "Input icon on the left"
      },
    },
    model: {
      prop: 'value',
      event: 'input'
    },
    data() {
      return {
        focused: false,
        set_title:''
      }
    },
    computed: {
      hasIcon() {
        const { addonRight, addonLeft } = this.$slots;
        return addonRight !== undefined || addonLeft !== undefined || this.addonRightIcon !== undefined || this.addonLeftIcon !== undefined;
      },
      listeners() {
        return {
          ...this.$listeners,
          input: this.onInput,
          blur: this.onBlur,
          focus: this.onFocus
        }
      }
    },
    methods: {
      onInput(evt) {
        this.$emit('input', evt.target.value)
      },
      onFocus() {
        this.focused = true;
      },
      onBlur() {
        this.focused = false;
      }
    },

  }
</script>
<style scoped>

</style>
