<template>
  <div>
    <ListNav />
    <div class="main">
      <div class="py-container">
        <!--bread-->
        <div class="bread">
          <ul class="fl sui-breadcrumb">
            <li>
              <a href="#">全部结果</a>
            </li>
          </ul>
          <ul class="fl sui-tag">
            <!-- query面包屑 -->
            <li
              class="with-x"
              @click="removeCategoryName"
              v-if="searchParams.categoryName"
            >
              {{ searchParams.categoryName }}×
            </li>
            <!-- keyword(params)面包屑 -->
            <li
              class="with-x"
              @click="removeKeyword"
              v-if="searchParams.keyword"
            >
              {{ searchParams.keyword }}×
            </li>
            <!-- tradeMark面包屑 -->
            <li
              class="with-x"
              @click="removeTrademark"
              v-if="searchParams.trademark"
            >
              {{ tradeName }}×
            </li>
            <!-- props面包屑 -->
            <li
              class="with-x"
              @click="removeProps(prop)"
              v-for="prop of searchParams.props"
              :key="prop.split(':')[0]"
            >
              {{ prop.split(":")[1] }}×
            </li>
          </ul>
        </div>

        <!--selector-->
        <SearchSelector @getInfo="getInfo" />

        <!--details-->
        <div class="details clearfix">
          <div class="sui-navbar">
            <div class="navbar-inner filter">
              <!-- 价格结构 -->
              <ul class="sui-nav">
                <!-- 判断this.searchParams.order里是否含有对应的数字 -->
                <li
                  :class="{ active: synthesisOrPrice1 }"
                  @click="changArrowDirection('1')"
                >
                  <a
                    >综合
                    <span
                      v-show="synthesisOrPrice1"
                      class="iconfont"
                      :class="showArrow"
                    ></span
                  ></a>
                </li>
                <li
                  :class="{ active: synthesisOrPrice2 }"
                  @click="changArrowDirection('2')"
                >
                  <a
                    >价格
                    <span
                      v-show="synthesisOrPrice2"
                      class="iconfont"
                      :class="showArrow"
                    ></span
                  ></a>
                </li>
              </ul>
            </div>
          </div>
          <!-- 销售商品列表 -->
          <div class="goods-list">
            <ul class="yui3-g">
              <li class="yui3-u-1-5" v-for="good of goodsList" :key="good.id">
                <div class="list-wrap">
                  <div class="p-img">
                    <router-link :to="`/detail/${good.id}`">
                      <img :src="good.defaultImg" />
                    </router-link>
                  </div>
                  <div class="price">
                    <strong>
                      <em>¥</em>
                      <i>{{ good.price }}</i>
                    </strong>
                  </div>
                  <div class="attr">
                    <a
                      target="_blank"
                      href="item.html"
                      title="促销信息，下单即赠送三个月CIBN视频会员卡！【小米电视新品4A 58 火爆预约中】"
                      >{{ good.title }}</a
                    >
                  </div>
                  <div class="commit">
                    <i class="command">已有<span>2000</span>人评价</i>
                  </div>
                  <div class="operate">
                    <a
                      href="success-cart.html"
                      target="_blank"
                      class="sui-btn btn-bordered btn-danger"
                      >加入购物车</a
                    >
                    <a href="javascript:void(0);" class="sui-btn btn-bordered"
                      >收藏</a
                    >
                  </div>
                </div>
              </li>
            </ul>
          </div>
          <!-- 分页器 -->
          <PagenationComponent
            :pageSize="searchList.pageSize"
            :pageNo="searchList.pageNo"
            :total="searchList.total"
            :continues="5"
            @getPage="getPage"
          ></PagenationComponent>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapState } from "vuex";
import SearchSelector from "./SearchSelector/SearchSelector";
export default {
  name: "SearchComponent",
  props: ["keyword", "categoryName"],
  data() {
    return {
      searchParams: {
        category1Id: "",
        category2Id: "",
        category3Id: "",
        categoryName: "",
        keyword: "",
        order: "1:desc",
        pageNo: 1,
        pageSize: 10,
        props: [],
        trademark: "",
      },
    };
  },
  watch: {
    // immediate:true,
    // keyword:{
    //   handler(){
    //     Object.assign(this.searchParams, this.$route.params, this.$route.query);
    //     this.getData();
    //   }
    // },
    // categoryName:{
    //   handler(){
    //     Object.assign(this.searchParams, this.$route.params, this.$route.query);
    //     this.getData();
    //   }
    // }
    $route() {
      Object.assign(this.searchParams, this.$route.params, this.$route.query);
      this.getData();
      // 清除先前数据
      this.searchParams.category1Id = undefined;
      this.searchParams.category2Id = undefined;
      this.searchParams.category3Id = undefined;
    },
  },
  components: {
    SearchSelector,
  },
  beforeMount() {
    Object.assign(this.searchParams, this.$route.params, this.$route.query);
  },
  mounted() {
    this.getData();
    // 根据SearchSelector子组件传回来的参数，重新加载页面
    this.$bus.$on("chioceBrand", (brandName) => {
      this.searchParams.trademark = `${brandName.tmId}:${brandName.tmName}`;
      this.getData();
    });
    this.count = 0;
  },
  beforeDestroy() {
    this.$bus.$off("chioceBrand");
  },
  computed: {
    ...mapGetters("search", ["goodsList", "attrsList", "trademarkList"]),
    ...mapState("search", ["searchList"]),
    // tradeMark面包屑的内部文字
    tradeName() {
      return this.searchParams.trademark.split(":")[1];
    },
    // 用于判断综合/价格的红色底纹
    synthesisOrPrice1() {
      return this.searchParams.order.includes("1");
    },
    synthesisOrPrice2() {
      return this.searchParams.order.includes("2");
    },
    //判断箭头上下
    showArrow() {
      let condition = undefined;
      if (this.searchParams.order.includes("desc")) {
        condition = "icon-todown";
      }
      if (this.searchParams.order.includes("asc")) {
        condition = "icon-up";
      }
      return condition;
    },
  },
  methods: {
    getData() {
      this.$store.dispatch("search/getSearchList", this.searchParams);
    },
    //面包屑删除+清除数据
    removeCategoryName() {
      let sendObj = { url: "/search" };
      //条件判断是否存在params后跳转路由
      if (this.$route.params) {
        // 删除query参数的时候保留params参数
        sendObj.params = this.$route.params;
      }
      this.$router.push(sendObj);
      this.searchParams.categoryName = undefined;
      this.searchParams.category1Id = undefined;
      this.searchParams.category2Id = undefined;
      this.searchParams.category3Id = undefined;
      // 重新发送Ajax获取数据
      this.getData();
    },
    // 点击删除keyword面包屑保留query参数刷新页面
    removeKeyword() {
      let sendObj = { path: "/search" };
      if (this.$route.query) {
        sendObj.query = this.$route.query;
      }
      this.$router.push(sendObj);
      this.searchParams.keyword = "";
      this.getData();
    },
    // 点击删除品牌面包屑，并返回页面
    removeTrademark() {
      let sendObj = { path: "/search" };
      if (this.$route.query) {
        sendObj.query = this.$route.query;
      }
      if (this.$route.params) {
        sendObj.params = this.$route.params;
      }
      this.searchParams.trademark = undefined;
      this.$router.push(sendObj);
      this.getData();
    },
    // 用自定义事件获取子组件的属性信息
    getInfo(info) {
      // 数组去重判断
      if (!this.searchParams.props.includes(info)) {
        this.searchParams.props.push(info);
        this.getData();
      }
    },
    // 点击props面包屑删除数据相关数据并刷新页面
    removeProps(prop) {
      let index = this.searchParams.props.indexOf(prop);
      this.searchParams.props.splice(index, 1);
      this.getData();
    },
    // 点击改变箭头方向与红色背景
    changArrowDirection(number) {
      let arr = this.searchParams.order.split(":");
      if (arr[0] !== number) {
        // 切换按钮箭头方向初始化
        this.count = 0;
        arr.splice(1, 1, "desc");//1是上的时候，切换到2重置箭头为下
      } else {
        if (this.count) {
          arr.splice(1, 1, "desc");
          this.count--;
        } else {
          arr.splice(1, 1, "asc");
          this.count++;
        }
      }
      arr.splice(0, 1, number);
      this.searchParams.order = arr.join(":");
      this.getData();
    },
    // 点击分页数字获取数据
    getPage(page) {
      this.searchParams.pageNo = page;
      this.getData();
    },
  },
};
</script>

<style lang="less" scoped>
.main {
  margin: 10px 0;

  .py-container {
    width: 1200px;
    margin: 0 auto;

    .bread {
      margin-bottom: 5px;
      overflow: hidden;

      .sui-breadcrumb {
        padding: 3px 15px;
        margin: 0;
        font-weight: 400;
        border-radius: 3px;
        float: left;

        li {
          display: inline-block;
          line-height: 18px;

          a {
            color: #666;
            text-decoration: none;

            &:hover {
              color: #4cb9fc;
            }
          }
        }
      }

      .sui-tag {
        margin-top: -5px;
        list-style: none;
        font-size: 0;
        line-height: 0;
        padding: 5px 0 0;
        margin-bottom: 18px;
        float: left;

        .with-x {
          font-size: 12px;
          margin: 0 5px 5px 0;
          display: inline-block;
          overflow: hidden;
          color: #000;
          background: #f7f7f7;
          padding: 0 7px;
          height: 20px;
          line-height: 20px;
          border: 1px solid #dedede;
          white-space: nowrap;
          transition: color 400ms;
          cursor: pointer;

          i {
            margin-left: 10px;
            cursor: pointer;
            font: 400 14px tahoma;
            display: inline-block;
            height: 100%;
            vertical-align: middle;
          }

          &:hover {
            color: #28a3ef;
          }
        }
      }
    }

    .details {
      margin-bottom: 5px;

      .sui-navbar {
        overflow: visible;
        margin-bottom: 0;

        .filter {
          min-height: 40px;
          padding-right: 20px;
          background: #fbfbfb;
          border: 1px solid #e2e2e2;
          padding-left: 0;
          border-radius: 0;
          box-shadow: 0 1px 4px rgba(0, 0, 0, 0.065);

          .sui-nav {
            position: relative;
            left: 0;
            display: block;
            float: left;
            margin: 0 10px 0 0;

            li {
              float: left;
              line-height: 18px;

              a {
                display: block;
                cursor: pointer;
                padding: 11px 15px;
                color: #777;
                text-decoration: none;
              }

              &.active {
                a {
                  background: #e1251b;
                  color: #fff;
                }
              }
            }
          }
        }
      }

      .goods-list {
        margin: 20px 0;

        ul {
          display: flex;
          flex-wrap: wrap;

          li {
            height: 100%;
            width: 20%;
            margin-top: 10px;
            line-height: 28px;

            .list-wrap {
              .p-img {
                padding-left: 15px;
                width: 215px;
                height: 255px;

                a {
                  color: #666;

                  img {
                    max-width: 100%;
                    height: auto;
                    vertical-align: middle;
                  }
                }
              }

              .price {
                padding-left: 15px;
                font-size: 18px;
                color: #c81623;

                strong {
                  font-weight: 700;
                  em {
                    margin-right: 10px;
                  }
                  i {
                    margin-left: -5px;
                  }
                }
              }

              .attr {
                padding-left: 15px;
                width: 85%;
                overflow: hidden;
                margin-bottom: 8px;
                min-height: 38px;
                cursor: pointer;
                line-height: 1.8;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 2;

                a {
                  color: #333;
                  text-decoration: none;
                }
              }

              .commit {
                padding-left: 15px;
                height: 22px;
                font-size: 13px;
                color: #a7a7a7;

                span {
                  font-weight: 700;
                  color: #646fb0;
                }
              }

              .operate {
                padding: 12px 15px;

                .sui-btn {
                  display: inline-block;
                  padding: 2px 14px;
                  box-sizing: border-box;
                  margin-bottom: 0;
                  font-size: 12px;
                  line-height: 18px;
                  text-align: center;
                  vertical-align: middle;
                  cursor: pointer;
                  border-radius: 0;
                  background-color: transparent;
                  margin-right: 15px;
                }

                .btn-bordered {
                  min-width: 85px;
                  background-color: transparent;
                  border: 1px solid #8c8c8c;
                  color: #8c8c8c;

                  &:hover {
                    border: 1px solid #666;
                    color: #fff !important;
                    background-color: #666;
                    text-decoration: none;
                  }
                }

                .btn-danger {
                  border: 1px solid #e1251b;
                  color: #e1251b;

                  &:hover {
                    border: 1px solid #e1251b;
                    background-color: #e1251b;
                    color: white !important;
                    text-decoration: none;
                  }
                }
              }
            }
          }
        }
      }

      .page {
        width: 733px;
        height: 66px;
        overflow: hidden;
        float: right;

        .sui-pagination {
          margin: 18px 0;

          ul {
            margin-left: 0;
            margin-bottom: 0;
            vertical-align: middle;
            width: 490px;
            float: left;

            li {
              line-height: 18px;
              display: inline-block;

              a {
                position: relative;
                float: left;
                line-height: 18px;
                text-decoration: none;
                background-color: #fff;
                border: 1px solid #e0e9ee;
                margin-left: -1px;
                font-size: 14px;
                padding: 9px 18px;
                color: #333;
              }

              &.active {
                a {
                  background-color: #fff;
                  color: #e1251b;
                  border-color: #fff;
                  cursor: default;
                }
              }

              &.prev {
                a {
                  background-color: #fafafa;
                }
              }

              &.disabled {
                a {
                  color: #999;
                  cursor: default;
                }
              }

              &.dotted {
                span {
                  margin-left: -1px;
                  position: relative;
                  float: left;
                  line-height: 18px;
                  text-decoration: none;
                  background-color: #fff;
                  font-size: 14px;
                  border: 0;
                  padding: 9px 18px;
                  color: #333;
                }
              }

              &.next {
                a {
                  background-color: #fafafa;
                }
              }
            }
          }

          div {
            color: #333;
            font-size: 14px;
            float: right;
            width: 241px;
          }
        }
      }
    }
  }
}
</style>
