<template>
  <div>
    <van-cell>
      <!-- 标题区域的插槽 -->
      <template #title>
        <div class="title-box">
          <!-- 标题 -->
          <span>{{ articleList.title }}</span>
          <!-- 单张图片 -->
          <img v-if="articleList.cover.type == 1" :src="articleList.cover.images[0]" class="thumb">
        </div>
        <!-- 三张图片 -->
        <div class="thumb-box" v-if="articleList.cover.type == 3" >
          <img v-for="(imgsrc, i) in articleList.cover.images" :key="i" :src="imgsrc" class="thumb">
        </div>
      </template>
      <!-- label 区域的插槽 -->
      <template #label>
        <div class="label-box">
          <span>作者 {{ articleList.aut_name }}&nbsp;&nbsp; {{ articleList.comm_count }} 评论 &nbsp;&nbsp; 发布日期 {{ articleList.pubdate }}</span>
          <!-- 关闭按钮 -->
          <van-icon name="cross" />
        </div>
      </template>
    </van-cell>
  </div>
</template>

<script>
export default {
  name: 'ArtItem',
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
