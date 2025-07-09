<script setup>
import { reactive, onMounted } from 'vue';
import { getItems } from '@/services/cartService';

const state = reactive({
  items: [],
});

const load = async () => {
    const res = await getItems();
    console.log('res', res);
    if (res.status !== 200) {
        return;
    }
    state.items = res.data;
};

onMounted(() => {
    load();
});
const remove = async (itemId) => {
    const res = await removeItem(itemId)

    if (res.status === 200) {
        alert('선택하신 장바구니의 상품을 삭제했습니다.')
        await load();
    }
};

</script>

<template>
  <div class="cart">
    <div class="container">
      <template v-if="state.items.length">
        <ul class="items">
          <li v-for="item in state.items">
            <img
              :alt="`상품 사진(${item.name})`"
              :src="`/pic/item/${item.imgPath}`"
            />
            <b class="name">{{ item.name }}</b>
            <span class="price">
              {{
                (
                  item.price -
                  (item.price * item.discountPer) / 100
                ).toLocaleString()
              }}원
            </span>
            <span class="remove float-end" @click="remove(item.id)" title="삭제"
              >&times;</span
            >
          </li>
        </ul>
        <div class="act">
          <router-link to="/order" class="btn btn-primary"
            >주문하기</router-link
          >
        </div>
      </template>
      <div class="text-center py-5" v-else>장바구니가 비었습니다.</div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.cart {
  items {
    list-style: none;
    margin: 0;
    padding: 0;
  }
  li {
    border: 1px solid #eee;
    margin-top: 25px;
    margin-bottom: 25px;
  }
  img {
    width: 150px;
    height: 150px;
  }

  .items {
    list-style: none;
    margin: 0;
    padding: 0;
  }
  .name {
    margin-left: 25px;
  }
  .price {
    margin-left: 25px;
  }
  .remove {
    cursor: pointer;
    font-size: 30px;
    padding: 30px 50px;
    font-size: 20px;
  }
}
.act .btn {
  width: 300px;
  display: block;
  margin: 0 auto;
  padding: 30px 50px;
  font-size: 20px;
}
</style>
