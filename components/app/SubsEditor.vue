<template>
  <!-- eslint-disable -->
  <div class="subs">
    <button type="button" class="subs__btn btn" @click="add">
      <i class="fas fa-plus-square"></i> Добавить
    </button>

    <div class="sub" v-for="(sub,index) in newSubs" :key="index">
      <div class="sub__i">{{index + 1 }}</div>
      <textarea class="sub__text input" @change="$emit('upd', newSubs)" v-model="newSubs[index]"></textarea>
      <button type="button" class="sub__delete" @click="remove(index)">
        <i class="fas fa-trash-alt"></i>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    subs: {
      type: Array,
      default: null
    }
  },
  data () {
    return {
      newSubs: []
    }
  },
  mounted () {
    // this.newSubs.concat(this.subs)
    this.subs.forEach((s) => {
      this.newSubs.push(s)
    })
  },
  methods: {
    add () {
      this.newSubs.push('')
      this.$emit('upd', this.newSubs)
    },
    remove (i) {
      this.newSubs.splice(i, 1)
      this.$emit('upd', this.newSubs)
    }
  }
}
</script>

<style lang="less" scoped>
.subs {
  display: flex;
  flex-direction: column;
  &__btn {
    padding: 10px;
    margin-bottom: 10px;
  }
}
.sub {
  margin-bottom: 20px;
  display: flex;
  justify-content: space-between;
  &__i {
    font-weight: bold;
  }
  &__text {
    width: 80%;
    height: 50px;
    resize: vertical;
  }
  &__delete {
    cursor: pointer;
    outline: none;
    border: none;
    background: none;
    font-size: 20px;
    padding: 0;
    color: rgb(153, 153, 153);
    margin: 0;
    &:active {
      color: grey;
    }
  }
}
</style>
