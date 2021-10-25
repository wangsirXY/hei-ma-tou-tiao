<template>
  <div>
    <!-- Header 头部区域 -->
    <div class="search-header">
      <!-- 后退图标 -->
      <van-icon name="arrow-left" color="white" size="18" class="goback" @click="$router.back()" />
      <!-- 搜索组件 -->
      <van-search v-model.trim="kw" placeholder="请输入搜索关键词" background="#007BFF" shape="round" @keyup="onInput" />
    </div>

    <!-- 搜索建议 -->
    <div class="sugg-list">
      <div class="sugg-item" v-for="(item, i) in suggestList" :key="i" v-html="item"></div>
    </div>
  </div>
</template>

<script>
import { getSuggestListAPI } from '@/api/searchAPI.js'

export default {
  name: 'Search',
  data() {
    return {
      // 搜索关键词
      kw: '',
      // 延迟器Id
      timeId: null,
      // 搜索建议列表
      suggestList: []
    }
  },
  methods: {
    // 搜索框防抖
    onInput() {
      clearTimeout(this.timeId)
      // 如果搜索内容为空，清空列表
      if (this.kw === '') {
        this.suggestList = []
        return
      }

      console.log(this.kw)
      this.timeId = setTimeout(() => {
        this.initSuggestList()
      }, 1000)
    },

    // 请求搜索建议列表数据的方法
    async initSuggestList() {
      const { data: res } = await getSuggestListAPI(this.kw)
      if (res.message === 'OK') {
        // 高亮显示搜索内容
        this.hlightKeywords(res.data.options)
        // 请求搜索的列表
        this.suggestList = res.data.options
      }
    },
    // 高亮搜索关键词的方法，形参中的 arr 是搜索建议的数组
    hlightKeywords(arr) {
      // 1. 根据用户输入的 kw，动态创建正则表达式
      const reg = new RegExp(this.kw, 'ig')

      // 循环数组中的每一项
      arr.forEach((item, index) => {
        // 2. 调用字符串的 replace 方法进行关键字的高亮处理
        arr[index] = item.replace(reg, val => {
          return `<span style="color: #f00; font-weight: bold;">${val}</span>`
        })
      })
    }
  },
  mounted() {
    // 搜索框自动聚焦
    const ipt = document.querySelector('input[type=search]')
    ipt && ipt.focus()
  }
}
</script>

<style lang="less" scoped>
.search-header {
  height: 46px;
  display: flex;
  align-items: center;
  background-color: #007bff;
  overflow: hidden;
  // 后退按钮
  .goback {
    padding-left: 14px;
  }
  // 搜索组件
  .van-search {
    flex: 1;
  }
}
.sugg-list {
  .sugg-item {
    padding: 0 15px;
    border-bottom: 1px solid #f8f8f8;
    font-size: 14px;
    line-height: 50px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
}
</style>
