<template>
  <div class="pagination">
    <button :disabled="pageNo == 1" @click="$emit('getPage', pageNo - 1)">
      上一页
    </button>
    <button
      v-if="sP > 1"
      @click="$emit('getPage', 1)"
      :class="pageNo === 1 ? 'active' : ''"
    >
      1
    </button>
    <button v-if="sP > 1">···</button>

    <button
      @click="$emit('getPage', sP)"
      :class="pageNo === sP ? 'active' : ''"
    >
      {{ sP }}
    </button>
    <button
      v-for="(item, index) of iterationArr"
      :key="index"
      @click="$emit('getPage', item)"
      :class="pageNo === item ? 'active' : ''"
    >
      {{ item }}
    </button>
    <button
      v-if="eP !== sP"
      @click="$emit('getPage', eP)"
      :class="pageNo === eP ? 'active' : ''"
    >
      {{ eP }}
    </button>

    <button v-if="eP < totalNum - 1">···</button>
    <button
      v-if="eP < totalNum"
      @click="$emit('getPage', totalNum)"
      :class="pageNo === totalNum ? 'active' : ''"
    >
      {{ totalNum }}
    </button>
    <button
      :disabled="pageNo == totalNum"
      @click="$emit('getPage', pageNo + 1)"
    >
      下一页
    </button>

    <button style="margin-left: 30px">{{ total }} 条</button>
  </div>
</template>

<script>
export default {
  name: "PaginationComponent",
  props: ["pageSize", "pageNo", "total", "continues"],
  computed: {
    // 简化code
    sP(){
      return this.startAndEndPage.startPage
    },
    eP(){
      return this.startAndEndPage.endPage
    },
    // button遍历的数组
    iterationArr() {
      let arr = [];
      // 末页-开始页 -1 =中间页 ，中间页从开始页加三次，末页、开始页已进行判断修正
      let long = this.startAndEndPage.endPage - this.startAndEndPage.startPage;
      for (let count = 0; count < long - 1; count++) {
        arr.push(this.startAndEndPage.startPage + count + 1);
      }
      return arr;
    },
    totalNum() {
      return Math.ceil(this.total / this.pageSize);
    },
    // 开始页、末页设定与修正
    startAndEndPage() {
      const { continues, pageNo } = this;
      // 正常情况:total长于continues，当前页居于中间页数
      let startPage = pageNo - parseInt(continues / 2);
      let endPage = pageNo + parseInt(continues / 2);
      // 考虑特殊情况
      // 1.当前页较为靠前，导致startPage为负数
      if (startPage < 1) {
        startPage = 1;
        endPage = continues;
      }
      // 2.当前页太靠后，导致endPage超出total
      if (endPage > this.totalNum) {
        endPage = this.totalNum;
        startPage = this.totalNum - continues + 1;
      }
      // 3.totalNum没有continues长
      if (continues > this.totalNum) {
        startPage = 1;
        endPage = this.totalNum;
      }
      return { startPage, endPage };
    },
  },
};
</script>

<style lang="less" scoped>
.pagination {
  text-align: center;
  button {
    margin: 0 5px;
    background-color: #f4f4f5;
    color: #606266;
    outline: none;
    border-radius: 2px;
    padding: 0 4px;
    vertical-align: top;
    display: inline-block;
    font-size: 13px;
    min-width: 35.5px;
    height: 28px;
    line-height: 28px;
    cursor: pointer;
    box-sizing: border-box;
    text-align: center;
    border: 0;

    &[disabled] {
      color: #c0c4cc;
      cursor: not-allowed;
    }

    &.active {
      cursor: not-allowed;
      background-color: #ff4340;
      color: #fff;
    }
  }
}
</style>
