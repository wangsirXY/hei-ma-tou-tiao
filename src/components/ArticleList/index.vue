<template>
  <div id="ArticleList">
    <!-- 上拉加载更多 -->
    <van-list
      v-model="loading"
      :finished="finished"
      :immediate-check="false"
      finished-text="没有更多资讯了"
      @load="onLoad">
      <!-- 循环渲染文章的列表 -->
      <artItem v-for="item in articleList" :key="item.art_id" :articleList="item"></artItem>
    </van-list>

  </div>
</template>

<script>
import { getArticleListAPI } from '@/api/homeAPI.js'

import ArtItem from '@/components/ArtItem'

export default {
  name: 'ArticleList',
  props: {
    channelId: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      articleList: [],
      preTimestamp: '',
      loading: false,
      finished: false
    }
  },
  methods: {
    async initArticleList() {
      const { data: res } = await getArticleListAPI(this.channelId, Date.now())

      if (res.message === 'OK') {
        this.preTimestamp = res.data.pre_timestamp
        this.articleList = res.data.results
      }

      console.log(res, 'res')
    },
    // 初始化文章的列表数据
    async initArtList() {
      // 请求 API 接口
      const { data: res } = await getArticleListAPI(this.channelId, this.preTimestamp)
      if (res.message === 'OK') {
        // 为时间戳重新赋值
        this.preTimestamp = res.data.pre_timestamp
        // 1. 上拉加载更多时，应该是“旧数据”在前，“新数据”在后
        this.articleList = [...this.articleList, ...res.data.results]
        // 2. 重置 loading 为 false
        this.loading = false

        console.log(this.articleList)
        // 3. 判断所有的数据是否已加载完毕
        if (res.data.pre_timestamp === null) {
          this.finished = true
        }
      }

      console.log(res, '新的res数据')
    },
    onLoad() {
      console.log('触发了上拉加载更多')
      this.initArtList()
    }
  },
  created() {
    this.initArticleList()
  },
  components: {
    ArtItem
  }
}
</script>

<style>

</style>
