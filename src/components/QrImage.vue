<template>
  <figure class="qr-fugure">
    <img :src="imageData" />
  </figure>
</template>
<script lang="ts">
import { Component, Vue, Prop, Watch } from "vue-property-decorator";
import { QartOption } from "./../types";
// @ts-ignore: Unreachable code error
import Qart from "qartjs";
@Component({})
export default class QrImage extends Vue {
  @Prop({
    type: Object,
    required: true
  })
  option: QartOption = {
    value: "",
    filter: "threshold",
    size: 300,
    imagePath: null,
    fillType: "scale_to_fit"
  };

  imageData: string | null = null;

  @Watch("option", { deep: true })
  optionChange(after: QartOption, before: QartOption) {
    console.log("watch");
    this.makeQr();
  }

  makeQr() {
    // @ts-ignore: Unreachable code error
    const qart = new QArt({
      value: this.option.value,
      filter: this.option.filter,
      size: this.option.size,
      imagePath: this.option.imagePath,
      fillType: "scale_to_fit"
    });

    qart.make((canvas: any) => {
      this.imageData = canvas.toDataURL("image/png");
      this.$emit("imagePath", this.imageData);
    });
  }
}
</script>
<style lang="scss" scoped>
.qr-fugure img {
  max-width: 100%;
}
</style>