<template>
  <div class="flex justify-center">
    <div class="banner bg-banner-bg bg-cover bg-no-repeat bg-bottom">
      <div class="flex items-center h-full">
        <div class="ml-[85px] mr-16 text-white font-normal">
          <div class="font-bold text-3xl mb-6">Chương Trình Khuyến Mãi</div>
          <div class="mb-6 w-[400px] font-medium">
            Trang sức YODI tự hào là thương hiệu Quốc gia Việt Nam. Với sự đa
            dạng về chủng loại, độc đáo về kiểu dáng, dẫn đầu về xu hướng, nhiều
            sự lựa chọn về mức giá đã đang và sẽ chiếm được sự tin tưởng và yêu
            mến của khách hàng trên toàn quốc.
          </div>
          <div class="font-medium flex">
            <router-link :to="{ name: 'Product', params: {} }">
              <div
                class="bg-gradient-to-r from-green-400 to-blue-500 hover:from-pink-500 hover:to-yellow-500 w-max rounded-sm text-gray-900 hover:text-white px-8 py-4 text-sm"
              >
                MUA NGAY
              </div>
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.banner {
  width: 1600px;
  height: 800px;
  background-image: url("@/assets/images/bn.png");
}
</style>
