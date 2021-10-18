<template>
  <div>
    <van-cell>
      <!-- 标题区域的插槽 -->
      <template #title>
        <div class="title-box">
          <!-- 标题 -->
          <span>{{ articleList.title }}</span>
          <!-- 单张图片 -->
          <img v-if="articleList.cover.type == 1" v-lazy="articleList.cover.images[0]" class="thumb">
        </div>
        <!-- 三张图片 -->
        <div class="thumb-box" v-if="articleList.cover.type == 3" >
          <img v-for="(imgsrc, i) in articleList.cover.images" :key="i" v-lazy="imgsrc" class="thumb">
        </div>
      </template>
      <!-- label 区域的插槽 -->
      <template #label>
        <div class="label-box">
          <span>作者 {{ articleList.aut_name }}&nbsp;&nbsp; {{ articleList.comm_count }} 评论 &nbsp;&nbsp; 发布日期 {{ articleList.pubdate | dateFormat }}</span>
          <!-- 关闭按钮 -->
          <!-- 通过 .stop 事件修饰符，阻止点击事件的冒泡 -->
          <van-icon name="cross" @click.stop="show = true" />
        </div>
      </template>
    </van-cell>
    <van-action-sheet v-model="show" cancel-text="取消" :closeable="false" get-container="body">
      <!-- 第一级反馈面板 -->
      <div v-if="isFirst">
        <van-cell :title="item.name" clickable class="center-title" v-for="item in actions" :key="item.name" @click="onCellClick(item.name)" />
      </div>
      <!-- 第二级反馈面板 -->
      <div v-else>
        <van-cell :title="item.label" clickable title-class="center-title" v-for="item in reports" :key="item.type" />
        <van-cell title="返回" clickable title-class="center-title" @click="isFirst = true" />
      </div>
    </van-action-sheet>
  </div>
</template>

<script>
import reports from '@/api/reports'
// 按需导入 API 接口
import { dislikeArticleAPI } from '@/api/homeAPI'

export default {
  name: 'ArtItem',
  data() {
    return {
      // 是否展示反馈面板
      show: false,
      // 第一个面板的可选项列表
      actions: [
        { name: '不感兴趣' },
        { name: '反馈垃圾内容' },
        { name: '拉黑作者' }
      ],
      // 是否展示第一个反馈面板
      isFirst: true,
      // 第二个面板的可选项列表：{ type, label }
      reports,
      // 文章的信息对象
      article: {
        type: Object, // 数据类型
        required: true // 必填项
      }
    }
  },
  methods: {
    onSelect(item) {
      // 默认情况下点击选项时不会自动收起
      this.show = false
    },
    async onCellClick(name) {
      // 调用 API 接口，将文章设置为不感兴趣
      if (name === '不感兴趣') {
        const { data: res } = await dislikeArticleAPI(this.artId)
        if (res.message === 'OK') {
          this.$emit('remove-article', this.artId)
        }
        this.show = false
      } else if (name === '拉黑作者') {
        this.show = false
      } else if (name === '反馈垃圾内容') {
        this.isFirst = false
      }
    }
  },
  computed: {
    // 文章 Id 的计算属性
    artId() {
      return this.article.artId.toString()
    }
  },
  props: {
    articleList: {
      type: Object,
      required: true
    }
  }
}
</script>

<style lang="less" scoped>
.label-box {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.thumb {
  /* 矩形黄金比例：0.618 */
  width: 113px;
  height: 70px;
  background-color: #f8f8f8;
  object-fit: cover;
}

.title-box {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}

.thumb-box {
  display: flex;
  justify-content: space-between;
}
</style>
